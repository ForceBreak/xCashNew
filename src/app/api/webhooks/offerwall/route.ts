import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { COINS_PER_DOLLAR } from '@/constants';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const userId = searchParams.get('user_id');
  const offerId = searchParams.get('offer_id');
  const transactionId = searchParams.get('transaction_id');
  const payout = parseFloat(searchParams.get('payout') || '0');
  const status = searchParams.get('status');
  const secretField = searchParams.get(
    process.env.OFFERWALL_SECRET_FIELD_NAME || 'secret',
  );

  // 1. Secret check
  if (secretField !== process.env.OFFERWALL_SECRET_FIELD_VALUE) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  // 2. Params check
  if (!userId || !offerId || !transactionId) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 });
  }

  try {
    // 3. Deduplication
    const { data: existing } = await supabaseAdmin
      .from('user_offers')
      .select('id')
      .eq('transaction_id', transactionId)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    // 4. If approved — atomic balance update via RPC
    if (status === 'approved') {
      const payoutCoins = Math.round(payout * COINS_PER_DOLLAR);

      const { error: rpcError } = await supabaseAdmin.rpc('add_coins', {
        p_user_id: userId,
        p_amount: payoutCoins,
      });

      if (rpcError) throw rpcError;
    }

    // 5. Update offer status
    await supabaseAdmin
      .from('user_offers')
      .update({
        status,
        transaction_id: transactionId,
        completed_at: new Date().toISOString(),
        postback_data: Object.fromEntries(searchParams),
      })
      .eq('user_id', userId)
      .eq('offer_id', offerId);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
