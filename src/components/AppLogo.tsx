import Link from 'next/link';
import { useAuth } from '@/providers/auth-provider';

export default function AppLogo() {
  const { user } = useAuth();

  return (
    <Link href={`${user ? '/earn' : '/'}`} className="font-base text-4xl">
      xCash
    </Link>
  );
}
