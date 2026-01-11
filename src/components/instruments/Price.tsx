import { cn } from '@/utils/classes';
import { formatPrice } from '@/utils/formatters';

interface PriceProps {
  value: number;
  className?: string;
}

export function Price({ value, className }: PriceProps) {
  return (
    <span
      className={cn(
        'font-mono font-semibold',
        value >= 0 ? 'text-blue-600' : 'text-red-600',
        className
      )}
    >
      {formatPrice(value)}
    </span>
  );
}
