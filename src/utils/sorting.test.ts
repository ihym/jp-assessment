import { describe, it, expect } from 'vitest';
import { sortInstruments } from './sorting';
import type { FinancialInstrument } from '@/types/instrument';

const mockInstruments: FinancialInstrument[] = [
  { ticker: 'ZETA', price: 100, assetClass: 'Credit' },
  { ticker: 'ALPHA', price: 200, assetClass: 'Equities' },
  { ticker: 'BETA', price: -50, assetClass: 'Macro' },
  { ticker: 'GAMMA', price: 150, assetClass: 'Equities' },
  { ticker: 'DELTA', price: 300, assetClass: 'Credit' },
];

describe('sortInstruments', () => {
  it('sorts by ticker', () => {
    expect(sortInstruments(mockInstruments, 'ticker', 'asc').map((i) => i.ticker)).toEqual([
      'ALPHA',
      'BETA',
      'DELTA',
      'GAMMA',
      'ZETA',
    ]);
    expect(sortInstruments(mockInstruments, 'ticker', 'desc').map((i) => i.ticker)).toEqual([
      'ZETA',
      'GAMMA',
      'DELTA',
      'BETA',
      'ALPHA',
    ]);
  });

  it('sorts by price', () => {
    expect(sortInstruments(mockInstruments, 'price', 'asc').map((i) => i.price)).toEqual([
      -50, 100, 150, 200, 300,
    ]);
    expect(sortInstruments(mockInstruments, 'price', 'desc').map((i) => i.price)).toEqual([
      300, 200, 150, 100, -50,
    ]);
  });

  it('sorts by assetClass', () => {
    expect(sortInstruments(mockInstruments, 'assetClass', 'asc').map((i) => i.assetClass)).toEqual([
      'Equities',
      'Equities',
      'Macro',
      'Credit',
      'Credit',
    ]);
    expect(sortInstruments(mockInstruments, 'assetClass', 'desc').map((i) => i.assetClass)).toEqual(
      ['Credit', 'Credit', 'Macro', 'Equities', 'Equities']
    );
  });

  it('does not mutate original array', () => {
    const original = [...mockInstruments];
    sortInstruments(mockInstruments, 'ticker', 'asc');
    expect(mockInstruments).toEqual(original);
  });
});
