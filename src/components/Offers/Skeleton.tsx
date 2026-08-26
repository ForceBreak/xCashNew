export default function OffersSkeleton() {
  return (
    <div className="flex gap-2 ">
      <div className="flex flex-col gap-2 w-full">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="w-full h-24 bg-gray-750" />
        ))}
      </div>
    </div>
  );
}
