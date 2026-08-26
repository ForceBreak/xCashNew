'use client';

import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { LogoutButton } from '@/components/ui/logout-button';
import { useProfile } from '@/hooks/use-profile';

export default function UserMenu() {
  const { data: user } = useProfile();
  const links = [{ text: 'View profile', to: '/profile', icon: 'user' }];

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button className="h-10 border-none" />}>
          {!!user ? (
            <p>{`${user.first_name} ${user.last_name}`}</p>
          ) : (
            <User size={24} className="text-gray-300" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuGroup>
            {links.map((link) => (
              <DropdownMenuItem className="py-0" key={link.to}>
                <Link
                  href={link.to}
                  className="flex items-center text-gray-500 py-1.5 hover:text-gray-400"
                >
                  <User className="w-5 h-5 mr-4" />
                  {link.text}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
