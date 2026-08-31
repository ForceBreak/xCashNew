import { getUserIdFromHeaders } from '@/lib/auth';
import { getStartedOffers } from '@/lib/data/offers-by-status';
import Offers from '@/components/Offers/Offers';
import OffersSkeleton from '@/components/Offers/Skeleton';
import { Suspense } from 'react';

export default async function StartedPage() {
  const userId = await getUserIdFromHeaders();
  const offers = await getStartedOffers(userId, 'approved');

  return (
    <>
      <div className="flex items-center justify-between my-4 px-4 leading-none">
        <h2 className="text-2xl font-base font-bold">Offers</h2>
      </div>
      <Suspense fallback={<OffersSkeleton />}>
        <Offers offers={offers} />
      </Suspense>
    </>
  );
}
