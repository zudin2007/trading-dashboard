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
    { id: 2, emiten: 'BBCA', hargaBuy: 4850, hargaSL: 4650, portfolio: 'ihsg' },
    { id: 3, emiten: 'TLKM', hargaBuy: 3250, hargaSL: 3050, portfolio: 'ihsg' },
    { id: 4, emiten: 'ASII', hargaBuy: 7100, hargaSL: 6750, portfolio: 'ihsg' },
    { id: 5, emiten: 'NVDA', hargaBuy: 120.5, hargaSL: 115.2, portfolio: 'global' },
    { id: 6, emiten: 'AAPL', hargaBuy: 185.25, hargaSL: 178.5, portfolio: 'global' },
    { id: 7, emiten: 'MSFT', hargaBuy: 41
