import React from 'react';
import type { DeFiData, Protocol, Network } from '../types';
import { Spinner } from './Spinner';

interface DataDisplayProps {
  data: DeFiData;
  protocol: Protocol;
  network: Network;
  walletAddress: string;
  isAnalyzing: boolean;
  onAnalyze: () => void;
  analysisResult: string | null;
  onReset: () => void;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const DataCard: React.FC<{ title: string; value: string; className?: string; children: React.ReactNode }> = ({ title, value, className, children }) => (
  <div className={`bg-slate-800/70 border border-slate-700 rounded-xl p-6 ${className}`}>
    <div className="flex justify-between items-center">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{title}</h3>
      <span className="text-2xl font-bold text-emerald-400">{value}</span>
    </div>
    <div className="mt-4 space-y-3">{children}</div>
  </div>
);

const AssetItem: React.FC<{ asset: string; amount: number; valueUSD: number }> = ({ asset, amount, valueUSD }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="font-medium text-slate-200">{asset}</span>
    <div className="text-right">
      <div className="text-slate-300">{amount.toFixed(4)}</div>
      <div className="text-xs text-slate-400">{formatCurrency(valueUSD)}</div>
    </div>
  </div>
);

export const DataDisplay: React.FC<DataDisplayProps> = ({
  data,
  protocol,
  network,
  walletAddress,
  isAnalyzing,
  onAnalyze,
  analysisResult,
  onReset,
}) => {
  const shortAddress = `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`;

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center">
         <h2 className="text-3xl font-bold text-slate-100">Your DeFi Position</h2>
         <p className="text-slate-400 mt-1">
          {protocol} on {network} for {shortAddress}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <DataCard title="Total Supplied" value={formatCurrency(data.totalSuppliedUSD)}>
          {data.supplied.map(asset => <AssetItem key={asset.asset} {...asset} />)}
        </DataCard>
        <DataCard title="Total Borrowed" value={formatCurrency(data.totalBorrowedUSD)}>
          {data.borrowed.map(asset => <AssetItem key={asset.asset} {...asset} />)}
        </DataCard>
      </div>
      
       <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-6 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-300">Net APY</h3>
        <span className={`text-3xl font-bold ${data.netAPY >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {data.netAPY.toFixed(2)}%
        </span>
      </div>

      <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-300 mb-4">AI-Powered Analysis</h3>
        {!analysisResult && !isAnalyzing && (
          <div className="text-center">
            <p className="text-slate-400 mb-4">Get insights into your on-chain strategy and risk profile.</p>
            <button
              onClick={onAnalyze}
              disabled={isAnalyzing}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Analyze with Gemini
            </button>
          </div>
        )}
        {isAnalyzing && (
          <div className="flex items-center justify-center gap-3 text-slate-400 p-8">
            <Spinner />
            <span>Analyzing your data...</span>
          </div>
        )}
        {analysisResult && (
          <div className="text-slate-300 prose prose-invert prose-sm max-w-none whitespace-pre-wrap">
            {analysisResult}
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <button
          onClick={onReset}
          className="w-full sm:w-auto bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          Check Another Wallet
        </button>
        <button
          onClick={() => alert('Data claim functionality coming soon!')}
          className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          Claim Data
        </button>
      </div>
    </div>
  );
};
