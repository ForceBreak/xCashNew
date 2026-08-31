import GameIcon from '@/components/Offers/GameIcon';

export default function GameCard({
  name,
  payout,
  status,
  className,
  icon,
  onClick,
}: {
  name: string;
  payout: number;
  className?: string;
  icon: string;
  onClick: () => void;
  status: 'started' | 'approved' | 'rejected' | null;
}) {
  const badgeClassesByStatus = {
    started: 'text-blue-500',
    approved: 'text-green-500',
    rejected: 'text-red-500',
  };

  return (
    <div
      className={`relative p-3 rounded-lg bg-gray-950 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <GameIcon icon={icon} rootClass={'h-28 w-full'} />

      <div className="flex gap-2 absolute top-4 right-4">
        {/* <icon
				v-for="platform in props.game?.platforms"
				:key="platform"
				:name="platform"
				className="text-white w-7 h-7 p-1 rounded-lg bg-gray-800/30"
			/> */}
      </div>
      <p className="text-base-gray mt-2 whitespace-nowrap truncate">{name}</p>
      <p className="mt-2 font-bold">${payout}</p>
      {status && (
        <span
          className={`absolute right-4 top-4 inline-block bg-gray-950 text-xs font-bold uppercase leading-none p-1 rounded ${badgeClassesByStatus[status]}`}
        >
          {status}
        </span>
      )}
    </div>
  );
}
