import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, TrendingUp, Briefcase } from 'lucide-react';

function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-black/50 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <TrendingUp className="w-8 h-8 text-purple-400 transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              ForexPro
            </span>
          </Link>

          <div className="flex space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/') 
                  ? 'text-purple-400 bg-purple-500/10 shadow-lg shadow-purple-500/20' 
                  : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/5'
              }`}
            >
              <BarChart2 className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/trading"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/trading') 
                  ? 'text-purple-400 bg-purple-500/10 shadow-lg shadow-purple-500/20' 
                  : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/5'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Trading</span>
            </Link>

            <Link
              to="/portfolio"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/portfolio') 
                  ? 'text-purple-400 bg-purple-500/10 shadow-lg shadow-purple-500/20' 
                  : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/5'
              }`}
            >
              <Briefcase className="w-5 h-5" />
              <span>Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;