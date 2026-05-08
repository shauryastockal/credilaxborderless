import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowDownLeft, RefreshCw, IndianRupee, TrendingUp, ChevronRight, Sparkles, Lock, CreditCard, GraduationCap, Calendar, DollarSign, Moon, Sun, Share2 } from 'lucide-react';
import { user, wallets, loan, transactions, card, referral } from '../data/dummy';
import borderlessFavicon from '../assets/borderless_favicon.png';
import { useTheme } from '../context/ThemeContext';

function TxIcon({ tx }) {
  if (tx.icon === 'card') return (
    <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
      <CreditCard size={17} className="text-blue-600 dark:text-blue-400" />
    </div>
  );
  if (tx.icon === 'interest') return (
    <div className="w-9 h-9 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
      <TrendingUp size={17} className="text-green-600 dark:text-green-400" />
    </div>
  );
  if (tx.icon === 'loan') return (
    <div className="w-9 h-9 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
      <DollarSign size={17} className="text-orange-500 dark:text-orange-400" />
    </div>
  );
  if (tx.icon === 'convert') return (
    <div className="w-9 h-9 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
      <RefreshCw size={17} className="text-purple-600 dark:text-purple-400" />
    </div>
  );
  if (tx.type === 'credit') return (
    <div className="w-9 h-9 bg-emerald-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
      <ArrowDownLeft size={17} className="text-emerald-600 dark:text-emerald-400" />
    </div>
  );
  return (
    <div className="w-9 h-9 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center">
      <ArrowUpRight size={17} className="text-rose-500 dark:text-rose-400" />
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { dark, toggle } = useTheme();

  return (
    <div className="p-4 space-y-5 max-w-2xl md:max-w-none md:p-6">

      {/* Greeting Hero */}
      <div className="rounded-3xl p-5 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0062db 0%, #6366f1 100%)' }}>
        <div className="absolute -top-6 -right-6 w-36 h-36 bg-white/10 rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 -left-4 w-28 h-28 bg-white/10 rounded-full pointer-events-none" />
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-white/70 text-xs font-medium mb-0.5">Good morning 👋</p>
            <h1 className="text-2xl font-bold text-white leading-tight">{user.name.split(' ')[0]}</h1>
            <p className="text-white/60 text-xs mt-0.5">{user.university}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 border border-white/20 text-white hover:bg-white/30 transition-colors"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <div
              className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full cursor-pointer border border-white/20"
              onClick={() => navigate('/wealth')}
            >
              <Sparkles size={12} className="text-yellow-300" />
              <span className="text-white text-xs font-semibold">{user.mcaInterestRate}% p.a.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Cards */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">My Money</h2>
          <button
            onClick={() => navigate('/convert')}
            className="text-[#0062db] text-xs font-medium flex items-center gap-1"
          >
            <RefreshCw size={12} /> Convert
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar" style={{ overflowY: 'hidden' }}>
          {wallets.map(wallet => (
            <WalletCard key={wallet.id} wallet={wallet} />
          ))}
        </div>
      </section>

      {/* Loan Lien Section */}
      <section className="bg-white dark:bg-[#1a1d2e] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-[#252942]">
        <div className="h-1" style={{ background: 'linear-gradient(90deg, #f97316, #ea580c, #dc2626)' }} />
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-50 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <Lock size={15} className="text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Credila Loan</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Education Loan</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/loan')}
            className="text-[#0062db] text-xs font-medium flex items-center gap-0.5"
          >
            View <ChevronRight size={14} />
          </button>
        </div>

        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
            <span>Lien Balance (Locked)</span>
            <span className="font-semibold text-gray-800 dark:text-gray-100">${loan.lienBalance.toLocaleString()}</span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-[#252942] rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-400 rounded-full"
              style={{ width: `${(loan.lienBalance / loan.totalSanctioned) * 100}%` }}
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
            <span>Released (Available)</span>
            <span className="font-semibold text-[#0062db]">${loan.unlienReleased.toLocaleString()}</span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-[#252942] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0062db] rounded-full"
              style={{ width: `${(loan.unlienReleased / loan.totalSanctioned) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate('/loan')}
            className="flex-1 bg-[#0062db] text-white text-xs font-semibold py-2.5 rounded-xl"
          >
            Request Lien Release
          </button>
          <button
            onClick={() => navigate('/repayment')}
            className="flex-1 bg-[#e8f0fe] dark:bg-blue-900/30 text-[#0062db] text-xs font-semibold py-2.5 rounded-xl"
          >
            Repayment
          </button>
        </div>
      </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-3">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-2">
          <QuickAction icon={<ArrowUpRight size={18} className="text-white" />} label="Send" gradient="linear-gradient(135deg, #0062db, #60a5fa)" onClick={() => navigate('/send')} />
          <QuickAction icon={<IndianRupee size={18} className="text-white" />} label="Withdraw" gradient="linear-gradient(135deg, #ea580c, #fb923c)" onClick={() => navigate('/send?india=1')} />
          <QuickAction icon={<RefreshCw size={18} className="text-white" />} label="Convert" gradient="linear-gradient(135deg, #7c3aed, #a78bfa)" onClick={() => navigate('/convert')} />
          <QuickAction icon={<TrendingUp size={18} className="text-white" />} label="Invest" gradient="linear-gradient(135deg, #059669, #34d399)" onClick={() => navigate('/wealth')} />
        </div>
      </section>

      {/* Card + Transactions — side by side on desktop */}
      <div className="md:grid md:grid-cols-2 md:gap-6 md:items-stretch space-y-5 md:space-y-0">

        {/* Left: card */}
        <section className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">My Borderless Account</h2>
            <button onClick={() => navigate('/card')} className="text-xs text-[#0062db] font-medium flex items-center gap-1">
              Manage <ChevronRight size={13} />
            </button>
          </div>

          <div
            onClick={() => navigate('/card')}
            className="cursor-pointer rounded-3xl p-5 text-white flex flex-col justify-between shadow-lg w-full"
            style={{ background: 'linear-gradient(135deg, #0062db 0%, #003d8f 100%)', aspectRatio: '85.6 / 53.98' }}
          >
            {/* Row 1 */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/50 text-[11px] font-medium tracking-wide">borderless × credila</p>
                <p className="text-white/80 text-[11px] mt-0.5">Student Debit Card</p>
              </div>
              <img src={borderlessFavicon} alt="Borderless" className="h-7 w-7 object-contain opacity-80" />
            </div>
            {/* Row 2 */}
            <div>
              <div className="w-9 h-7 rounded-md mb-3 border border-yellow-200/40"
                style={{ background: 'linear-gradient(135deg, #d4a843 0%, #f0cc6e 40%, #b8902e 100%)' }}
              >
                <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-px p-0.5 opacity-60">
                  {Array.from({ length: 9 }).map((_, i) => <div key={i} className="bg-yellow-900/30 rounded-sm" />)}
                </div>
              </div>
              <p className="text-base font-mono tracking-widest">•••• •••• •••• {card.last4}</p>
            </div>
            {/* Row 3 */}
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
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-[#1a1d2e] rounded-2xl p-3 shadow-sm border border-blue-100 dark:border-[#252942]">
              <p className="text-xs text-blue-400 mb-1">Spent this month</p>
              <p className="text-base font-bold text-gray-800 dark:text-gray-100">${card.spentThisMonth}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-[#1a1d2e] rounded-2xl p-3 shadow-sm border border-green-100 dark:border-[#252942]">
              <p className="text-xs text-green-500 mb-1">Cashback earned</p>
              <p className="text-base font-bold text-green-600">${card.cashbackEarned}</p>
            </div>
          </div>
        </section>

        {/* Right: recent transactions — wrapper is a stretchy grid item with no intrinsic height */}
        <div className="hidden md:block relative">
          <div className="absolute inset-0 flex flex-col overflow-hidden">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-3 shrink-0">Recent Transactions</h2>
            <div className="flex-1 min-h-0 bg-white dark:bg-[#1a1d2e] rounded-2xl shadow-sm border border-gray-100 dark:border-[#252942] overflow-hidden flex flex-col">
              <div className="flex-1 overflow-hidden divide-y divide-gray-50 dark:divide-[#252942]">
                {transactions.slice(0, 8).map(tx => (
                  <div key={tx.id} className="flex items-center gap-3 px-4 py-3">
                    <TxIcon tx={tx} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{tx.label}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{tx.date}</p>
                    </div>
                    <p className={`text-sm font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-800 dark:text-gray-100'}`}>
                      {tx.type === 'credit' ? '+' : '-'}{tx.currency === 'USD' ? '$' : '€'}{tx.amount.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-gray-50 dark:border-[#252942] shrink-0">
                <button onClick={() => {}} className="text-xs text-[#0062db] font-medium w-full text-center">
                  View all transactions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: transactions shown normally in flow */}
        <section className="md:hidden">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-3">Recent Transactions</h2>
          <div className="bg-white dark:bg-[#1a1d2e] rounded-2xl shadow-sm border border-gray-100 dark:border-[#252942] divide-y divide-gray-50 dark:divide-[#252942]">
            {transactions.slice(0, 8).map(tx => (
              <div key={tx.id} className="flex items-center gap-3 px-4 py-3">
                <TxIcon tx={tx} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{tx.label}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{tx.date}</p>
                </div>
                <p className={`text-sm font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-800 dark:text-gray-100'}`}>
                  {tx.type === 'credit' ? '+' : '-'}{tx.currency === 'USD' ? '$' : '€'}{tx.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Scholarships */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">Scholarships</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Opportunities for international students</p>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-[#252942] bg-white dark:bg-[#1a1d2e] flex">
          {/* Left: content */}
          <div className="flex-1 p-5 flex flex-col justify-between">
            {/* Title row */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#e8f0fe] dark:bg-blue-900/30 rounded-xl flex items-center justify-center shrink-0">
                    <GraduationCap size={20} className="text-[#0062db]" />
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-gray-100 font-bold text-base leading-tight">Borderless Merit Scholarship</p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5">Powered by Borderless × Credila</p>
                  </div>
                </div>
                <span className="bg-green-50 dark:bg-green-900/30 text-green-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-green-200 dark:border-[#252942] shrink-0 ml-3">
                  Open
                </span>
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-4">
                Awarded to outstanding Indian students pursuing STEM or Business degrees abroad. Recipients get a tuition credit applied directly to their Credila loan — no repayment needed.
              </p>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-[#e8f0fe] dark:bg-blue-900/30 rounded-xl p-2.5 text-center">
                  <DollarSign size={13} className="text-[#0062db] mx-auto mb-1" />
                  <p className="text-[#0062db] font-bold text-sm">$2,500</p>
                  <p className="text-gray-400 dark:text-gray-500 text-[10px]">Award</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-2.5 text-center">
                  <Calendar size={13} className="text-orange-500 mx-auto mb-1" />
                  <p className="text-orange-500 font-bold text-sm">Jul 31</p>
                  <p className="text-gray-400 dark:text-gray-500 text-[10px]">Deadline</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-2.5 text-center">
                  <Sparkles size={13} className="text-purple-500 mx-auto mb-1" />
                  <p className="text-purple-500 font-bold text-sm">50</p>
                  <p className="text-gray-400 dark:text-gray-500 text-[10px]">Seats</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-[#0062db] text-white font-bold text-sm py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
              Apply Now
            </button>
          </div>

          {/* Right: graduate photo — no blending, clean separator */}
          <div className="hidden sm:block w-52 shrink-0 border-l border-gray-100 dark:border-[#252942]">
            <img
              src="https://images.unsplash.com/photo-1627556704302-624286467c65?w=400&q=80"
              alt="Graduate student"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Refer a Friend */}
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
          <button className="bg-white text-purple-700 text-xs font-bold px-3 py-1.5 rounded-lg">Copy</button>
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

      {/* MCA Interest Active */}
      <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #0062db 0%, #6366f1 100%)' }}>
        <span className="text-2xl">✨</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">MCA Interest Active</p>
          <p className="text-xs text-white/70 mt-0.5">Earning {user.mcaInterestRate}% p.a. on your idle USD balance</p>
        </div>
      </div>

    </div>
  );
}

function WalletCard({ wallet }) {
  const isEmpty = wallet.unlienBalance === 0;
  return (
    <div
      className={`flex-shrink-0 w-36 rounded-2xl p-4 relative overflow-hidden ${isEmpty ? 'bg-gray-50 dark:bg-[#131624] border border-dashed border-gray-200 dark:border-[#252942]' : 'text-white'}`}
      style={isEmpty ? {} : { background: `linear-gradient(135deg, ${wallet.color} 0%, ${wallet.color}cc 100%)` }}
    >
      {!isEmpty && <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-6 translate-x-6" />}
      <p className={`text-xs font-medium mb-1 ${isEmpty ? 'text-gray-400 dark:text-gray-500' : 'text-white/70'}`}>
        {wallet.flag} {wallet.currency}
      </p>
      <p className={`text-lg font-bold leading-tight ${isEmpty ? 'text-gray-300 dark:text-gray-600' : 'text-white'}`}>
        {wallet.symbol}{wallet.unlienBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </p>
      <p className={`text-xs mt-1 ${isEmpty ? 'text-gray-300 dark:text-gray-600' : 'text-white/60'}`}>
        {isEmpty ? 'No balance' : 'Available'}
      </p>
    </div>
  );
}

function QuickAction({ icon, label, onClick, gradient }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 bg-white dark:bg-[#1a1d2e] rounded-2xl py-3 px-2 shadow-sm border border-gray-100 dark:border-[#252942]"
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" style={{ background: gradient }}>
        {icon}
      </div>
      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{label}</span>
    </button>
  );
}
