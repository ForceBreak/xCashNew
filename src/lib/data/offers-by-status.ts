import { createClient } from '@/lib/supabase/server';
import { Offer } from '@/types/offer';

export async function getStartedOffers(
  userId: string | null = null,
  status: string,
): Promise<Offer[]> {
  try {
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
