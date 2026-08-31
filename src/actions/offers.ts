'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Offer } from '@/types/offer';
import { getUserIdFromHeaders } from '@/lib/auth';
import { COINS_PER_DOLLAR } from '@/constants';

export async function startOffer(offer: Offer) {
  const supabase = await createClient();
  const userId = await getUserIdFromHeaders();

  if (!userId) throw new Error('Unauthorized');

  const payoutCoins = Math.round(offer.payout * COINS_PER_DOLLAR);
  const { error } = await supabase.from('user_offers').upsert(
    {
      user_id: userId,
      offer_id: offer.id,
      offer_name: offer.name,
      offer_icon: offer.thumbnail_url,
      payout_usd: offer.payout,
      payout_coins: payoutCoins,
      tracking_url: offer.tracking_url,
      network: offer.network,
      requirements: offer.requirements,
      description: offer.description,
      status: 'started',
    },
    { onConflict: 'offer_id' },
  );
  // .select('id')
  // .single();

  if (error) throw new Error(error.message);

  redirect(offer.tracking_url);
}
