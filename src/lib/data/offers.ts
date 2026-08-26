export interface Offer {
  id: string;
  name: string;
  payout: number;
  thumbnail_url: string;
}

interface OffersResponse {
  data: Offer[];
}

export async function getOffers(
  limit = 50,
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
    return Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error('Failed to fetch offers:', error);
    return [];
  }
}
