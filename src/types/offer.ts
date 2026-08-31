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