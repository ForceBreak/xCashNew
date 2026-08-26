import Offers from '@/components/Offers/Offers';
import OffersSkeleton from '@/components/Offers/Skeleton';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, SlidersVertical } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Suspense } from 'react';

export default function EarnPage() {
  return (
    <>
      <div className="flex items-center justify-between my-4 px-4 leading-none">
        <h2 className="text-2xl font-base font-bold">Offers</h2>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <SlidersVertical />
          </Button>

          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon">
              <ChevronLeft />
            </Button>
            <Pagination last_page={10} />

            <Button variant="outline" size="icon">
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
      <Suspense fallback={<OffersSkeleton />}>
        <Offers />
      </Suspense>
    </>
  );
}
