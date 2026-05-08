import { useState } from 'react';
import { TrendingUp, Star, ChevronRight, Target, Plus, Pencil, Check } from 'lucide-react';
import { user, investments } from '../data/dummy';

export default function Wealth() {
  const scoreColor = user.creditScore >= 750 ? '#22c55e' : user.creditScore >= 680 ? '#f59e0b' : '#ef4444';
  const scorePct = (user.creditScore / user.creditScoreMax) * 100;
  const [dailyAmount, setDailyAmount] = useState(2.5);
  const [editing, setEditing] = useState(false);
  const [draftAmount, setDraftAmount] = useState('2.5');
  const [saved, setSaved] = useState(false);

  function handleSave() {
    const val = parseFloat(draftAmount);
    if (!isNaN(val) && val > 0) setDailyAmount(val);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="p-4 md:p-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Investing</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500">Grow while you study</p>
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-6 space-y-5 md:space-y-0 md:items-start">
      {/* Left col */}
      <div className="space-y-5">
      {/* US Credit Score */}
      <div className="bg-white dark:bg-[#1a1d2e] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-[#252942]">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm" style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}>
            <Star size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">US Credit Score</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">FICO · Updated May 2025</p>
          </div>
        </div>

        {/* Score gauge */}
        <div className="flex items-end gap-4 mb-4">
          <div className="flex-1">
            <div className="relative h-3 bg-gray-100 dark:bg-[#252942] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${scorePct}%`, background: `linear-gradient(90deg, #ef4444 0%, #f59e0b 50%, #22c55e 100%)` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
              <span>300</span>
              <span>580</span>
              <span>670</span>
              <span>740</span>
              <span>850</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              <span>Poor</span>
              <span></span>
              <span>Good</span>
              <span></span>
              <span>Excellent</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold" style={{ color: scoreColor }}>{user.creditScore}</p>
            <p className="text-xs font-medium" style={{ color: scoreColor }}>Good</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-2">
          <ScoreFactorCard label="Payment History" score={98} color="green" />
          <ScoreFactorCard label="Credit Usage" score={12} color="green" note="Low is good" />
          <ScoreFactorCard label="Credit Age" score={8} color="amber" note="8 months" />
        </div>

        <div className="mt-4 bg-[#f5f7fa] dark:bg-[#131624] rounded-xl p-3">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tips to improve your score</p>
          <ul className="space-y-1">
            {['Keep card utilization below 10%', 'Pay bills on time every month', 'Avoid opening new credit accounts'].map(tip => (
              <li key={tip} className="text-xs text-gray-500 dark:text-gray-400 flex gap-1.5">
                <span className="text-green-500">✓</span>{tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Goal-Based Saving */}
      <div className="bg-white dark:bg-[#1a1d2e] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-[#252942]">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm" style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}>
            <Target size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Savings Goals</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">Set a target, save automatically</p>
          </div>
        </div>

        {/* Sample goal */}
        <div className="rounded-xl border border-purple-100 dark:border-[#252942] bg-purple-50/40 dark:bg-purple-900/20 p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">✈️</span>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Trip to Europe</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Target · Dec 2025</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-purple-600">$340</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">of $1,200</p>
            </div>
          </div>
          <div className="h-2 bg-purple-100 dark:bg-purple-900/40 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: '28%' }} />
          </div>
          <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
            <span>28% saved</span>
            <span>$860 to go</span>
          </div>
        </div>

        {/* Pitch CTA */}
        <div className="bg-[#f5f7fa] dark:bg-[#131624] rounded-xl p-3 mb-3">
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            💡 <span className="font-medium text-gray-700 dark:text-gray-300">Auto-save while you spend.</span> We round up every transaction and put the difference toward your goal — no effort needed.
          </p>
        </div>

        <button className="w-full border border-dashed border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 font-semibold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
          <Plus size={15} />
          Create a Savings Goal
        </button>
      </div>

      </div>{/* end left col */}

      {/* Right col */}
      <div className="space-y-5">
      {/* Micro Investing */}
      <div className="rounded-2xl overflow-hidden shadow-sm border border-indigo-100 dark:border-[#252942]">
        <div className="p-4" style={{ background: 'linear-gradient(135deg, #0062db 0%, #6366f1 100%)' }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingUp size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Round-Up Investing</p>
              <p className="text-xs text-white/70">Invest your spare change automatically</p>
            </div>
            <div className="ml-auto">
              <div
                className={`w-12 h-6 rounded-full flex items-center transition-all cursor-pointer ${investments.roundups.enabled ? 'bg-white/30' : 'bg-white/10'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-all ${investments.roundups.enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-[#1a1d2e]">
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-3">
              <p className="text-xs text-indigo-400 mb-1">Daily Savings</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">${investments.roundups.dailySavings}</p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-3">
              <p className="text-xs text-indigo-400 mb-1">Money Invested</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">${investments.roundups.totalRoundsUp}</p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-3">
              <p className="text-xs text-indigo-400 mb-1">Portfolio Value</p>
              <p className="text-lg font-bold text-[#0062db]">${investments.portfolio.totalValue}</p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/30 rounded-xl p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400">Total Gain</p>
            <p className="text-sm font-bold text-green-600">+${investments.portfolio.gainLoss} (+{investments.portfolio.gainLossPct}%)</p>
          </div>

          <button className="w-full mt-3 bg-gradient-to-r from-[#0062db] to-indigo-500 text-white font-semibold py-2.5 rounded-xl text-sm flex items-center justify-center gap-1">
            View Portfolio <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Daily Investing */}
      <div className="bg-white dark:bg-[#1a1d2e] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-[#252942]">
        <div className="p-4" style={{ background: 'linear-gradient(135deg, #059669 0%, #34d399 100%)' }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingUp size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Daily Investing</p>
              <p className="text-xs text-white/70">Automated daily contributions</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Balance */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
            <p className="text-xs text-green-600 dark:text-green-400 mb-1">Your Daily Investing Balance</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              $75<span className="text-xl font-semibold text-gray-400 dark:text-gray-500">.65</span>
            </p>
          </div>

          {/* Daily amount row */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">You save</p>
              {editing ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">USD</span>
                  <input
                    type="number"
                    value={draftAmount}
                    onChange={e => setDraftAmount(e.target.value)}
                    className="w-20 text-lg font-bold text-gray-900 dark:text-gray-100 bg-transparent border-b-2 border-[#059669] focus:outline-none"
                    autoFocus
                    min="0.01"
                    step="0.5"
                  />
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">everyday</span>
                </div>
              ) : (
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  USD {dailyAmount.toFixed(2)} <span className="text-sm font-medium text-gray-500 dark:text-gray-400">everyday</span>
                </p>
              )}
            </div>

            {editing ? (
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 bg-[#059669] text-white text-xs font-bold px-3 py-2 rounded-xl"
              >
                <Check size={13} /> Save
              </button>
            ) : (
              <button
                onClick={() => { setEditing(true); setDraftAmount(String(dailyAmount)); }}
                className="flex items-center gap-1.5 border border-gray-200 dark:border-[#252942] text-gray-600 dark:text-gray-300 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-[#252942] transition-colors"
              >
                <Pencil size={12} /> Change this
              </button>
            )}
          </div>

          {saved && (
            <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 rounded-xl px-3 py-2">
              <Check size={13} className="text-green-500" />
              <p className="text-xs text-green-700 dark:text-green-400 font-medium">Daily amount updated!</p>
            </div>
          )}
        </div>
      </div>

      </div>{/* end right col */}
      </div>{/* end grid */}
    </div>
  );
}

function ScoreFactorCard({ label, score, color, note }) {
  const colors = {
    green: 'text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400',
    amber: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400',
    red: 'text-red-600 bg-red-50 dark:bg-rose-900/30 dark:text-red-400'
  };
  return (
    <div className={`rounded-xl p-2 text-center ${colors[color]}`}>
      <p className={`text-xs font-medium`}>{label}</p>
      <p className="text-sm font-bold mt-1">{note || `${score}%`}</p>
    </div>
  );
}
