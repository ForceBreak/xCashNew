import GameCard from '@/components/Offers/GameCard';
import { getOffers } from '@/lib/data/offers';
import type { Offer } from '@/lib/data/offers';
import { getUserIdFromHeaders } from '@/lib/auth';

export default async function Offers() {
  const userId = await getUserIdFromHeaders();
  const offers = await getOffers(50, userId);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-4 px-2 md:px-4">
        {offers && offers?.length > 0 ? (
          offers.map((offer: Offer) => {
            return (
              <GameCard
                name={offer.name}
                payout={offer.payout}
                icon={offer.thumbnail_url}
                key={offer.id}
              />
            );
          })
        ) : (
          <div className="flex justify-center w-full">
            <p className="font-base-bold text-base-gray text-xl p-4">
              No offers found. Try again later.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
