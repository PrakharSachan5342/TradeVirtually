import React from 'react';
import { Wallet, Activity, LineChart, Users, TrendingUp, TrendingDown, Globe, Clock, AlertTriangle, Zap, Shield, Award } from 'lucide-react';
import { useTradeContext } from '../context/TradeContext';

function Dashboard() {
  const { balance, dailyPL, forexPairs } = useTradeContext();

  const marketStats = [
    { title: "Market Volatility", value: "Medium", icon: <Activity className="text-yellow-400" /> },
    { title: "Trading Volume", value: "$2.8T", icon: <Globe className="text-blue-400" /> },
    { title: "Market Hours", value: "24/5", icon: <Clock className="text-green-400" /> },
    { title: "Risk Level", value: "Moderate", icon: <AlertTriangle className="text-orange-400" /> }
  ];

  const tradingTips = [
    { title: "Risk Management", description: "Never risk more than 2% of your account on a single trade.", icon: <Shield /> },
    { title: "Market Analysis", description: "Combine technical and fundamental analysis for better results.", icon: <LineChart /> },
    { title: "Quick Execution", description: "Act fast on market opportunities while maintaining discipline.", icon: <Zap /> },
    { title: "Consistent Strategy", description: "Stick to your trading plan and avoid emotional decisions.", icon: <Award /> }
  ];

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/50 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20 card-hover-effect">
          <div className="flex items-center gap-3">
            <Wallet className="text-purple-400 w-8 h-8" />
            <div>
              <h3 className="text-gray-400 text-sm">Balance</h3>
              <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-black/50 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20 card-hover-effect">
          <div className="flex items-center gap-3">
            <Activity className="text-purple-400 w-8 h-8" />
            <div>
              <h3 className="text-gray-400 text-sm">Daily P/L</h3>
              <p className={`text-2xl font-bold ${dailyPL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ${dailyPL.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="bg-black/50 rounded-xl backdrop-blur-sm border border-purple-500/20 p-6">
        <h2 className="text-xl font-bold mb-6">Market Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {forexPairs.map((pair) => (
            <div key={pair.pair} className="bg-black/30 p-4 rounded-lg border border-purple-500/10 card-hover-effect">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{pair.pair}</h3>
                  <p className="text-2xl font-bold mt-2 live-data-pulse">{pair.price.toFixed(4)}</p>
                  <p className="text-sm text-gray-400">Spread: {pair.spread}</p>
                </div>
                <div className={`p-2 rounded-lg ${Math.random() > 0.5 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                  {Math.random() > 0.5 ? (
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-red-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Statistics */}
      <div className="bg-black/50 rounded-xl backdrop-blur-sm border border-purple-500/20 p-6">
        <h2 className="text-xl font-bold mb-6">Market Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {marketStats.map((stat, index) => (
            <div key={index} className="bg-black/30 p-4 rounded-lg border border-purple-500/10 card-hover-effect">
              <div className="flex items-center gap-3">
                {stat.icon}
                <div>
                  <h3 className="text-gray-400 text-sm">{stat.title}</h3>
                  <p className="text-lg font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trading Tips */}
      <div className="bg-black/50 rounded-xl backdrop-blur-sm border border-purple-500/20 p-6">
        <h2 className="text-xl font-bold mb-6">Trading Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tradingTips.map((tip, index) => (
            <div key={index} className="bg-black/30 p-4 rounded-lg border border-purple-500/10 card-hover-effect">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    {tip.icon}
                  </div>
                  <h3 className="font-semibold">{tip.title}</h3>
                </div>
                <p className="text-sm text-gray-400">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market News */}
      <div className="bg-black/50 rounded-xl backdrop-blur-sm border border-purple-500/20 p-6">
        <h2 className="text-xl font-bold mb-6">Market News</h2>
        <div className="space-y-4">
          {[
            {
              title: "Fed Signals Potential Rate Cuts",
              time: "2 hours ago",
              impact: "High",
              description: "Federal Reserve officials indicated they expect to cut interest rates this year, but emphasized the timing remains uncertain."
            },
            {
              title: "ECB Maintains Current Policy Stance",
              time: "4 hours ago",
              impact: "Medium",
              description: "The European Central Bank kept its key interest rates unchanged at its latest policy meeting."
            },
            {
              title: "Bank of Japan Discusses Yield Curve Control",
              time: "6 hours ago",
              impact: "Medium",
              description: "BOJ officials are reportedly discussing potential adjustments to their yield curve control policy."
            }
          ].map((news, index) => (
            <div key={index} className="bg-black/30 p-4 rounded-lg border border-purple-500/10 card-hover-effect">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{news.title}</h3>
                <span className="text-sm text-gray-400">{news.time}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  news.impact === 'High' ? 'bg-red-500/20 text-red-400' :
                  news.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {news.impact} Impact
                </span>
              </div>
              <p className="text-gray-400">{news.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;