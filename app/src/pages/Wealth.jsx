import { TrendingUp, Star, Share2, ChevronRight } from 'lucide-react';
import { user, investments, referral } from '../data/dummy';

export default function Wealth() {
  const scoreColor = user.creditScore >= 750 ? '#22c55e' : user.creditScore >= 680 ? '#f59e0b' : '#ef4444';
  const scorePct = (user.creditScore / user.creditScoreMax) * 100;

  return (
    <div className="p-4 md:p-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Investing</h1>
        <p className="text-xs text-gray-400">Grow while you study</p>
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-6 space-y-5 md:space-y-0 md:items-start">
      {/* Left col */}
      <div className="space-y-5">
      {/* US Credit Score */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center">
            <Star size={16} className="text-yellow-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">US Credit Score</p>
            <p className="text-xs text-gray-400">FICO · Updated May 2025</p>
          </div>
        </div>

        {/* Score gauge */}
        <div className="flex items-end gap-4 mb-4">
          <div className="flex-1">
            <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${scorePct}%`, background: `linear-gradient(90deg, #ef4444 0%, #f59e0b 50%, #22c55e 100%)` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>300</span>
              <span>580</span>
              <span>670</span>
              <span>740</span>
              <span>850</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-0.5">
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

        <div className="mt-4 bg-[#f5f7fa] rounded-xl p-3">
          <p className="text-xs font-medium text-gray-700 mb-1">Tips to improve your score</p>
          <ul className="space-y-1">
            {['Keep card utilization below 10%', 'Pay bills on time every month', 'Avoid opening new credit accounts'].map(tip => (
              <li key={tip} className="text-xs text-gray-500 flex gap-1.5">
                <span className="text-green-500">✓</span>{tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      </div>{/* end left col */}

      {/* Right col */}
      <div className="space-y-5">
      {/* Micro Investing */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-[#e8f0fe] rounded-lg flex items-center justify-center">
            <TrendingUp size={16} className="text-[#0062db]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Round-Up Investing</p>
            <p className="text-xs text-gray-400">Invest your spare change automatically</p>
          </div>
          <div className="ml-auto">
            <div
              className={`w-12 h-6 rounded-full flex items-center transition-all cursor-pointer ${investments.roundups.enabled ? 'bg-[#0062db]' : 'bg-gray-200'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-all ${investments.roundups.enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-[#f5f7fa] rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-1">Round-ups Collected</p>
            <p className="text-lg font-bold text-gray-800">${investments.roundups.totalRoundsUp}</p>
          </div>
          <div className="bg-[#f5f7fa] rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-1">Portfolio Value</p>
            <p className="text-lg font-bold text-[#0062db]">${investments.portfolio.totalValue}</p>
          </div>
        </div>

        <div className="flex items-center justify-between bg-green-50 rounded-xl p-3">
          <p className="text-xs text-gray-600">Total Gain</p>
          <p className="text-sm font-bold text-green-600">+${investments.portfolio.gainLoss} (+{investments.portfolio.gainLossPct}%)</p>
        </div>

        <button className="w-full mt-3 border border-[#0062db] text-[#0062db] font-semibold py-2.5 rounded-xl text-sm flex items-center justify-center gap-1">
          View Portfolio <ChevronRight size={14} />
        </button>
      </div>

      {/* Referral */}
      <div
        className="rounded-2xl p-5 text-white"
        style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Share2 size={18} className="text-white" />
          <p className="text-sm font-semibold">Refer a Friend</p>
        </div>
        <p className="text-white/80 text-xs mb-4">Earn $25 for every friend who joins Borderless through your link</p>

        <div className="bg-white/20 rounded-xl p-3 flex items-center justify-between mb-3">
          <div>
            <p className="text-white/60 text-xs">Your referral code</p>
            <p className="text-lg font-bold tracking-widest">{referral.code}</p>
          </div>
          <button className="bg-white text-purple-700 text-xs font-bold px-3 py-1.5 rounded-lg">
            Copy
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <p className="text-xl font-bold">{referral.referredCount}</p>
            <p className="text-white/60 text-xs">Referred</p>
          </div>
          <div className="text-center border-x border-white/20">
            <p className="text-xl font-bold">${referral.earnedTotal}</p>
            <p className="text-white/60 text-xs">Earned</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">${referral.pendingAmount}</p>
            <p className="text-white/60 text-xs">Pending</p>
          </div>
        </div>
      </div>

      {/* MCA interest reminder */}
      <div className="bg-[#e8f0fe] rounded-2xl p-4 flex items-center gap-3 border border-blue-100">
        <span className="text-2xl">✨</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#0062db]">MCA Interest Active</p>
          <p className="text-xs text-blue-500 mt-0.5">Earning {user.mcaInterestRate}% p.a. on your idle USD balance</p>
        </div>
      </div>
      </div>{/* end right col */}
      </div>{/* end grid */}
    </div>
  );
}

function ScoreFactorCard({ label, score, color, note }) {
  const colors = { green: 'text-green-600 bg-green-50', amber: 'text-amber-600 bg-amber-50', red: 'text-red-600 bg-red-50' };
  return (
    <div className={`rounded-xl p-2 text-center ${colors[color]}`}>
      <p className={`text-xs font-medium`}>{label}</p>
      <p className="text-sm font-bold mt-1">{note || `${score}%`}</p>
    </div>
  );
}
