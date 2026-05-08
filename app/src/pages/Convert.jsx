import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpDown, CheckCircle } from 'lucide-react';
import { wallets } from '../data/dummy';
import useRates, { getRate } from '../hooks/useRates';

export default function Convert() {
  const navigate = useNavigate();
  const [fromId, setFromId] = useState('usd');
  const [toId, setToId] = useState('eur');
  const [amount, setAmount] = useState('');
  const [converted, setConverted] = useState(false);

  const { rates, loading: ratesLoading } = useRates();

  const from = wallets.find(w => w.id === fromId);
  const to = wallets.find(w => w.id === toId) || { currency: 'EUR', symbol: '€', flag: '🇪🇺' };
  const rate = getRate(from.currency, to.currency, rates);
  const markup = 0.022;
  const effectiveRate = rate;
  const youGet = amount ? (parseFloat(amount) * effectiveRate).toFixed(2) : '';
  const fee = amount ? (parseFloat(amount) * markup).toFixed(2) : '';

  function swapCurrencies() {
    const tmp = fromId;
    setFromId(toId === 'eur' ? 'eur' : fromId);
    setToId(tmp);
    setAmount('');
  }

  const currencies = [
    { id: 'usd', currency: 'USD', symbol: '$', flag: '🇺🇸' },
    { id: 'eur', currency: 'EUR', symbol: '€', flag: '🇪🇺' },
    { id: 'gbp', currency: 'GBP', symbol: '£', flag: '🇬🇧' },
    { id: 'aud', currency: 'AUD', symbol: 'A$', flag: '🇦🇺' },
    { id: 'cad', currency: 'CAD', symbol: 'C$', flag: '🇨🇦' },
    { id: 'sgd', currency: 'SGD', symbol: 'S$', flag: '🇸🇬' },
  ];

  if (converted) {
    return (
      <div className="p-4 max-w-2xl">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center space-y-4 mt-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={32} className="text-green-500" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">Conversion Successful!</p>
            <p className="text-sm text-gray-500 mt-1">
              {from.symbol}{parseFloat(amount).toLocaleString()} {from.currency} → {to.symbol}{parseFloat(youGet).toLocaleString()} {to.currency}
            </p>
          </div>
          <p className="text-xs text-gray-400">Rate: 1 {from.currency} = {effectiveRate} {to.currency}</p>
          <button onClick={() => navigate('/')} className="w-full bg-[#0062db] text-white font-semibold py-3 rounded-xl text-sm">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-5 max-w-2xl">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-8 h-8 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Convert Currency</h1>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
        {/* From */}
        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">You Send</label>
          <div className="flex gap-2">
            <select
              value={fromId}
              onChange={e => setFromId(e.target.value)}
              className="w-28 shrink-0 border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#0062db] font-medium"
            >
              {currencies.map(c => (
                <option key={c.id} value={c.id}>{c.flag} {c.currency}</option>
              ))}
            </select>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0.00"
              className="min-w-0 flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-lg font-bold focus:outline-none focus:border-[#0062db]"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1 pl-1">
            Available: {from.symbol}{from.unlienBalance?.toLocaleString() ?? '—'}
          </p>
        </div>

        {/* Swap button */}
        <div className="flex justify-center">
          <button
            onClick={swapCurrencies}
            className="w-9 h-9 bg-[#e8f0fe] rounded-full flex items-center justify-center"
          >
            <ArrowUpDown size={16} className="text-[#0062db]" />
          </button>
        </div>

        {/* To */}
        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">You Receive</label>
          <div className="flex gap-2">
            <select
              value={toId}
              onChange={e => setToId(e.target.value)}
              className="w-28 shrink-0 border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#0062db] font-medium"
            >
              {currencies.filter(c => c.id !== fromId).map(c => (
                <option key={c.id} value={c.id}>{c.flag} {c.currency}</option>
              ))}
            </select>
            <div className="min-w-0 flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-lg font-bold text-gray-400 bg-gray-50 truncate">
              {youGet || '0.00'}
            </div>
          </div>
        </div>

        {/* Rate info */}
        {amount && (
          <div className="bg-[#f5f7fa] rounded-xl p-3 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Exchange Rate</span>
              <span className="font-semibold text-gray-800">1 {from.currency} = {effectiveRate} {to.currency}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Borderless Markup</span>
              <span className="font-semibold text-gray-800">2.2% (inclusive)</span>
            </div>
            <div className="flex justify-between text-xs border-t border-gray-200 pt-1.5">
              <span className="text-gray-700 font-medium">You Receive</span>
              <span className="font-bold text-[#0062db]">{to.symbol || ''}{youGet}</span>
            </div>
          </div>
        )}

        <button
          onClick={() => setConverted(true)}
          disabled={!amount}
          className="w-full bg-[#0062db] text-white font-semibold py-3 rounded-xl text-sm disabled:opacity-50"
        >
          Convert Now
        </button>
      </div>

      {/* Rate info banner */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-gray-700">Live Rates (vs USD)</p>
          {ratesLoading && <span className="text-xs text-gray-400">Fetching…</span>}
        </div>
        <div className="space-y-2">
          {currencies.filter(c => c.id !== 'usd').map(c => (
            <div key={c.id} className="flex justify-between text-xs text-gray-600">
              <span>{c.flag} USD → {c.currency}</span>
              <span className="font-medium">{getRate('USD', c.currency, rates).toFixed(4)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
