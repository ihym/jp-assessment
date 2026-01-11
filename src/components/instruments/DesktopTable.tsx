import { ArrowUp, ArrowDown } from 'lucide-react';
import type { FinancialInstrument, SortField, SortDirection } from '@/types/instrument';
import { cn, getAssetRowClassName } from '@/utils/classes';
import { AssetBadge } from './AssetBadge';
import { Price } from './Price';

interface DesktopTableProps {
  instruments: FinancialInstrument[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

const COLUMN_HEADERS: { field: SortField; label: string }[] = [
  { field: 'ticker', label: 'Ticker' },
  { field: 'price', label: 'Price' },
  { field: 'assetClass', label: 'Asset Class' },
];

export function DesktopTable({ instruments, sortField, sortDirection, onSort }: DesktopTableProps) {
  const SortIcon = sortDirection === 'asc' ? ArrowUp : ArrowDown;

  return (
    <div className="rounded-xl border border-slate-200 shadow-lg">
      <table className="w-full border-collapse" role="grid" aria-label="Financial Instruments">
        <thead>
          <tr>
            {COLUMN_HEADERS.map(({ field, label }) => (
              <th
                key={field}
                className="sticky top-0 z-10 bg-slate-800 text-white first:rounded-tl-xl last:rounded-tr-xl"
              >
                <button
                  onClick={() => onSort(field)}
                  className={cn(
                    'flex items-center w-full gap-2 hover:text-amber-300 transition-colors duration-200 cursor-pointer px-4 py-3 md:px-6 md:py-4 ',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 rounded',
                    sortField === field && 'text-amber-300'
                  )}
                  aria-label={`Sort by ${label}`}
                >
                  {label}
                  {sortField === field && <SortIcon className="w-4 h-4" />}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {instruments.map((instrument) => (
            <tr
              key={instrument.ticker}
              className={cn(
                getAssetRowClassName(instrument.assetClass),
                'border-b border-slate-200 last:border-b-0',
                'transition-all duration-200 hover:opacity-80',
                'text-slate-800'
              )}
            >
              <td className="px-4 py-3 md:px-6 md:py-4 font-mono font-bold tracking-wider">
                {instrument.ticker}
              </td>
              <td className="px-4 py-3 md:px-6 md:py-4">
                <Price value={instrument.price} />
              </td>
              <td className="px-4 py-3 md:px-6 md:py-4">
                <AssetBadge assetClass={instrument.assetClass} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {instruments.length === 0 && (
        <div className="p-8 text-center text-slate-500">No instruments found</div>
      )}
    </div>
  );
}
