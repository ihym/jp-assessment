import type { AssetClass } from '@/types/instrument';
import { cn } from '@/utils/classes';

interface AssetBadgeProps {
  assetClass: AssetClass;
}

export function AssetBadge({ assetClass }: AssetBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
        assetClass === 'Equities' && 'bg-blue-600 text-white',
        assetClass === 'Macro' && 'bg-slate-600 text-white',
        assetClass === 'Credit' && 'bg-emerald-600 text-white'
      )}
    >
      {assetClass}
    </span>
  );
}
