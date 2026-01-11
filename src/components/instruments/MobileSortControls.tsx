import { ArrowUp, ArrowDown } from 'lucide-react';
import type { SortField, SortDirection } from '@/types/instrument';
import { cn } from '@/utils/classes';

interface MobileSortControlsProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

const COLUMN_HEADERS: { field: SortField; label: string }[] = [
  { field: 'ticker', label: 'Ticker' },
  { field: 'price', label: 'Price' },
  { field: 'assetClass', label: 'Asset Class' },
];

export function MobileSortControls({ sortField, sortDirection, onSort }: MobileSortControlsProps) {
  const SortIcon = sortDirection === 'asc' ? ArrowUp : ArrowDown;

  return (
    <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-t-xl sticky top-0 z-10">
      <span className="text-slate-300 text-sm">Sort:</span>
      <div className="flex gap-1 flex-wrap">
        {COLUMN_HEADERS.map(({ field, label }) => (
          <button
            key={field}
            onClick={() => onSort(field)}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1',
              sortField === field
                ? 'bg-amber-400 text-slate-900'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            )}
          >
            {label}
            {sortField === field && <SortIcon className="w-3 h-3" />}
          </button>
        ))}
      </div>
    </div>
  );
}
