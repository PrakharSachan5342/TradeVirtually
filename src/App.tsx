import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Trading from './pages/Trading';
import Portfolio from './pages/Portfolio';
import { TradeProvider } from './context/TradeContext';

function App() {
  return (
    <Router>
      <TradeProvider>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black text-white relative overflow-hidden">
          {/* Animated gradient background */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black to-black"
            style={{
              backgroundSize: '400% 400%',
              animation: 'gradientAnimation 15s ease infinite'
            }}
          />
          
          {/* Enhanced grid overlay */}
          <div className="absolute inset-0 grid-overlay" />
          
          {/* Content */}
          <div className="relative z-10">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
              <Toaster 
                position="top-right"
                toastOptions={{
                  className: 'bg-black/90 text-white border border-purple-500/20',
                  duration: 3000,
                  style: {
                    background: 'rgba(0, 0, 0, 0.9)',
                    color: '#fff',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                  },
                }}
              />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/trading" element={<Trading />} />
                <Route path="/portfolio" element={<Portfolio />} />
              </Routes>
            </div>
          </div>
        </div>
      </TradeProvider>
    </Router>
  );
}

export default App;