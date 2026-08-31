'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { fetchUser } from '@/lib/user-client';

const AuthContext = createContext<{ user: User | null; isLoading: boolean }>({
  user: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(async ({ data }) => {
      if (data.user) {
        const user = await fetchUser({ id: data.user?.id as string });
        setUser(user);
      }
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        let user = null;
        if (session?.user) {
          user = await fetchUser({ id: session.user.id as string });
        }
        setUser(user);
        setIsLoading(false);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
