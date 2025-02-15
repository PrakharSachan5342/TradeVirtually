import React, { createContext, useContext, useState, useEffect } from 'react';

interface Trade {
  id: string;
  pair: string;
  type: 'buy' | 'sell';
  amount: number;
  openPrice: number;
  timestamp: Date;
}

interface ForexPair {
  pair: string;
  price: number;
  spread: number;
}

interface TradeContextType {
  balance: number;
  setBalance: (balance: number) => void;
  activeTrades: Trade[];
  setActiveTrades: (trades: Trade[]) => void;
  dailyPL: number;
  setDailyPL: (pl: number) => void;
  totalTrades: number;
  setTotalTrades: (total: number) => void;
  forexPairs: ForexPair[];
  setForexPairs: (pairs: ForexPair[]) => void;
}

const TradeContext = createContext<TradeContextType | undefined>(undefined);

export function TradeProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(1000000);
  const [activeTrades, setActiveTrades] = useState<Trade[]>([]);
  const [dailyPL, setDailyPL] = useState(0);
  const [totalTrades, setTotalTrades] = useState(0);
  const [forexPairs, setForexPairs] = useState<ForexPair[]>([
    { pair: 'EUR/USD', price: 1.0925, spread: 0.0002 },
    { pair: 'GBP/USD', price: 1.2650, spread: 0.0003 },
    { pair: 'USD/JPY', price: 150.45, spread: 0.02 },
    { pair: 'USD/CHF', price: 0.8830, spread: 0.0003 },
    { pair: 'AUD/USD', price: 0.6550, spread: 0.0003 },
    { pair: 'USD/CAD', price: 1.3520, spread: 0.0003 },
    { pair: 'NZD/USD', price: 0.6120, spread: 0.0004 },
    { pair: 'EUR/GBP', price: 0.8580, spread: 0.0003 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setForexPairs(prevPairs => 
        prevPairs.map(pair => ({
          ...pair,
          price: pair.price + (Math.random() - 0.5) * 0.001
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TradeContext.Provider value={{
      balance,
      setBalance,
      activeTrades,
      setActiveTrades,
      dailyPL,
      setDailyPL,
      totalTrades,
      setTotalTrades,
      forexPairs,
      setForexPairs
    }}>
      {children}
    </TradeContext.Provider>
  );
}

export function useTradeContext() {
  const context = useContext(TradeContext);
  if (context === undefined) {
    throw new Error('useTradeContext must be used within a TradeProvider');
  }
  return context;
}