import { useState } from 'react';
import { Snowflake, Eye, EyeOff, Settings, ChevronDown, ChevronUp, CreditCard, ArrowUpRight, ArrowDownLeft, ShoppingBag, Utensils, Plane, BookOpen, Wifi, BadgePercent } from 'lucide-react';
import { card, transactions } from '../data/dummy';
import borderlessFavicon from '../assets/borderless_favicon.png';

function TxIcon({ tx }) {
  if (tx.icon === 'card') {
    return (
      <div className="w-9 h-9 bg-[#e8f0fe] dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
        <CreditCard size={17} className="text-[#0062db]" />
      </div>
    );
  }
  if (tx.type === 'credit') {
    return (
      <div className="w-9 h-9 bg-green-50 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
        <ArrowDownLeft size={17} className="text-green-500 dark:text-green-400" />
      </div>
    );
  }
  return (
    <div className="w-9 h-9 bg-red-50 dark:bg-rose-900/30 rounded-xl flex items-center justify-center">
      <ArrowUpRight size={17} className="text-red-400 dark:text-rose-400" />
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
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-5">My Borderless Account</h1>

      {/* ── Row 1: Card + Use Cases ── */}
      <div className="md:grid md:grid-cols-2 md:gap-8 md:items-start space-y-4 md:space-y-0 mb-4">

        <div className="relative max-w-sm">
          <div
            className={`rounded-3xl p-6 text-white transition-all duration-300 flex flex-col justify-between ${frozen ? 'opacity-70 grayscale' : ''}`}
            style={{ background: 'linear-gradient(135deg, #0062db 0%, #003d8f 100%)', aspectRatio: '85.6 / 53.98' }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/50 text-[11px] font-medium tracking-wide">borderless × credila</p>
                <p className="text-white/80 text-[11px] mt-0.5">Student Debit Card</p>
              </div>
              <img src={borderlessFavicon} alt="Borderless" className="h-7 w-7 object-contain opacity-80" />
            </div>
            <div>
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

        {/* Use Cases */}
        <div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: ShoppingBag,  label: 'Shopping',      sub: 'Amazon, Target & more',   lightColor: 'bg-blue-50 text-[#0062db]',    darkColor: 'dark:bg-blue-900/30' },
              { icon: Utensils,     label: 'Food & Dining', sub: 'Restaurants, Uber Eats',  lightColor: 'bg-orange-50 text-orange-500', darkColor: 'dark:bg-orange-900/30' },
              { icon: Plane,        label: 'Travel',         sub: 'Flights, hotels, Airbnb', lightColor: 'bg-sky-50 text-sky-500',       darkColor: 'dark:bg-sky-900/30' },
              { icon: BookOpen,     label: 'Education',      sub: 'Tuition, books, fees',    lightColor: 'bg-purple-50 text-purple-500', darkColor: 'dark:bg-purple-900/30' },
              { icon: Wifi,         label: 'Subscriptions',  sub: 'Netflix, Spotify, Adobe', lightColor: 'bg-pink-50 text-pink-500',     darkColor: 'dark:bg-pink-900/30' },
              { icon: BadgePercent, label: '1% Cashback',    sub: 'On every transaction',    lightColor: 'bg-green-50 text-green-600',   darkColor: 'dark:bg-green-900/30' },
            ].map(({ icon: Icon, label, sub, lightColor, darkColor }) => (
              <div key={label} className="bg-white dark:bg-[#1a1d2e] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-[#252942] flex flex-col gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${lightColor} ${darkColor}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-tight">{label}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 leading-snug">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 2: Controls + Stats | Recent Transactions ── */}
      <div className="md:grid md:grid-cols-2 md:gap-8 md:items-start space-y-4 md:space-y-0">

        {/* Left: controls + settings + stats */}
        <div className="space-y-4">
          {/* Quick controls */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setFrozen(!frozen)}
              className={`flex items-center gap-2 py-3 px-4 rounded-2xl border font-semibold text-sm transition-all ${
                frozen ? 'bg-[#0062db] text-white border-[#0062db]' : 'bg-white dark:bg-[#1a1d2e] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-[#252942]'
              }`}
            >
              <Snowflake size={16} />
              {frozen ? 'Unfreeze' : 'Freeze Card'}
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`flex items-center gap-2 py-3 px-4 rounded-2xl border font-semibold text-sm transition-all ${showSettings ? 'bg-[#0062db] text-white border-[#0062db]' : 'bg-white dark:bg-[#1a1d2e] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-[#252942]'}`}
            >
              <Settings size={16} />
              Card Settings
              {showSettings ? <ChevronUp size={14} className="ml-auto" /> : <ChevronDown size={14} className="ml-auto" />}
            </button>
          </div>

          {showSettings && (
            <div className="bg-white dark:bg-[#1a1d2e] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-[#252942] space-y-5">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Spend Limits</p>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Per Transaction Limit</p>
                  <p className="text-sm font-bold text-[#0062db]">${perTxLimit.toLocaleString()}</p>
                </div>
                <input type="range" min={50} max={2000} step={50} value={perTxLimit} onChange={e => setPerTxLimit(parseInt(e.target.value))} className="w-full accent-[#0062db]" />
                <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1"><span>$50</span><span>$2,000</span></div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Daily Limit</p>
                  <p className="text-sm font-bold text-[#0062db]">${dailyLimit.toLocaleString()}</p>
                </div>
                <input type="range" min={100} max={5000} step={100} value={dailyLimit} onChange={e => setDailyLimit(parseInt(e.target.value))} className="w-full accent-[#0062db]" />
                <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1"><span>$100</span><span>$5,000</span></div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Monthly Limit</p>
                  <p className="text-sm font-bold text-[#0062db]">${spendLimit.toLocaleString()}</p>
                </div>
                <input type="range" min={500} max={10000} step={500} value={spendLimit} onChange={e => setSpendLimit(parseInt(e.target.value))} className="w-full accent-[#0062db]" />
                <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1"><span>$500</span><span>$10,000</span></div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-[#1a1d2e] rounded-2xl p-5 shadow-sm border border-green-100 dark:border-[#252942]">
              <p className="text-xs text-green-500 mb-1">Cashback Earned</p>
              <p className="text-2xl font-bold text-green-600">${card.cashbackEarned}</p>
              <p className="text-xs text-green-400 mt-0.5">This month</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-[#1a1d2e] rounded-2xl p-5 shadow-sm border border-blue-100 dark:border-[#252942]">
              <p className="text-xs text-blue-400 mb-1">Spent This Month</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">${card.spentThisMonth}</p>
              <p className="text-xs text-blue-300 mt-0.5">of ${spendLimit.toLocaleString()} limit</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/20 dark:to-[#1a1d2e] rounded-2xl p-5 shadow-sm border border-indigo-100 dark:border-[#252942]">
              <p className="text-xs text-indigo-400 mb-1">Card Network</p>
              <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">{card.network}</p>
              <p className="text-xs text-indigo-300 mt-0.5">Global acceptance</p>
            </div>
            <div className={`bg-gradient-to-br ${frozen ? 'from-slate-50 to-white dark:from-slate-900/20 dark:to-[#1a1d2e] border-slate-100 dark:border-[#252942]' : 'from-emerald-50 to-white dark:from-emerald-900/20 dark:to-[#1a1d2e] border-emerald-100 dark:border-[#252942]'} rounded-2xl p-5 shadow-sm border`}>
              <p className={`text-xs mb-1 ${frozen ? 'text-slate-400' : 'text-emerald-500'}`}>Card Status</p>
              <p className={`text-2xl font-bold ${frozen ? 'text-slate-500 dark:text-slate-400' : 'text-emerald-600'}`}>{frozen ? 'Frozen' : 'Active'}</p>
              <p className={`text-xs mt-0.5 ${frozen ? 'text-slate-300 dark:text-slate-500' : 'text-emerald-400'}`}>{frozen ? 'Tap to unfreeze' : 'Ready to use'}</p>
            </div>
          </div>
        </div>

        {/* Right: Recent Transactions */}
        <div>
          <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-3">Recent Transactions</h2>
          <div className="bg-white dark:bg-[#1a1d2e] rounded-2xl shadow-sm border border-gray-100 dark:border-[#252942] divide-y divide-gray-50 dark:divide-[#252942]">
            {transactions.filter(tx => tx.icon === 'card').map(tx => (
              <div key={tx.id} className="flex items-center gap-3 px-4 py-3">
                <TxIcon tx={tx} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{tx.label}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{tx.date}</p>
                </div>
                <p className={`text-sm font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-700 dark:text-gray-200'}`}>
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
