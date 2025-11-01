import React from 'react';
import { Protocol, Network } from './types';
import { AaveIcon, CompoundIcon } from './components/icons/ProtocolIcons';
import { EthereumIcon, PolygonIcon, ArbitrumIcon } from './components/icons/NetworkIcons';

interface ProtocolInfo {
  id: Protocol;
  name: string;
  // Fix: Replaced JSX.Element with React.ReactElement to resolve namespace error.
  icon: React.ReactElement;
}

interface NetworkInfo {
  id: Network;
  name: string;
  // Fix: Replaced JSX.Element with React.ReactElement to resolve namespace error.
  icon: React.ReactElement;
}

export const PROTOCOLS: ProtocolInfo[] = [
  { id: Protocol.AAVE, name: 'Aave', icon: <AaveIcon className="h-8 w-8" /> },
  { id: Protocol.COMPOUND, name: 'Compound', icon: <CompoundIcon className="h-8 w-8" /> },
];

export const NETWORKS: NetworkInfo[] = [
  { id: Network.ETHEREUM, name: 'Ethereum', icon: <EthereumIcon className="h-6 w-6" /> },
  { id: Network.POLYGON, name: 'Polygon', icon: <PolygonIcon className="h-6 w-6" /> },
  { id: Network.ARBITRUM, name: 'Arbitrum', icon: <ArbitrumIcon className="h-6 w-6" /> },
];