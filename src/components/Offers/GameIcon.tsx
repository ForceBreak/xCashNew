export default function GameIcon({ icon, rootClass }: { icon: string, rootClass?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-lg group ${rootClass}`}
    >
      <div
        className="bg-cover w-full h-full rounded-lg bg-center group-hover:scale-125 group-hover:rotate-[20deg] transition-all duration-300"
        style={{ backgroundImage: `url(${icon})` }}
      ></div>
    </div>
  );
}
