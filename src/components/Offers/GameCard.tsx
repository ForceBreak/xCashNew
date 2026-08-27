import GameIcon from '@/components/Offers/GameIcon';

export default function GameCard({
  name,
  payout,
  className,
  icon,
  onClick,
}: {
  name: string;
  payout: number;
  className?: string;
  icon: string;
  onClick: () => void;
}) {
  return (
    <div
      className={`relative p-3 rounded-lg bg-gray-950 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <GameIcon icon={icon} rootClass={'h-28 w-full'} />

      <div
        v-if="props.game?.platforms?.length"
        className="flex gap-2 absolute top-4 right-4"
      >
        {/* <icon
				v-for="platform in props.game?.platforms"
				:key="platform"
				:name="platform"
				className="text-white w-7 h-7 p-1 rounded-lg bg-gray-800/30"
			/> */}
      </div>
      <p className="text-base-gray mt-2 whitespace-nowrap truncate">{name}</p>
      <p className="mt-2 font-base-bold">${payout}</p>
    </div>
  );
}
