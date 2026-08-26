'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    queryClient.clear();
    // localStorage.removeItem('app-cache')

    router.refresh();
    router.push('/');
  }

  return (
    <div
      className="flex items-center py-1.5 cursor-pointer"
      onClick={handleLogout}
    >
      <LogOut className="w-5 h-5 mr-4 text-red-500" />
      <span className="text-red-500">Logout</span>
    </div>
  );
}
