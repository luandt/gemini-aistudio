import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { DataClaimForm } from './components/DataClaimForm';
import { DataDisplay } from './components/DataDisplay';
import { analyzeDeFiData } from './services/geminiService';
import type { DeFiData, Protocol, Network } from './types';
import { PROTOCOLS, NETWORKS } from './constants';

// Mock function to simulate fetching on-chain data
const mockFetchDeFiData = (address: string, protocol: Protocol, network: Network): Promise<DeFiData> => {
  console.log(`Fetching data for ${address} on ${protocol} (${network})...`);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        totalSuppliedUSD: Math.random() * 100000,
        totalBorrowedUSD: Math.random() * 50000,
        netAPY: (Math.random() - 0.2) * 5,
        supplied: [
          { asset: 'USDC', amount: Math.random() * 50000, valueUSD: 49995.00 },
          { asset: 'ETH', amount: Math.random() * 10, valueUSD: 35000.00 },
        ],
        borrowed: [
          { asset: 'WBTC', amount: Math.random() * 0.5, valueUSD: 30000.00 },
          { asset: 'DAI', amount: Math.random() * 10000, valueUSD: 10000.00 },
        ],
      });
    }, 1500);
  });
};


function App() {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol>(PROTOCOLS[0].id);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(NETWORKS[0].id);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  
  const [fetchedData, setFetchedData] = useState<DeFiData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConnectWallet = useCallback(() => {
    if (connectedAddress) {
      setConnectedAddress(null);
      setWalletAddress('');
    } else {
      const mockAddress = '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
      setConnectedAddress(mockAddress);
      setWalletAddress(mockAddress);
    }
  }, [connectedAddress]);

  const handleFetchData = useCallback(async () => {
    if (!walletAddress) {
      setError('Please enter a wallet address.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setFetchedData(null);
    setAnalysisResult(null);

    try {
      const data = await mockFetchDeFiData(walletAddress, selectedProtocol, selectedNetwork);
      setFetchedData(data);
    } catch (e) {
      setError('Failed to fetch data. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress, selectedProtocol, selectedNetwork]);

  const handleAnalyzeData = useCallback(async () => {
    if (!fetchedData) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeDeFiData(fetchedData, selectedProtocol, selectedNetwork, walletAddress);
      setAnalysisResult(result);
    } catch (e) {
      setAnalysisResult('An error occurred during AI analysis.');
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  }, [fetchedData, selectedProtocol, selectedNetwork, walletAddress]);

  const handleReset = useCallback(() => {
    setFetchedData(null);
    setAnalysisResult(null);
    setError(null);
    // Optionally clear form too
    // setWalletAddress('');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <Header connectedAddress={connectedAddress} onConnectWallet={handleConnectWallet} />

        <main className="mt-8 sm:mt-12">
          {!fetchedData ? (
            <DataClaimForm
              walletAddress={walletAddress}
              setWalletAddress={setWalletAddress}
              selectedProtocol={selectedProtocol}
              setSelectedProtocol={setSelectedProtocol}
              selectedNetwork={selectedNetwork}
              setSelectedNetwork={setSelectedNetwork}
              isLoading={isLoading}
              onSubmit={handleFetchData}
              error={error}
            />
          ) : (
            <DataDisplay
              data={fetchedData}
              protocol={selectedProtocol}
              network={selectedNetwork}
              walletAddress={walletAddress}
              isAnalyzing={isAnalyzing}
              onAnalyze={handleAnalyzeData}
              analysisResult={analysisResult}
              onReset={handleReset}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
