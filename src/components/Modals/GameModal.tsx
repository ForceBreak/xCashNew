import type { Offer } from '@/lib/data/offers';
import ItemInfo from '@/components/ui/item-info';
import { Button } from '@/components/ui/button';
import { startOffer } from '@/actions/offers';

export default function GameModal({ offer }: { offer: Offer }) {
  const handleStartOffer = () => {
    startOffer(offer);
  };
  return (
    <div>
      <div>{offer.name}</div>

      <div className="flex gap-6 mt-6">
        <img
          src={offer.thumbnail_url}
          alt={offer.name}
          className="w-20 h-20 rounded-lg"
        />
        <div>
          <p className="mb-1">$ {offer.payout}</p>
          <p className="text-xs">
            Partner: <span className="font-base-bold">{offer.network}</span>
          </p>
        </div>
      </div>
      <p className="my-3">{offer.requirements}</p>
      <ItemInfo variant="cyan" text={offer.description} />

      <Button
        variant="default"
        size="lg"
        onClick={handleStartOffer}
        className="w-full mt-6"
      >
        Start
      </Button>
    </div>
  );
}
