'use client';

import Link from 'next/link';
import AppLogo from '@/components/AppLogo';
import { usePathname } from 'next/navigation';

export default function AppSidebar() {
  const routes = [
    { path: '/earn', name: 'Earn' },
    { path: '/started', name: 'Started' },
  ];
  const pathname = usePathname();

  return (
    <aside className="fixed bottom-0 left-0 z-10 bg-gray-800 text-base-gray flex md:relative w-full md:w-40 md:min-h-screen">
      <nav className="h-12 flex md:block items-center md:h-full w-full">
        <div className="hidden md:flex mb-6 h-16 flex items-end justify-center">
          <AppLogo />
        </div>

        <ul className="w-full flex md:flex-wrap justify-center md:justify-start">
          {routes.map((item) => (
            <li
              className={`flex items-center md:w-full hover:text-base-gray-light rounded hover:bg-gray-750 ${pathname === item.path && 'bg-gray-750 text-base-gray-light'}`}
              key={item.name}
            >
              <Link href={item.path} className="w-full px-2 md:px-4 md:py-2 font-semibold">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
