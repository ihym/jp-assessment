import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InstrumentsTable } from './InstrumentsTable';
import type { FinancialInstrument } from '@/types/instrument';
import { formatPrice } from '@/utils/formatters';

const mockInstruments: FinancialInstrument[] = [
  { ticker: 'ALPHA', price: 1000, assetClass: 'Credit' },
  { ticker: 'BETA', price: 2000, assetClass: 'Equities' },
  { ticker: 'GAMMA', price: -500, assetClass: 'Macro' },
];

const getRows = () => {
  const tbody = screen.getAllByRole('rowgroup')[1];
  return within(tbody).getAllByRole('row') as HTMLTableRowElement[];
};

const getColumnValues = (colIndex: number) =>
  getRows().map((row) => row.cells[colIndex].textContent);

describe('InstrumentsTable', () => {
  it('renders all rows with correct values', () => {
    render(<InstrumentsTable instruments={mockInstruments} />);
    const rows = getRows();
    const sorted = [...mockInstruments].sort((a, b) => a.ticker.localeCompare(b.ticker));

    for (let i = 0; i < sorted.length; i++) {
      expect(rows[i].cells[0].textContent).toBe(sorted[i].ticker);
      expect(rows[i].cells[1].textContent).toBe(formatPrice(sorted[i].price));
      expect(rows[i].cells[2].textContent).toBe(sorted[i].assetClass);
    }
  });

  it('shows empty state when no instruments', () => {
    render(<InstrumentsTable instruments={[]} />);
    expect(screen.getByText('No instruments found')).toBeTruthy();
  });

  it('sorts by ticker asc by default, toggles to desc on click', async () => {
    render(<InstrumentsTable instruments={mockInstruments} />);
    const button = screen.getByRole('button', { name: /sort by ticker/i });

    expect(getColumnValues(0)).toEqual(['ALPHA', 'BETA', 'GAMMA']);

    await userEvent.click(button);
    expect(getColumnValues(0)).toEqual(['GAMMA', 'BETA', 'ALPHA']);
  });

  it('sorts by price desc by default, toggles to asc on click', async () => {
    render(<InstrumentsTable instruments={mockInstruments} />);
    const button = screen.getByRole('button', { name: /sort by price/i });

    await userEvent.click(button);
    expect(getColumnValues(1)).toEqual(['$2,000.00', '$1,000.00', '-$500.00']);

    await userEvent.click(button);
    expect(getColumnValues(1)).toEqual(['-$500.00', '$1,000.00', '$2,000.00']);
  });

  it('sorts by asset class asc by default, toggles to desc on click', async () => {
    render(<InstrumentsTable instruments={mockInstruments} />);
    const button = screen.getByRole('button', { name: /sort by asset class/i });

    await userEvent.click(button);
    expect(getColumnValues(2)).toEqual(['Equities', 'Macro', 'Credit']);

    await userEvent.click(button);
    expect(getColumnValues(2)).toEqual(['Credit', 'Macro', 'Equities']);
  });
});
