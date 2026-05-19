import React, { useState, useMemo } from 'react';
import { TrendingUp, DollarSign, AlertCircle, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

const TradingDashboard = () => {
  // State untuk Portfolio Parameters
  const [portfolios, setPortfolios] = useState({
    global: { name: 'GLOBAL', equity: 27586, currency: 'USD', rpt: 0.40, feeBuy: 0.15, feeSell: 0.25 },
    ihsg: { name: 'IHSG', equity: 100000000, currency: 'IDR', rpt: 0.40, feeBuy: 0.15, feeSell: 0.25 },
    crypto: { name: 'KRIPTO', equity: 50000, currency: 'USD', rpt: 0.40, feeBuy: 0.25, feeSell: 0.25 }
  });

  // State untuk Trading Positions
  const [positions, setPositions] = useState([
    // IHSG Positions
    { id: 1, emiten: 'ACES', hargaBuy: 710, hargaSL: 655, portfolio: 'ihsg' },
    { id: 2, emiten: 'BBCA', hargaBuy: 4850, hargaSL: 4650, portfolio: 'ihsg' },
    { id: 3, emiten: 'TLKM', hargaBuy: 3250, hargaSL: 3050, portfolio: 'ihsg' },
    { id: 4, emiten: 'ASII', hargaBuy: 7100, hargaSL: 6750, portfolio: 'ihsg' },
    // GLOBAL Positions
    { id: 5, emiten: 'NVDA', hargaBuy: 120.5, hargaSL: 115.2, portfolio: 'global' },
    { id: 6, emiten: 'AAPL', hargaBuy: 185.25, hargaSL: 178.5, portfolio: 'global' },
    { id: 7, emiten: 'MSFT', hargaBuy: 412.75, hargaSL: 398.5, portfolio: 'global' },
    { id: 8, emiten: 'TSLA', hargaBuy: 245.30, hargaSL: 232.5, portfolio: 'global' },
    // KRIPTO Positions
    { id: 9, emiten: 'BTC', hargaBuy: 45250, hargaSL: 42500, portfolio: 'crypto' },
    { id: 10, emiten: 'ETH', hargaBuy: 2850, hargaSL: 2650, portfolio: 'crypto' },
    { id: 11, emiten: 'SOL', hargaBuy: 185.50, hargaSL: 170.25, portfolio: 'crypto' }
  ]);

  const [newPosition, setNewPosition] = useState({ emiten: '', hargaBuy: '', hargaSL: '', portfolio: 'ihsg' });
  const [showForm, setShowForm] = useState(false);

  // Fungsi perhitungan risiko
  const calculateRiskMetrics = (portfolio) => {
    const nominalRisiko = (portfolio.equity * portfolio.rpt) / 100;
    return { nominalRisiko };
  };

  // Fungsi perhitungan posisi
  const calculatePosition = (position) => {
    const portfolio = portfolios[position.portfolio];
    const range = Math.abs(position.hargaBuy - position.hargaSL) / position.hargaBuy * 100;
    const { nominalRisiko } = calculateRiskMetrics(portfolio);
    
    // Perhitungan Lot Buy dengan fee
    const feePersentase = (portfolio.feeBuy + portfolio.feeSell) / 100;
    const lotBuy = nominalRisiko / (position.hargaBuy * range / 100) / (1 + feePersentase);
    const nominalBuy = lotBuy * position.hargaBuy;
    
    return {
      range: range.toFixed(2),
      nominalRisiko: nominalRisiko.toFixed(2),
      lotBuy: lotBuy.toFixed(0),
      nominalBuy: nominalBuy.toFixed(2),
      currency: portfolio.currency
    };
  };

  // Handle add position
  const handleAddPosition = () => {
    if (newPosition.emiten && newPosition.hargaBuy && newPosition.hargaSL) {
      setPositions([...positions, { 
        id: Date.now(), 
        ...newPosition,
        hargaBuy: parseFloat(newPosition.hargaBuy),
        hargaSL: parseFloat(newPosition.hargaSL)
      }]);
      setNewPosition({ emiten: '', hargaBuy: '', hargaSL: '', portfolio: 'ihsg' });
      setShowForm(false);
    }
  };

  // Handle delete position
  const handleDeletePosition = (id) => {
    setPositions(positions.filter(p => p.id !== id));
  };

  // Handle portfolio parameter update
  const handlePortfolioUpdate = (key, field, value) => {
    setPortfolios(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: parseFloat(value) || value }
    }));
  };

  // Calculate total metrics
  const totalEquity = Object.values(portfolios).reduce((sum, p) => {
    const priceFactor = p.currency === 'USD' ? 1 : 1; // Simplified
    return sum + p.equity;
  }, 0);

  const [visibleMetrics, setVisibleMetrics] = useState(true);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 100%)' }}>
      {/* Header */}
      <div className="border-b border-amber-900/30 sticky top-0 z-50 backdrop-blur-sm" style={{ background: 'rgba(15, 15, 30, 0.8)' }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ background: 'linear-gradient(135deg, #d4af37, #f0d070)' }}>
              <TrendingUp className="w-5 h-5" style={{ color: '#0f0f1e' }} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-amber-50" style={{ fontFamily: 'Playfair Display, serif' }}>Trading Money Management</h1>
              <p className="text-xs text-amber-200/60">Risk Management Dashboard</p>
            </div>
          </div>
          <button 
            onClick={() => setVisibleMetrics(!visibleMetrics)}
            className="p-2 hover:bg-amber-900/20 rounded-lg transition"
          >
            {visibleMetrics ? <Eye className="w-5 h-5 text-amber-200" /> : <EyeOff className="w-5 h-5 text-amber-200" />}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Portfolio Parameters Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {Object.entries(portfolios).map(([key, portfolio]) => {
            const { nominalRisiko } = calculateRiskMetrics(portfolio);
            return (
              <div 
                key={key}
                className="rounded-xl p-6 border transition-all hover:border-amber-600/50"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(240, 208, 112, 0.03) 100%)',
                  borderColor: 'rgba(212, 175, 55, 0.2)'
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-amber-50" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {portfolio.name}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-amber-900/30 text-amber-200">
                    {portfolio.currency}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-amber-300/70 mb-2 font-medium">EQUITY / MODAL</label>
                    <input
                      type="number"
                      value={portfolio.equity}
                      onChange={(e) => handlePortfolioUpdate(key, 'equity', e.target.value)}
                      className="w-full bg-amber-950/20 border border-amber-700/30 rounded-lg px-3 py-2 text-amber-50 text-sm focus:outline-none focus:border-amber-600/60 transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-amber-300/70 mb-2 font-medium">RPT (%)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={portfolio.rpt}
                        onChange={(e) => handlePortfolioUpdate(key, 'rpt', e.target.value)}
                        className="w-full bg-amber-950/20 border border-amber-700/30 rounded-lg px-3 py-2 text-amber-50 text-sm focus:outline-none focus:border-amber-600/60 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-amber-300/70 mb-2 font-medium">RISK NOMINAL</label>
                      <div className="w-full bg-amber-900/30 border border-amber-700/30 rounded-lg px-3 py-2 text-amber-50 text-sm font-semibold">
                        {visibleMetrics ? nominalRisiko.toLocaleString() : '•••••'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-amber-700/20">
                    <div>
                      <label className="block text-xs text-amber-300/70 mb-1 font-medium">FEE BELI</label>
                      <input
                        type="number"
                        step="0.01"
                        value={portfolio.feeBuy}
                        onChange={(e) => handlePortfolioUpdate(key, 'feeBuy', e.target.value)}
                        className="w-full bg-amber-950/20 border border-amber-700/30 rounded-lg px-3 py-2 text-amber-50 text-xs focus:outline-none focus:border-amber-600/60 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-amber-300/70 mb-1 font-medium">FEE JUAL</label>
                      <input
                        type="number"
                        step="0.01"
                        value={portfolio.feeSell}
                        onChange={(e) => handlePortfolioUpdate(key, 'feeSell', e.target.value)}
                        className="w-full bg-amber-950/20 border border-amber-700/30 rounded-lg px-3 py-2 text-amber-50 text-xs focus:outline-none focus:border-amber-600/60 transition"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trading Positions Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-amber-50" style={{ fontFamily: 'Playfair Display, serif' }}>
              Trading Positions
            </h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium text-sm"
              style={{ 
                background: 'linear-gradient(135deg, #d4af37, #f0d070)',
                color: '#0f0f1e'
              }}
            >
              <Plus className="w-4 h-4" /> Add Position
            </button>
          </div>

          {/* Add Position Form */}
          {showForm && (
            <div 
              className="rounded-xl p-6 mb-6 border"
              style={{ 
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(240, 208, 112, 0.04) 100%)',
                borderColor: 'rgba(212, 175, 55, 0.3)'
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-xs text-amber-300/70 mb-2 font-medium">EMITEN</label>
                  <input
                    type="text"
                    placeholder="e.g., ACES"
                    value={newPosition.emiten}
                    onChange={(e) => setNewPosition({ ...newPosition, emiten: e.target.value.toUpperCase() })}
                    className="w-full bg-amber-950/20 border border-amber-700/30 rounded-lg px-3 py-2 text-amber-50 text-sm focus:outline-none focus:border-amber-600/60 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-amber-300/70 mb-2 font-medium">HARGA BUY</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={newPosition.hargaBuy}
                    onChange={(e) => setNewPosition({ ...newPosition, hargaBuy: e.target.value })}
                    className="w-full bg-amber-950/20 border border-amber-700/30 rounded-lg px-3 py-2 text-amber-50 text-sm focus:outline-none focus:border-amber-600/60 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-amber-300/70 mb-2 font-medium">HARGA SL</label>
                  <input
                    type="number"
                    placeholder="Stop Loss"
                    value={newPosition.hargaSL}
                    onChange={(e) => setNewPosition({ ...newPosition, hargaSL: e.target.value })}
                    className="w-full bg-amber-950/20 border border-amber-700/30 rounded-lg px-3 py-2 text-amber-50 text-sm focus:outline-none focus:border-amber-600/60 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-amber-300/70 mb-2 font-medium">PORTFOLIO</label>
                  <select
                    value={newPosition.portfolio}
                    onChange={(e) => setNewPosition({ ...newPosition, portfolio: e.target.value })}
                    className="w-full bg-amber-950/20 border border-amber-700/30 rounded-lg px-3 py-2 text-amber-50 text-sm focus:outline-none focus:border-amber-600/60 transition"
                  >
                    <option value="global">GLOBAL</option>
                    <option value="ihsg">IHSG</option>
                    <option value="crypto">KRIPTO</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleAddPosition}
                    className="w-full px-4 py-2 rounded-lg font-medium text-sm transition"
                    style={{ 
                      background: 'linear-gradient(135deg, #d4af37, #f0d070)',
                      color: '#0f0f1e'
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Positions Table */}
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'rgba(212, 175, 55, 0.08)', borderBottomColor: 'rgba(212, 175, 55, 0.2)' }} className="border-b">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-amber-200 uppercase tracking-wide">Emiten</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-amber-200 uppercase tracking-wide">Harga Buy</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-amber-200 uppercase tracking-wide">SL</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-amber-200 uppercase tracking-wide">Range %</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-amber-200 uppercase tracking-wide">Risk Nominal</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-amber-200 uppercase tracking-wide">Lot Buy</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-amber-200 uppercase tracking-wide">Nominal Buy</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-amber-200 uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((position, idx) => {
                    const metrics = calculatePosition(position);
                    return (
                      <tr 
                        key={position.id}
                        style={{ 
                          background: idx % 2 === 0 ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                          borderBottomColor: 'rgba(212, 175, 55, 0.1)'
                        }}
                        className="border-b hover:bg-amber-900/10 transition"
                      >
                        <td className="px-6 py-4 text-amber-50 font-semibold">{position.emiten}</td>
                        <td className="px-6 py-4 text-right text-amber-100">{position.hargaBuy}</td>
                        <td className="px-6 py-4 text-right text-amber-100">{position.hargaSL}</td>
                        <td className="px-6 py-4 text-right">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-900/30 text-amber-200">
                            {metrics.range}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-amber-50 font-semibold">
                          {visibleMetrics ? metrics.nominalRisiko : '•••••'} {metrics.currency}
                        </td>
                        <td className="px-6 py-4 text-right text-amber-50 font-bold text-lg">
                          {visibleMetrics ? (
                            portfolios[position.portfolio].currency === 'IDR' 
                              ? metrics.lotBuy 
                              : parseFloat(metrics.lotBuy).toFixed(4)
                          ) : '•••••'}
                        </td>
                        <td className="px-6 py-4 text-right text-amber-50 font-semibold">
                          {visibleMetrics ? metrics.nominalBuy : '•••••'} {metrics.currency}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleDeletePosition(position.id)}
                            className="p-2 hover:bg-red-900/30 rounded-lg transition text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {positions.length === 0 && (
              <div className="text-center py-12">
                <DollarSign className="w-12 h-12 text-amber-600/30 mx-auto mb-3" />
                <p className="text-amber-400/60">No positions yet. Add your first trade to get started.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div 
            className="rounded-xl p-6 border flex gap-4"
            style={{ 
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(240, 208, 112, 0.03) 100%)',
              borderColor: 'rgba(212, 175, 55, 0.2)'
            }}
          >
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-amber-50 mb-2">Bagaimana Cara Kerja?</h4>
              <p className="text-sm text-amber-200/70">
                Dashboard menghitung ukuran lot yang aman berdasarkan modal Anda, risk per trade (RPT), dan jarak stop loss. Setiap kalkulasi sudah mempertimbangkan biaya transaksi (fee).
              </p>
            </div>
          </div>

          <div 
            className="rounded-xl p-6 border flex gap-4"
            style={{ 
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(240, 208, 112, 0.03) 100%)',
              borderColor: 'rgba(212, 175, 55, 0.2)'
            }}
          >
            <TrendingUp className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-amber-50 mb-2">Tips Money Management</h4>
              <p className="text-sm text-amber-200/70">
                Jangan pernah bermain dengan risiko lebih dari yang sudah dihitung. RPT 0.4% berarti Anda hanya boleh rugi maksimal 0.4% dari total modal per transaksi.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default TradingDashboard;