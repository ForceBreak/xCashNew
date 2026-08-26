'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

export default function Pagination({ last_page }: { last_page: number }) {
  const [items, setItems] = useState<{ label: number; value: number }[]>([]);
  const currentPages = () => {
    const array = Array.from({ length: last_page }, (_, i) => i + 1);
    return array.map((item) => ({
      label: item,
      value: item,
    }));
  };

  useEffect(() => {
    setItems(currentPages());
  }, [last_page]);

  return (
    <Select items={items}>
      <SelectTrigger
        className={
          'w-full flex items-center relative border border-gray-700 rounded-lg bg-gray-750 text-sm'
        }
      >
        <SelectValue placeholder="Page" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup
          className={'border border-gray-700 rounded-lg bg-gray-750'}
        >
          {items.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className={'flex items-center cursor-pointer text-base-gray'}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
