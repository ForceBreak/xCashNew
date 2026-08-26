import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/providers/auth-provider';
import { createClient } from '@/lib/supabase/client';

export function useProfile() {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: ['my-profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const supabase = createClient();
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  return query;
}
