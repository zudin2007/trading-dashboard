import React, { useState } from 'react';
import { TrendingUp, DollarSign, AlertCircle, Plus, Trash2, Eye, EyeOff, Settings } from 'lucide-react';

const TradingDashboard = () => {
  const [portfolios, setPortfolios] = useState({
    global: { name: 'GLOBAL', equity: 27586, currency: 'USD', rpt: 0.40, feeBuy: 0.15, feeSell: 0.25 },
    ihsg: { name: 'IHSG', equity: 100000000, currency: 'IDR', rpt: 0.40, feeBuy: 0.15, feeSell: 0.25 },
    crypto: { name: 'KRIPTO', equity: 50000, currency: 'USD', rpt: 0.40, feeBuy: 0.25, feeSell: 0.25 }
  });

  const [positions, setPositions] = useState([
    { id: 1, emiten: 'ACES', hargaBuy: 710, hargaSL: 655, portfolio: 'ihsg' },
    { id: 5, emiten: 'NVDA', hargaBuy: 120.5, hargaSL: 115.2, portfolio: 'global' },
    { id: 9, emiten: 'BTC', hargaBuy: 45250, hargaSL: 42500, portfolio: 'crypto' }
  ]);

  const [newPosition, setNewPosition] = useState({ emiten: '', hargaBuy: '', hargaSL: '', portfolio: 'ihsg' });
  const [showForm, setShowForm] = useState(false);
  const [visibleMetrics, setVisibleMetrics] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const calculateRiskMetrics = (portfolio) => {
    // Risk Nominal = (Equity × RPT) / 100
    const nominalRisiko = (portfolio.equity * portfolio.rpt) / 100;
    return { nominalRisiko };
  };

  const calculatePosition = (position) => {
    const portfolio = portfolios[position.portfolio];
    
    // Range % = |Price Buy - SL| / Price Buy × 100
    const range = Math.abs(position.hargaBuy - position.hargaSL) / position.hargaBuy * 100;
    
    // Risk Nominal
    const { nominalRisiko } = calculateRiskMetrics(portfolio);
    
    // Fee Total (dalam %) = (Fee Beli + Fee Jual) = total biaya transaksi
    // Contoh: feeBuy 0.15% + feeSell 0.25% = 0.40% total
    const feeTotalPersen = portfolio.feeBuy + portfolio.feeSell;
    const feeDecimal = feeTotalPersen / 100; // Ubah ke desimal: 0.40% = 0.004
    
    // Lot Buy = Risk Nominal / (Price × (Range% / 100)) / (1 + Fee Decimal)
    // Penyederhanaan: Risk / (Price × Range%) / (1 + Fee)
    const denominator = position.hargaBuy * (range / 100) * (1 + feeDecimal);
    const lotBuy = nominalRisiko / denominator;
    
    // Nominal Buy = Lot × Price
    const nominalBuy = lotBuy * position.hargaBuy;
    
    return {
      range: range.toFixed(2),
      nominalRisiko: nominalRisiko.toFixed(2),
      lotBuy: lotBuy.toFixed(6),
      nominalBuy: nominalBuy.toFixed(2),
      currency: portfolio.currency
    };
  };

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

  const handleDeletePosition = (id) => {
    setPositions(positions.filter(p => p.id !== id));
  };

  const handlePortfolioUpdate = (key, field, value) => {
    setPortfolios(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: parseFloat(value) || value }
    }));
  };

  const handleEditPosition = (id) => {
    const pos = positions.find(p => p.id === id);
    if (pos) {
      setEditingId(id);
      setNewPosition({ 
        emiten: pos.emiten, 
        hargaBuy: pos.hargaBuy.toString(), 
        hargaSL: pos.hargaSL.toString(), 
        portfolio: pos.portfolio 
      });
      setShowForm(true);
    }
  };

  const handleSaveEdit = () => {
    if (editingId && newPosition.emiten && newPosition.hargaBuy && newPosition.hargaSL) {
      setPositions(positions.map(p => 
        p.id === editingId 
          ? { ...p, emiten: newPosition.emiten.toUpperCase(), hargaBuy: parseFloat(newPosition.hargaBuy), hargaSL: parseFloat(newPosition.hargaSL), portfolio: newPosition.portfolio }
          : p
      ));
      setEditingId(null);
      setNewPosition({ emiten: '', hargaBuy: '', hargaSL: '', portfolio: 'ihsg' });
      setShowForm(false);
    }
  };

  const getPortfolioColor = (key) => {
    const colors = {
      global: { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)', text: '#1e40af' },
      ihsg: { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.3)', text: '#166534' },
      crypto: { bg: 'rgba(168, 85, 247, 0.1)', border: 'rgba(168, 85, 247, 0.3)', text: '#6d28d9' }
    };
    return colors[key] || colors.global;
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>
      {/* Header */}
      <div className="border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #3b82f6, #60a5fa)' }}>
              <TrendingUp className="w-6 h-6" style={{ color: '#ffffff' }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Playfair Display, serif' }}>Trading Dashboard</h1>
              <p className="text-sm text-slate-500">Money Management & Risk Calculator</p>
            </div>
          </div>
          <button 
            onClick={() => setVisibleMetrics(!visibleMetrics)}
            className="p-2 hover:bg-slate-100 rounded-lg transition"
          >
            {visibleMetrics ? <Eye className="w-5 h-5 text-slate-600" /> : <EyeOff className="w-5 h-5 text-slate-600" />}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Portfolio Overview Section */}
        <div className="mb-16">
          <h2 className="text-lg font-semibold text-slate-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Portfolio Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(portfolios).map(([key, portfolio]) => {
              const { nominalRisiko } = calculateRiskMetrics(portfolio);
              const color = getPortfolioColor(key);
              return (
                <div 
                  key={key}
                  className="rounded-2xl p-8 border-2 transition-all hover:shadow-lg hover:-translate-y-1"
                  style={{ 
                    background: '#ffffff',
                    borderColor: color.border,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  {/* Portfolio Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900" style={{ color: color.text }}>
                        {portfolio.name}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">{portfolio.currency}</p>
                    </div>
                    <Settings className="w-5 h-5 text-slate-400" />
                  </div>

                  {/* Main Metrics */}
                  <div className="space-y-6">
                    {/* Equity */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Modal</label>
                      <div className="flex items-baseline gap-2">
                        <input
                          type="number"
                          value={portfolio.equity}
                          onChange={(e) => handlePortfolioUpdate(key, 'equity', e.target.value)}
                          className="text-2xl font-bold bg-transparent border-b-2 border-slate-300 focus:border-blue-400 outline-none text-slate-900 pb-1 transition"
                          style={{ width: '60%', borderColor: color.border }}
                        />
                        <span className="text-sm text-slate-500">{portfolio.currency}</span>
                      </div>
                    </div>

                    {/* RPT & Risk */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">RPT %</label>
                        <input
                          type="number"
                          step="0.01"
                          value={portfolio.rpt}
                          onChange={(e) => handlePortfolioUpdate(key, 'rpt', e.target.value)}
                          className="text-lg font-bold bg-transparent border-b-2 border-slate-300 focus:border-blue-400 outline-none text-slate-900 pb-1 transition w-full"
                          style={{ borderColor: color.border }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Risk Nominal</label>
                        <div className="text-lg font-bold text-slate-900">
                          {visibleMetrics ? nominalRisiko.toLocaleString() : '•••••'}
                        </div>
                      </div>
                    </div>

                    {/* Fees */}
                    <div className="pt-4 border-t border-slate-200">
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Biaya Trading</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-slate-500 mb-2">Fee Beli %</p>
                          <input
                            type="number"
                            step="0.01"
                            value={portfolio.feeBuy}
                            onChange={(e) => handlePortfolioUpdate(key, 'feeBuy', e.target.value)}
                            className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-400 transition w-full"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-2">Fee Jual %</p>
                          <input
                            type="number"
                            step="0.01"
                            value={portfolio.feeSell}
                            onChange={(e) => handlePortfolioUpdate(key, 'feeSell', e.target.value)}
                            className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-400 transition w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trading Positions Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold text-slate-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Trading Positions
            </h2>
            <button
              onClick={() => {
                setEditingId(null);
                setNewPosition({ emiten: '', hargaBuy: '', hargaSL: '', portfolio: 'ihsg' });
                setShowForm(!showForm);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl transition font-semibold text-sm text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              style={{ 
                background: 'linear-gradient(135deg, #3b82f6, #60a5fa)'
              }}
            >
              <Plus className="w-4 h-4" /> Add Position
            </button>
          </div>

          {/* Add/Edit Position Form */}
          {showForm && (
            <div 
              className="rounded-2xl p-8 mb-8 border-2 border-blue-300 shadow-lg"
              style={{ 
                background: '#ffffff'
              }}
            >
              <h3 className="font-semibold text-slate-900 mb-6">{editingId ? 'Edit Trading Position' : 'New Trading Position'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Emiten</label>
                  <input
                    type="text"
                    placeholder="e.g., ACES"
                    value={newPosition.emiten}
                    onChange={(e) => setNewPosition({ ...newPosition, emiten: e.target.value.toUpperCase() })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:border-blue-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Harga Buy</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={newPosition.hargaBuy}
                    onChange={(e) => setNewPosition({ ...newPosition, hargaBuy: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:border-blue-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Harga SL</label>
                  <input
                    type="number"
                    placeholder="Stop Loss"
                    value={newPosition.hargaSL}
                    onChange={(e) => setNewPosition({ ...newPosition, hargaSL: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:border-blue-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Portfolio</label>
                  <select
                    value={newPosition.portfolio}
                    onChange={(e) => setNewPosition({ ...newPosition, portfolio: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:border-blue-400 transition"
                  >
                    <option value="global">GLOBAL</option>
                    <option value="ihsg">IHSG</option>
                    <option value="crypto">KRIPTO</option>
                  </select>
                </div>
                <div className="flex items-end gap-2">
                  <button
                    onClick={editingId ? handleSaveEdit : handleAddPosition}
                    className="flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition text-white bg-blue-500 hover:bg-blue-600"
                  >
                    {editingId ? 'Save' : 'Add'}
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      setNewPosition({ emiten: '', hargaBuy: '', hargaSL: '', portfolio: 'ihsg' });
                    }}
                    className="flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition text-slate-700 bg-slate-200 hover:bg-slate-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Positions Table */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-lg" style={{ background: '#ffffff' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%)', borderBottom: '2px solid #e2e8f0' }}>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Emiten</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Harga Buy</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">SL</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Range %</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Risk Nominal</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Lot Buy</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Nominal Buy</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((position, idx) => {
                    const metrics = calculatePosition(position);
                    return (
                      <tr 
                        key={position.id}
                        style={{ 
                          background: idx % 2 === 0 ? '#f9fafb' : '#ffffff',
                          borderBottom: '1px solid #e5e7eb'
                        }}
                        className="hover:bg-blue-50 transition"
                      >
                        <td className="px-6 py-4 text-slate-900 font-semibold">{position.emiten}</td>
                        <td className="px-6 py-4 text-right text-slate-700">{position.hargaBuy}</td>
                        <td className="px-6 py-4 text-right text-slate-700">{position.hargaSL}</td>
                        <td className="px-6 py-4 text-right">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                            {metrics.range}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-slate-900 font-semibold">
                          {visibleMetrics ? metrics.nominalRisiko : '•••••'} {metrics.currency}
                        </td>
                        <td className="px-6 py-4 text-right text-slate-900 font-bold text-lg">
                          {visibleMetrics ? (
                            position.portfolio === 'ihsg' 
                              ? (parseFloat(metrics.lotBuy) / 100).toFixed(0)
                              : parseFloat(metrics.lotBuy).toFixed(6)
                          ) : '•••••'}
                        </td>
                        <td className="px-6 py-4 text-right text-slate-900 font-semibold">
                          {visibleMetrics ? metrics.nominalBuy : '•••••'} {metrics.currency}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleEditPosition(position.id)}
                              className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600"
                              title="Edit"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDeletePosition(position.id)}
                              className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {positions.length === 0 && (
              <div className="text-center py-16">
                <DollarSign className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">No positions yet. Add your first trade to get started.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div 
            className="rounded-2xl p-6 border border-slate-200 flex gap-4 shadow-lg"
            style={{ background: '#ffffff' }}
          >
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Bagaimana Cara Kerja?</h4>
              <p className="text-sm text-slate-600">
                Dashboard menghitung ukuran lot yang aman berdasarkan modal Anda, risk per trade (RPT), dan jarak stop loss. Setiap kalkulasi sudah mempertimbangkan biaya transaksi (fee).
              </p>
            </div>
          </div>

          <div 
            className="rounded-2xl p-6 border border-slate-200 flex gap-4 shadow-lg"
            style={{ background: '#ffffff' }}
          >
            <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Tips Money Management</h4>
              <p className="text-sm text-slate-600">
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
