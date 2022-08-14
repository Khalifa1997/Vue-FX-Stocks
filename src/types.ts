export interface stock {
  symbol: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}
export interface FX {
  currencyA: string;
  currencyB: string;
  price: number;
}
export interface currency {
  currency: string;
  abbreviation: string;
  symbol: string;
}
