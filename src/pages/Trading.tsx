import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, X } from 'lucide-react';
import { useTradeContext } from '../context/TradeContext';
import toast from 'react-hot-toast';

function Trading() {
  const {
    balance,
    setBalance,
    activeTrades,
    setActiveTrades,
    dailyPL,
    setDailyPL,
    totalTrades,
    setTotalTrades,
    forexPairs
  } = useTradeContext();

  const maxDailyLoss = balance * 0.10; // 10% daily loss limit

  const executeTrade = (pair: string, type: 'buy' | 'sell', price: number) => {
    const tradeAmount = 10000; // Standard lot size
    
    if (balance < tradeAmount) {
      toast.error('Insufficient balance!');
      return;
    }

    const newTrade = {
      id: Math.random().toString(36).substr(2, 9),
      pair,
      type,
      amount: tradeAmount,
      openPrice: price,
      timestamp: new Date()
    };

    setActiveTrades(prev => [...prev, newTrade]);
    setTotalTrades(prev => prev + 1);
    setBalance(prev => prev - tradeAmount);
    toast.success(`${type.toUpperCase()} order executed for ${pair}`);
  };

  const closeTrade = (trade: {
    id: string;
    pair: string;
    type: 'buy' | 'sell';
    amount: number;
    openPrice: number;
  }) => {
    const currentPrice = forexPairs.find(p => p.pair === trade.pair)?.price || trade.openPrice;
    let profit = 0;

    if (trade.type === 'buy') {
      profit = (currentPrice - trade.openPrice) * trade.amount * 100;
    } else {
      profit = (trade.openPrice - currentPrice) * trade.amount * 100;
    }

    if (dailyPL - profit < -maxDailyLoss) {
      toast.error('Daily loss limit reached!');
      return;
    }

    setDailyPL(prev => prev + profit);
    setBalance(prev => prev + trade.amount + profit);
    setActiveTrades(prev => prev.filter(t => t.id !== trade.id));
    toast.success(`Trade closed with ${profit > 0 ? 'profit' : 'loss'} of $${Math.abs(profit).toFixed(2)}`);
  };

  return (
    <div className="space-y-8">
      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {forexPairs.map((pair) => (
          <div key={pair.pair} className="bg-black/50 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold">{pair.pair}</h3>
                <p className="text-2xl font-bold mt-2">{pair.price.toFixed(4)}</p>
                <p className="text-sm text-gray-400">Spread: {pair.spread}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => executeTrade(pair.pair, 'buy', pair.price)}
                  className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors"
                >
                  <ArrowUpCircle className="w-6 h-6 text-green-500" />
                </button>
                <button
                  onClick={() => executeTrade(pair.pair, 'sell', pair.price)}
                  className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                >
                  <ArrowDownCircle className="w-6 h-6 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Trades */}
      <div className="bg-black/50 rounded-xl backdrop-blur-sm border border-purple-500/20 p-6">
        <h2 className="text-xl font-bold mb-4">Active Trades</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-4">Pair</th>
                <th className="pb-4">Type</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Open Price</th>
                <th className="pb-4">Current Price</th>
                <th className="pb-4">P/L</th>
                <th className="pb-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {activeTrades.map((trade) => {
                const currentPrice = forexPairs.find(p => p.pair === trade.pair)?.price || trade.openPrice;
                const profit = trade.type === 'buy' 
                  ? (currentPrice - trade.openPrice) * trade.amount * 100
                  : (trade.openPrice - currentPrice) * trade.amount * 100;

                return (
                  <tr key={trade.id} className="border-b border-gray-800">
                    <td className="py-4">{trade.pair}</td>
                    <td className={`py-4 ${trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                      {trade.type.toUpperCase()}
                    </td>
                    <td className="py-4">${trade.amount}</td>
                    <td className="py-4">{trade.openPrice.toFixed(4)}</td>
                    <td className="py-4">{currentPrice.toFixed(4)}</td>
                    <td className={`py-4 ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ${profit.toFixed(2)}
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => closeTrade(trade)}
                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {activeTrades.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-gray-500">
                    No active trades
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Trading;