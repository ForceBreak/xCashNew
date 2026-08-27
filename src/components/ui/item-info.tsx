import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { Info } from 'lucide-react';

export default function ItemInfo({ text }: { text: string }) {
  return (
    <Item variant="outline" size="sm">
      <ItemMedia>
        <Info className="size-5" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{text}</ItemTitle>
      </ItemContent>
    </Item>
  );
}
