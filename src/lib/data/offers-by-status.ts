import { createClient } from '@/lib/supabase/server';
import { cacheTag, cacheLife } from 'next/cache';
import { Offer } from '@/types/offer';

export async function getOffersByStatus(
  userId: string | null = null,
  status: string,
): Promise<Offer[]> {
  try {
    ('use cache');
    cacheLife('minutes');
    cacheTag('offers', `offers-${status}`, `offers-user-${userId}`);

    const supabase = await createClient();
    const { data: userOffers } = await supabase
      .from('user_offers')
      .select('*')
      .eq('user_id', userId)
      .eq('status', status);

    return (
      userOffers?.map((offer) => {
        return {
          id: offer.offer_id,
          name: offer.offer_name,
          payout: offer.payout_usd,
          thumbnail_url: offer.offer_icon,
          network: offer.network,
          description: offer.description,
          requirements: offer.requirements,
          tracking_url: offer.offer_tracking_url,
          status: offer.status,
        };
      }) || []
    );
  } catch (error) {
    console.error('Failed to fetch offers:', error);
    return [];
  }
}

export const revalidate = 900;
export const tags = ['offers'];
