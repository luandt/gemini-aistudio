import React from 'react';
import { WalletIcon } from './icons/MiscIcons';

interface HeaderProps {
  connectedAddress: string | null;
  onConnectWallet: () => void;
}

export const Header: React.FC<HeaderProps> = ({ connectedAddress, onConnectWallet }) => {
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">
        Verin
      </h1>
      <button
        onClick={onConnectWallet}
        className="flex items-center gap-2 bg-slate-700/50 border border-slate-600 hover:bg-slate-700 text-slate-200 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
      >
        <WalletIcon className="h-5 w-5 text-cyan-400" />
        {connectedAddress ? (
          <span>{`${connectedAddress.substring(0, 6)}...${connectedAddress.substring(connectedAddress.length - 4)}`}</span>
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
    </header>
  );
};
