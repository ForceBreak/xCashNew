import type { Offer } from '@/lib/data/offers';
import ItemInfo from '@/components/ui/item-info';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function GameModal({ offer }: { offer: Offer }) {
  console.log(offer);
  return (
    <div>
      <div>{offer.name}</div>

      <div className="flex gap-6 my-6">
        <img
          src={offer.thumbnail_url}
          alt={offer.name}
          className="w-20 h-20 rounded-lg"
        />
        <div>
          <p className="mb-1">$ {offer.payout}</p>
          <p className="text-xs">
            Partner:{' '}
            <span className="font-base-bold">{offer.network}</span>
          </p>
        </div>
      </div>
      <ItemInfo text={offer.description} />

      <a
        href={offer.tracking_url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ variant: 'default', size: 'lg' }),
          'w-full mt-6 inline-flex',
        )}
      >
        Start
      </a>
    </div>
  );
}
