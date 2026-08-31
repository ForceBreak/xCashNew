import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { Info } from 'lucide-react';

type VariantsType = 'default' | 'cyan' | 'success' | 'warning' | 'danger';

const colors: Record<VariantsType, string> = {
  default: '',
  cyan: 'bg-cyan-50 border border-cyan-200 text-cyan-900',
  success: 'bg-emerald-50 border border-emerald-200 text-emerald-900',
  warning: 'bg-amber-50 border border-amber-200 text-amber-900',
  danger: 'bg-red-50 border border-red-200 text-red-900',
};

export default function ItemInfo({
  text,
  variant = 'cyan',
}: {
  text: string;
  variant?: VariantsType;
}) {
  return (
    <Item variant="outline" size="sm" className={colors[variant]}>
      <ItemMedia>
        <Info className="size-5" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{text}</ItemTitle>
      </ItemContent>
    </Item>
  );
}
