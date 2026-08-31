import { createClient } from '@/lib/supabase/server';

export interface Offer {
  id: string;
  name: string;
  payout: number;
  thumbnail_url: string;
  network: string;
  description: string;
  requirements: string;
  tracking_url: string;
  status: 'started' | 'approved' | 'rejected' | null;
}

interface OffersResponse {
  data: Offer[];
}

export async function getOffers(
  limit = 500,
  userId: string | null = null,
): Promise<Offer[]> {
  const token = process.env.OFFERWALL_API_TOKEN;
  if (!token) {
    console.error('OFFERWALL_API_TOKEN is not set');
    return [];
  }

  try {
    const params = new URLSearchParams({ limit: String(limit) });
    if (userId) params.set('subid', userId);

    const res = await fetch(
      `https://offerwall.ad/api/v1/offers?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 900, tags: ['offers'] },
      },
    );

    if (!res.ok) {
      console.error(`Offerwall API error: ${res.status}`);
      return [];
    }

    const json = (await res.json()) as OffersResponse;
    const data = Array.isArray(json.data) ? json.data : [];
    const offerIdArray = data.map((offer) => offer.id);

    const supabase = await createClient();
    const { data: userOffers } = await supabase
      .from('user_offers')
      .select('offer_id,status')
      .eq('user_id', userId)
      .in('offer_id', offerIdArray);

    let presentUser = null;
    const filtered = data.filter((offer) => {
      presentUser = userOffers?.find(
        (userOffer) => String(userOffer.offer_id) === String(offer.id),
      );
      return !presentUser?.status;
    });

    return filtered;
  } catch (error) {
    console.error('Failed to fetch offers:', error);
    return [];
  }
}
