import { useState } from 'react';
import { Snowflake, Eye, EyeOff, Settings, ChevronDown, ChevronUp, CreditCard, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { card, transactions } from '../data/dummy';
import borderlessFavicon from '../assets/borderless_favicon.png';

function TxIcon({ tx }) {
  if (tx.icon === 'card') {
    return (
      <div className="w-9 h-9 bg-[#e8f0fe] rounded-xl flex items-center justify-center">
        <CreditCard size={17} className="text-[#0062db]" />
      </div>
    );
  }
  if (tx.type === 'credit') {
    return (
      <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
        <ArrowDownLeft size={17} className="text-green-500" />
      </div>
    );
  }
  return (
    <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
      <ArrowUpRight size={17} className="text-red-400" />
    </div>
  );
}

export default function CardPage() {
  const [frozen, setFrozen] = useState(card.frozen);
  const [showNumber, setShowNumber] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [perTxLimit, setPerTxLimit] = useState(500);
  const [dailyLimit, setDailyLimit] = useState(1000);
  const [spendLimit, setSpendLimit] = useState(card.spendLimit);

  const spentPct = Math.round((card.spentThisMonth / spendLimit) * 100);

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-5">My Card</h1>

      <div className="md:grid md:grid-cols-2 md:gap-6 md:items-start space-y-5 md:space-y-0">
        {/* Left col: card + controls */}
        <div className="space-y-4">
          {/* Card Visual */}
          <div className="relative max-w-sm mx-auto">
            <div
              className={`rounded-3xl p-6 text-white transition-all duration-300 flex flex-col justify-between ${frozen ? 'opacity-70 grayscale' : ''}`}
              style={{ background: 'linear-gradient(135deg, #0062db 0%, #003d8f 100%)', aspectRatio: '85.6 / 53.98' }}
            >
              {/* Row 1: brand + logo */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/50 text-[11px] font-medium tracking-wide">borderless × credila</p>
                  <p className="text-white/80 text-[11px] mt-0.5">Student Debit Card</p>
                </div>
                <img src={borderlessFavicon} alt="Borderless" className="h-7 w-7 object-contain opacity-80" />
              </div>

              {/* Row 2: chip + number */}
              <div>
                {/* EMV chip */}
                <div className="w-9 h-7 rounded-md mb-3 border border-yellow-200/40"
                  style={{ background: 'linear-gradient(135deg, #d4a843 0%, #f0cc6e 40%, #b8902e 100%)' }}
                >
                  <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-px p-0.5 opacity-60">
                    {Array.from({length:9}).map((_,i) => <div key={i} className="bg-yellow-900/30 rounded-sm" />)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-base font-mono tracking-widest">
                    {showNumber ? `4532 8821 9034 ${card.last4}` : `•••• •••• •••• ${card.last4}`}
                  </p>
                  <button onClick={() => setShowNumber(!showNumber)} className="text-white/50 ml-1">
                    {showNumber ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
              </div>

              {/* Row 3: name + expiry + visa */}
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white/50 text-[10px] uppercase tracking-widest mb-0.5">Card Holder</p>
                  <p className="text-sm font-semibold tracking-wider">{card.holder}</p>
                </div>
                <div className="text-center">
                  <p className="text-white/50 text-[10px] uppercase tracking-widest mb-0.5">Expires</p>
                  <p className="text-sm font-semibold">{card.expiry}</p>
                </div>
                <p className="text-xl font-black italic tracking-tight">VISA</p>
              </div>
              {frozen && (
                <div className="absolute inset-0 rounded-3xl bg-black/30 flex items-center justify-center">
                  <div className="text-center">
                    <Snowflake size={32} className="text-white mx-auto mb-1" />
                    <p className="text-white font-semibold text-sm">Card Frozen</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick controls */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setFrozen(!frozen)}
              className={`flex items-center gap-2 py-3 px-4 rounded-2xl border font-semibold text-sm transition-all ${
                frozen ? 'bg-[#0062db] text-white border-[#0062db]' : 'bg-white text-gray-700 border-gray-200'
              }`}
            >
              <Snowflake size={16} />
              {frozen ? 'Unfreeze' : 'Freeze Card'}
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`flex items-center gap-2 py-3 px-4 rounded-2xl border font-semibold text-sm transition-all ${showSettings ? 'bg-[#0062db] text-white border-[#0062db]' : 'bg-white text-gray-700 border-gray-200'}`}
            >
              <Settings size={16} />
              Card Settings
              {showSettings ? <ChevronUp size={14} className="ml-auto" /> : <ChevronDown size={14} className="ml-auto" />}
            </button>
          </div>

          {/* Card Settings panel */}
          {showSettings && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-5">
              <p className="text-sm font-semibold text-gray-800">Spend Limits</p>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-medium text-gray-700">Per Transaction Limit</p>
                  <p className="text-sm font-bold text-[#0062db]">${perTxLimit.toLocaleString()}</p>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-[#0062db] rounded-full" style={{ width: `${(perTxLimit / 2000) * 100}%` }} />
                </div>
                <input type="range" min={50} max={2000} step={50} value={perTxLimit} onChange={e => setPerTxLimit(parseInt(e.target.value))} className="w-full accent-[#0062db]" />
                <div className="flex justify-between text-xs text-gray-400"><span>$50</span><span>$2,000</span></div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-medium text-gray-700">Daily Limit</p>
                  <p className="text-sm font-bold text-[#0062db]">${dailyLimit.toLocaleString()}</p>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-[#0062db] rounded-full" style={{ width: `${(dailyLimit / 5000) * 100}%` }} />
                </div>
                <input type="range" min={100} max={5000} step={100} value={dailyLimit} onChange={e => setDailyLimit(parseInt(e.target.value))} className="w-full accent-[#0062db]" />
                <div className="flex justify-between text-xs text-gray-400"><span>$100</span><span>$5,000</span></div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-medium text-gray-700">Monthly Limit</p>
                  <p className="text-sm font-bold text-[#0062db]">${spendLimit.toLocaleString()}</p>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div className={`h-full rounded-full transition-all ${spentPct > 80 ? 'bg-red-400' : 'bg-[#0062db]'}`} style={{ width: `${Math.min(spentPct, 100)}%` }} />
                </div>
                <input type="range" min={500} max={10000} step={500} value={spendLimit} onChange={e => setSpendLimit(parseInt(e.target.value))} className="w-full accent-[#0062db]" />
                <div className="flex justify-between text-xs text-gray-400"><span>$500</span><span>$10,000</span></div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-400 mb-1">Cashback Earned</p>
              <p className="text-xl font-bold text-green-600">${card.cashbackEarned}</p>
              <p className="text-xs text-gray-400 mt-0.5">This month</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-400 mb-1">Card Network</p>
              <p className="text-xl font-bold text-gray-800">{card.network}</p>
              <p className="text-xs text-gray-400 mt-0.5">Global acceptance</p>
            </div>
          </div>
        </div>

        {/* Right col: transactions */}
        <div>
          <h2 className="font-semibold text-gray-800 text-sm mb-3">Recent Transactions</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50">
            {transactions.filter(tx => tx.icon === 'card').slice(0, 5).map(tx => (
              <div key={tx.id} className="flex items-center gap-3 px-4 py-3">
                <TxIcon tx={tx} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{tx.label}</p>
                  <p className="text-xs text-gray-400">{tx.date}</p>
                </div>
                <p className={`text-sm font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-700'}`}>
                  {tx.type === 'credit' ? '+' : '-'}{tx.currency === 'USD' ? '$' : '€'}{tx.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
