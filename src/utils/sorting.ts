import type { FinancialInstrument, SortField, SortDirection, AssetClass } from '@/types/instrument';

const ASSET_CLASS_ORDER: Record<AssetClass, number> = {
  Equities: 1,
  Macro: 2,
  Credit: 3,
};

export function sortInstruments(
  instruments: FinancialInstrument[],
  field: SortField,
  direction: SortDirection
): FinancialInstrument[] {
  return [...instruments].sort((a, b) => {
    let comparison = 0;

    switch (field) {
      case 'assetClass':
        comparison = ASSET_CLASS_ORDER[a.assetClass] - ASSET_CLASS_ORDER[b.assetClass];
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'ticker':
        comparison = a.ticker.localeCompare(b.ticker);
        break;
    }

    return direction === 'asc' ? comparison : -comparison;
  });
}

export function getAssetClassOrder(assetClass: AssetClass): number {
  return ASSET_CLASS_ORDER[assetClass];
}

export function getDefaultDirection(field: SortField): SortDirection {
  return field === 'price' ? 'desc' : 'asc';
}
