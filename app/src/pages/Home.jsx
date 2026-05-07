import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowDownLeft, RefreshCw, IndianRupee, TrendingUp, ChevronRight, Sparkles, Lock, CreditCard } from 'lucide-react';
import { user, wallets, loan, transactions, card } from '../data/dummy';
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

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-5 max-w-2xl md:max-w-none md:p-6">

      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 font-medium mb-0.5">Good morning 👋</p>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">{user.name.split(' ')[0]}</h1>
        </div>
        <div
          className="flex items-center gap-1.5 bg-[#e8f0fe] px-3 py-1.5 rounded-full cursor-pointer border border-blue-100"
          onClick={() => navigate('/wealth')}
        >
          <Sparkles size={12} className="text-[#0062db]" />
          <span className="text-[#0062db] text-xs font-semibold">{user.mcaInterestRate}% p.a.</span>
        </div>
      </div>

      {/* Wallet Cards */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-800 text-sm">My Wallets</h2>
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
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
              <Lock size={15} className="text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Credila Loan</p>
              <p className="text-xs text-gray-400">Education Loan</p>
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
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>Lien Balance (Locked)</span>
            <span className="font-semibold text-gray-800">${loan.lienBalance.toLocaleString()}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-400 rounded-full"
              style={{ width: `${(loan.lienBalance / loan.totalSanctioned) * 100}%` }}
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>Released (Available)</span>
            <span className="font-semibold text-[#0062db]">${loan.unlienReleased.toLocaleString()}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
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
            className="flex-1 bg-[#e8f0fe] text-[#0062db] text-xs font-semibold py-2.5 rounded-xl"
          >
            Repayment
          </button>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="font-semibold text-gray-800 text-sm mb-3">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-2">
          <QuickAction icon={<ArrowUpRight size={18} className="text-[#0062db]" />} label="Send" onClick={() => navigate('/send')} />
          <QuickAction icon={<IndianRupee size={18} className="text-[#0062db]" />} label="Withdraw" onClick={() => navigate('/send?india=1')} />
          <QuickAction icon={<RefreshCw size={18} className="text-[#0062db]" />} label="Convert" onClick={() => navigate('/convert')} />
          <QuickAction icon={<TrendingUp size={18} className="text-[#0062db]" />} label="Invest" onClick={() => navigate('/wealth')} />
        </div>
      </section>

      {/* Card snapshot */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer" onClick={() => navigate('/card')}>
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-8 rounded-lg flex flex-col justify-end p-1.5 relative overflow-hidden flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #0062db 0%, #003d8f 100%)' }}
          >
            <img src={borderlessFavicon} alt="" className="w-3 h-3 object-contain absolute top-1 right-1 opacity-80" />
            <p className="text-white font-mono text-[6px] tracking-widest opacity-70">•••• {card.last4}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Borderless Debit Card</p>
            <p className="text-xs text-gray-400">•••• {card.last4} · Spent ${card.spentThisMonth} this month</p>
          </div>
        </div>
        <ChevronRight size={18} className="text-gray-300" />
      </section>

      {/* Recent Transactions */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-800 text-sm">Recent Transactions</h2>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50">
          {transactions.slice(0, 5).map(tx => (
            <div key={tx.id} className="flex items-center gap-3 px-4 py-3">
              <TxIcon tx={tx} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{tx.label}</p>
                <p className="text-xs text-gray-400">{tx.date}</p>
              </div>
              <p className={`text-sm font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-800'}`}>
                {tx.type === 'credit' ? '+' : '-'}{tx.currency === 'USD' ? '$' : '€'}{tx.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function WalletCard({ wallet }) {
  const isEmpty = wallet.unlienBalance === 0;
  return (
    <div
      className={`flex-shrink-0 w-36 rounded-2xl p-4 relative overflow-hidden ${isEmpty ? 'bg-gray-50 border border-dashed border-gray-200' : 'text-white'}`}
      style={isEmpty ? {} : { background: `linear-gradient(135deg, ${wallet.color} 0%, ${wallet.color}cc 100%)` }}
    >
      {!isEmpty && <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-6 translate-x-6" />}
      <p className={`text-xs font-medium mb-1 ${isEmpty ? 'text-gray-400' : 'text-white/70'}`}>
        {wallet.flag} {wallet.currency}
      </p>
      <p className={`text-lg font-bold leading-tight ${isEmpty ? 'text-gray-300' : 'text-white'}`}>
        {wallet.symbol}{wallet.unlienBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </p>
      <p className={`text-xs mt-1 ${isEmpty ? 'text-gray-300' : 'text-white/60'}`}>
        {isEmpty ? 'No balance' : 'Available'}
      </p>
    </div>
  );
}

function QuickAction({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 bg-white rounded-2xl py-3 px-2 shadow-sm border border-gray-100"
    >
      <div className="w-10 h-10 bg-[#e8f0fe] rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-600">{label}</span>
    </button>
  );
}
