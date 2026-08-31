'use client';

import AppLogo from '@/components/AppLogo';
import { Banknote, Coins } from 'lucide-react';
import UserMenu from '@/components/AppHeader/UserMenu';
import ModalSignIn from '@/components/Modals/SignIn';
import { useProfile } from '@/hooks/use-profile';
import { COINS_PER_DOLLAR } from '@/constants';

export default function AppHeader() {
  const { data: user, isLoading } = useProfile();
  const calculateUSD = (balance_coins: number) =>
    (balance_coins / COINS_PER_DOLLAR).toFixed(2);

  return (
    <div className="w-full h-16 flex items-center justify-between px-4 border-b border-secondary sticky top-0 left-0 z-10 bg-gray-900">
      <div className="md:hidden">
        <AppLogo />
      </div>
      <div className="flex gap-5 items-center ml-auto">
        {isLoading ? (
          <div className="flex items-center gap-3 h-10 px-4 rounded-lg font-base-bold leading-none bg-gray-750 animate-pulse">
            <div className="h-6 w-6 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-700 rounded animate-pulse"></div>
          </div>
        ) : user ? (
          <>
            <span className="hidden md:flex items-center gap-3 h-10 px-4 rounded-lg font-base-bold leading-none bg-gray-750">
              <Banknote size={24} className="text-yellow-400" />
              <span>${calculateUSD(user.balance_coins)}</span>
            </span>
            <span className="flex items-center gap-3 h-10 px-4 rounded-lg font-base-bold leading-none bg-gray-750">
              <Coins size={20} className="text-yellow-400" />
              <span>{user.balance_coins}</span>
            </span>

            <UserMenu />
          </>
        ) : (
          <ModalSignIn />
        )}
      </div>

      {/*<ModalSign :show="modals.auth" /> */}
    </div>
  );
}
