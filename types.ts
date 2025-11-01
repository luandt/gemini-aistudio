export enum Protocol {
  AAVE = 'Aave',
  COMPOUND = 'Compound',
}

export enum Network {
  ETHEREUM = 'Ethereum',
  POLYGON = 'Polygon',
  ARBITRUM = 'Arbitrum',
}

export interface AssetData {
  asset: string;
  amount: number;
  valueUSD: number;
}

export interface DeFiData {
  supplied: AssetData[];
  borrowed: AssetData[];
  totalSuppliedUSD: number;
  totalBorrowedUSD: number;
  netAPY: number;
}
