import React from 'react';
import type { Protocol, Network } from '../types';
import { PROTOCOLS, NETWORKS } from '../constants';
import { WalletIcon } from './icons/MiscIcons';
import { Spinner } from './Spinner';

interface DataClaimFormProps {
  walletAddress: string;
  setWalletAddress: (address: string) => void;
  selectedProtocol: Protocol;
  setSelectedProtocol: (protocol: Protocol) => void;
  selectedNetwork: Network;
  setSelectedNetwork: (network: Network) => void;
  isLoading: boolean;
  onSubmit: () => void;
  error: string | null;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-sm font-semibold text-slate-400 mb-3 tracking-wider uppercase">{children}</h3>
);

export const DataClaimForm: React.FC<DataClaimFormProps> = ({
  walletAddress,
  setWalletAddress,
  selectedProtocol,
  setSelectedProtocol,
  selectedNetwork,
  setSelectedNetwork,
  isLoading,
  onSubmit,
  error,
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-slate-950/50">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
          Claim Your DeFi History
        </h1>
        <p className="text-slate-400 mt-2">
          Fetch your lending and borrowing data from top protocols.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <SectionTitle>1. Select Protocol</SectionTitle>
          <div className="grid grid-cols-2 gap-4">
            {PROTOCOLS.map(({ id, name, icon }) => (
              <button
                key={id}
                onClick={() => setSelectedProtocol(id)}
                className={`flex flex-col items-center justify-center p-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  selectedProtocol === id
                    ? 'bg-cyan-500/10 border-2 border-cyan-400 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-700/50 border-2 border-slate-600 hover:border-slate-500'
                }`}
              >
                {icon}
                <span className="mt-3 font-semibold text-slate-100">{name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle>2. Select Network</SectionTitle>
          <div className="flex flex-wrap gap-3">
            {NETWORKS.map(({ id, name, icon }) => (
              <button
                key={id}
                onClick={() => setSelectedNetwork(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  selectedNetwork === id
                    ? 'bg-cyan-500 text-slate-900'
                    : 'bg-slate-700/50 hover:bg-slate-700'
                }`}
              >
                {icon}
                <span>{name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle>3. Enter Wallet Address</SectionTitle>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <WalletIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x..."
              className="w-full bg-slate-700/50 border-2 border-slate-600 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-colors"
            />
          </div>
        </div>

        {error && <div className="text-red-400 text-center text-sm">{error}</div>}

        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? (
            <>
              <Spinner />
              Fetching Data...
            </>
          ) : (
            'Fetch On-Chain Data'
          )}
        </button>
      </div>
    </div>
  );
};
