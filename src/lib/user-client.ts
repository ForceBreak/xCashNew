'use client';

import { createClient } from '@/lib/supabase/client';

export const fetchUser = async ({ id }: { id: string }) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};
