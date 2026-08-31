'use client';

import GameCard from '@/components/Offers/GameCard';
import { Offer } from '@/types/offer';
import { useModal } from '@/providers/modal-provider';
import GameModal from '@/components/Modals/GameModal';

export default function Offers({ offers }: { offers: Offer[] }) {
  const { openModal } = useModal();

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
                status={offer.status}
                key={offer.id}
                onClick={() => openModal(<GameModal offer={offer} />)}
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
