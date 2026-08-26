import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/earn';

  if (code) {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      if (user) {
        await supabase.from('users').upsert(
          {
            id: user.id,
            email: user.email,
            first_name: user.user_metadata?.full_name?.split(' ')[0],
            last_name: user.user_metadata?.full_name?.split(' ')[1],
            avatar_url: user.user_metadata?.avatar_url,
          },
          { onConflict: 'id' },
        );
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
