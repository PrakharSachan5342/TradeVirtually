import React from 'react';
import { useTradeContext } from '../context/TradeContext';
import { PieChart, BarChart, Activity, TrendingUp, TrendingDown } from 'lucide-react';

function Portfolio() {
  const { balance, dailyPL, totalTrades, activeTrades } = useTradeContext();

  const portfolioStats = [
    {
      title: "Total Balance",
      value: `$${balance.toFixed(2)}`,
      change: "+2.5%",
      icon: <PieChart className="w-6 h-6 text-purple-400" />
    },
    {
      title: "Daily P/L",
      value: `$${dailyPL.toFixed(2)}`,
      change: dailyPL >= 0 ? "+1.2%" : "-1.2%",
      icon: <Activity className="w-6 h-6 text-purple-400" />
    },
    {
      title: "Win Rate",
      value: "68%",
      change: "+5%",
      icon: <BarChart className="w-6 h-6 text-purple-400" />
    }
  ];

  const tradeHistory = [
    { pair: "EUR/USD", type: "BUY", profit: 250.50, date: "2024-03-15" },
    { pair: "GBP/USD", type: "SELL", profit: -120.30, date: "2024-03-15" },
    { pair: "USD/JPY", type: "BUY", profit: 180.20, date: "2024-03-14" },
    { pair: "USD/CHF", type: "SELL", profit: 95.60, date: "2024-03-14" },
    { pair: "AUD/USD", type: "BUY", profit: -75.40, date: "2024-03-13" }
  ];

  return (
    <div className="space-y-8">
      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portfolioStats.map((stat, index) => (
          <div key={index} className="bg-black/50 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-400 text-sm">{stat.title}</h3>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} this week
                </p>
              </div>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Portfolio Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/50 rounded-xl backdrop-blur-sm border border-purple-500/20 p-6">
          <h2 className="text-xl font-bold mb-6">Currency Pair Distribution</h2>
          <div className="space-y-4">
            {activeTrades.reduce((acc, trade) => {
              const existing = acc.find(t => t.pair === trade.pair);
              if (existing) {
                existing.amount += trade.amount;
              } else {
                acc.push({ pair: trade.pair, amount: trade.amount });
              }
              return acc;
            }, [] as { pair: string; amount: number }[]).map((distribution, index) => (
              <div key={index} className="bg-black/30 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{distribution.pair}</span>
                  <span className="text-purple-400">${distribution.amount}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${(distribution.amount / balance) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
            {activeTrades.length === 0 && (
              <p className="text-center text-gray-500">No active trades</p>
            )}
          </div>
        </div>

        <div className="bg-black/50 rounded-xl backdrop-blur-sm border border-purple-500/20 p-6">
          <h2 className="text-xl font-bold mb-6">Trade History</h2>
          <div className="space-y-4">
            {tradeHistory.map((trade, index) => (
              <div key={index} className="bg-black/30 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {trade.profit >= 0 ? (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                  <div>
                    <h3 className="font-semibold">{trade.pair}</h3>
                    <p className="text-sm text-gray-400">{trade.date}</p>
                  </div>
                </div>
                <div>
                  <p className={`font-bold ${trade.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-400">{trade.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trading Performance */}
      <div className="bg-black/50 rounded-xl backdrop-blur-sm border border-purple-500/20 p-6">
        <h2 className="text-xl font-bold mb-6">Trading Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/30 p-4 rounded-lg">
            <h3 className="text-gray-400 mb-2">Total Trades</h3>
            <p className="text-2xl font-bold">{totalTrades}</p>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500">+12% vs last week</span>
            </div>
          </div>

          <div className="bg-black/30 p-4 rounded-lg">
            <h3 className="text-gray-400 mb-2">Average Trade Duration</h3>
            <p className="text-2xl font-bold">45m</p>
            <div className="flex items-center gap-2 mt-2">
              <TrendingDown className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-500">-5% vs last week</span>
            </div>
          </div>

          <div className="bg-black/30 p-4 rounded-lg">
            <h3 className="text-gray-400 mb-2">Success Rate</h3>
            <p className="text-2xl font-bold">68%</p>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500">+3% vs last week</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
