import { useState, useMemo } from 'react';
import { useMedia } from 'react-use';
import type { FinancialInstrument, SortField, SortDirection } from '@/types/instrument';
import { sortInstruments, getDefaultDirection } from '@/utils/sorting';
import { MobileSortControls } from './MobileSortControls';
import { MobileCardList } from './MobileCardList';
import { DesktopTable } from './DesktopTable';

interface InstrumentsTableProps {
  instruments: FinancialInstrument[];
}

export function InstrumentsTable({ instruments }: InstrumentsTableProps) {
  const [sortField, setSortField] = useState<SortField>('ticker');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const isDesktop = useMedia('(min-width: 640px)', true);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection(getDefaultDirection(field));
    }
  };

  const sortedInstruments = useMemo(
    () => sortInstruments(instruments, sortField, sortDirection),
    [instruments, sortField, sortDirection]
  );

  return (
    <div className="w-full">
      {isDesktop ? (
        <DesktopTable
          instruments={sortedInstruments}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      ) : (
        <>
          <MobileSortControls
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <MobileCardList instruments={sortedInstruments} />
        </>
      )}
    </div>
  );
}
