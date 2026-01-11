export type AssetClass = 'Equities' | 'Macro' | 'Credit';

export interface FinancialInstrument {
  ticker: string;
  price: number;
  assetClass: AssetClass;
}

export type SortField = 'ticker' | 'price' | 'assetClass';
export type SortDirection = 'asc' | 'desc';
