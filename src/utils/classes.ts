import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { AssetClass } from '@/types/instrument';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetRowClassName(assetClass: AssetClass) {
  switch (assetClass) {
    case 'Macro':
      return 'bg-white';
    case 'Equities':
      return 'bg-blue-100';
    case 'Credit':
      return 'bg-emerald-100';
    default:
      return '';
  }
}
