import Link from 'next/link';
import { useProfile } from '@/hooks/use-profile';

export default function AppLogo() {
  const { data: profile } = useProfile();

  return (
    <Link href={`${profile ? '/earn' : '/'}`} className="font-base text-4xl">
      xCash
    </Link>
  );
}
