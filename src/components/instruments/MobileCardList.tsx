import type { FinancialInstrument } from '@/types/instrument';
import { cn, getAssetRowClassName } from '@/utils/classes';
import { AssetBadge } from './AssetBadge';
import { Price } from './Price';

interface MobileCardListProps {
  instruments: FinancialInstrument[];
}

export function MobileCardList({ instruments }: MobileCardListProps) {
  return (
    <div className="divide-y divide-slate-200 border border-slate-200 border-t-0 rounded-b-xl overflow-hidden shadow-lg">
      {instruments.map((instrument) => (
        <div
          className={cn(
            getAssetRowClassName(instrument.assetClass),
            'p-4 transition-all duration-200 hover:opacity-80'
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono font-bold text-lg tracking-wider text-slate-800">
              {instrument.ticker}
            </span>
            <AssetBadge assetClass={instrument.assetClass} />
          </div>
          <Price value={instrument.price} className="text-xl" />
        </div>
      ))}
      {instruments.length === 0 && (
        <div className="p-8 text-center text-slate-500">No instruments found</div>
      )}
    </div>
  );
}
