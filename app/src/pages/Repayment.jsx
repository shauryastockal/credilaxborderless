import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle, TrendingDown, ArrowRight } from 'lucide-react';
import { loan } from '../data/dummy';

const tabs = ['EMI', 'Bullet Payment', 'Balance Transfer'];

export default function Repayment() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('EMI');
  const [bulletAmt, setBulletAmt] = useState('');
  const [btConfirmed, setBtConfirmed] = useState(false);
  const [emiConfirmed, setEmiConfirmed] = useState(false);

  const estEMI = Math.round((loan.totalDebt * (loan.interestRate / 1200)) /
    (1 - Math.pow(1 + loan.interestRate / 1200, -60)));

  return (
    <div className="p-4 space-y-5 max-w-2xl">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-8 h-8 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Repayment</h1>
      </div>

      {/* Status Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
        <AlertCircle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-800">Moratorium Period Active</p>
          <p className="text-xs text-amber-600 mt-0.5">No repayments due until {loan.emiStartDate}. Interest is still accruing at {loan.interestRate}% p.a.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-2xl p-1 shadow-sm border border-gray-100 gap-1">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === tab ? 'bg-[#0062db] text-white' : 'text-gray-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'EMI' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-800 text-sm mb-4">EMI Schedule</h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#f5f7fa] rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Estimated Monthly EMI</p>
                <p className="text-xl font-bold text-gray-900">${estEMI.toLocaleString()}</p>
              </div>
              <div className="bg-[#f5f7fa] rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Tenure</p>
                <p className="text-xl font-bold text-gray-900">60 months</p>
              </div>
              <div className="bg-[#f5f7fa] rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">First EMI Date</p>
                <p className="text-base font-bold text-gray-900">{loan.emiStartDate}</p>
              </div>
              <div className="bg-[#f5f7fa] rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Total Payable</p>
                <p className="text-base font-bold text-gray-900">${(estEMI * 60).toLocaleString()}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-4">EMIs are auto-debited from your USD wallet on the 1st of every month.</p>
            {emiConfirmed ? (
              <div className="flex items-center gap-2 bg-green-50 rounded-xl px-4 py-3">
                <CheckCircle size={16} className="text-green-500" />
                <p className="text-sm text-green-700 font-medium">Auto-debit activated for {loan.emiStartDate}.</p>
              </div>
            ) : (
              <button onClick={() => setEmiConfirmed(true)} className="w-full bg-[#0062db] text-white font-semibold py-3 rounded-xl text-sm">
                Activate Auto-debit
              </button>
            )}
          </div>

          {/* Upcoming EMIs */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-800 text-sm mb-3">Upcoming Payments</h2>
            {['Jul 2027', 'Aug 2027', 'Sep 2027'].map((month, i) => (
              <div key={month} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm text-gray-700 font-medium">EMI {i + 1}</p>
                  <p className="text-xs text-gray-400">{month}</p>
                </div>
                <p className="text-sm font-semibold text-gray-800">${estEMI.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Bullet Payment' && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
          <h2 className="font-semibold text-gray-800 text-sm">Make a Lump Sum Payment</h2>
          <p className="text-xs text-gray-500">Pay off a chunk of your principal to reduce future interest. This is an optional, one-time payment.</p>

          <div className="bg-[#f5f7fa] rounded-xl p-3 flex justify-between">
            <span className="text-xs text-gray-500">Outstanding Principal</span>
            <span className="text-sm font-bold text-gray-800">${loan.principal.toLocaleString()}</span>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Payment Amount (USD)</label>
            <input
              type="number"
              value={bulletAmt}
              onChange={e => setBulletAmt(e.target.value)}
              placeholder="Enter amount"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:border-[#0062db]"
            />
          </div>

          {bulletAmt && parseFloat(bulletAmt) > 0 && (
            <div className="bg-green-50 rounded-xl p-3 space-y-1">
              <p className="text-xs text-green-700 font-medium">Estimated savings</p>
              <p className="text-sm text-green-800">Paying ${parseFloat(bulletAmt).toLocaleString()} now saves you ~${Math.round(parseFloat(bulletAmt) * loan.interestRate / 100 * 3).toLocaleString()} in interest over 3 years</p>
            </div>
          )}

          <button className="w-full bg-[#0062db] text-white font-semibold py-3 rounded-xl text-sm" disabled={!bulletAmt}>
            Pay ${bulletAmt ? parseFloat(bulletAmt).toLocaleString() : '—'}
          </button>
          <p className="text-xs text-gray-400 text-center">Funds will be debited from your USD wallet</p>
        </div>
      )}

      {activeTab === 'Balance Transfer' && (
        <BalanceTransferTab btConfirmed={btConfirmed} setBtConfirmed={setBtConfirmed} />
      )}
    </div>
  );
}

const LENDERS = [
  { name: 'SBI Education Loan', rate: 11.15 },
  { name: 'Axis Bank Education Loan', rate: 11.5 },
  { name: 'Bank of Baroda', rate: 10.85 },
  { name: 'Punjab National Bank', rate: 11.25 },
  { name: 'Other', rate: null },
];

function BalanceTransferTab({ btConfirmed, setBtConfirmed }) {
  const [lender, setLender] = useState('');
  const [outstandingAmt, setOutstandingAmt] = useState('');
  const [currentRate, setCurrentRate] = useState('');
  const [accountNo, setAccountNo] = useState('');

  const credilaRate = loan.interestRate;
  const selectedLender = LENDERS.find(l => l.name === lender);
  const parsedAmt = parseFloat(outstandingAmt) || 0;
  const parsedRate = parseFloat(currentRate) || (selectedLender?.rate ?? 0);
  const annualSaving = parsedAmt > 0 && parsedRate > credilaRate
    ? Math.round(parsedAmt * (parsedRate - credilaRate) / 100)
    : null;

  const canSubmit = lender && outstandingAmt && currentRate && accountNo;

  return (
    <div className="space-y-4">
      {/* Hero benefit banner */}
      <div className="bg-[#e8f0fe] rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#0062db] rounded-xl flex items-center justify-center flex-shrink-0">
          <TrendingDown size={18} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#0062db]">Move your loan to Credila</p>
          <p className="text-xs text-[#0062db]/70 mt-0.5">Credila offers education loans at {credilaRate}% p.a. — often lower than other lenders.</p>
        </div>
      </div>

      {/* Rate comparison */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Rate Comparison</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-[#f5f7fa] rounded-xl p-3 text-center">
            <p className="text-xs text-gray-400 mb-1">Your current lender</p>
            <p className="text-lg font-bold text-gray-700">{parsedRate > 0 ? `${parsedRate}%` : '—'}</p>
            <p className="text-xs text-gray-400">p.a.</p>
          </div>
          <ArrowRight size={16} className="text-gray-300 flex-shrink-0" />
          <div className="flex-1 bg-[#0062db] rounded-xl p-3 text-center">
            <p className="text-xs text-white/70 mb-1">Credila</p>
            <p className="text-lg font-bold text-white">{credilaRate}%</p>
            <p className="text-xs text-white/70">p.a.</p>
          </div>
        </div>
        {annualSaving !== null && annualSaving > 0 && (
          <div className="mt-3 bg-green-50 rounded-xl px-3 py-2 flex items-center gap-2">
            <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
            <p className="text-xs text-green-700 font-medium">You save ~${annualSaving.toLocaleString()} per year in interest</p>
          </div>
        )}
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
        <p className="text-sm font-semibold text-gray-800">Your Existing Loan Details</p>

        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Current Lender</label>
          <select
            value={lender}
            onChange={e => {
              setLender(e.target.value);
              const found = LENDERS.find(l => l.name === e.target.value);
              if (found?.rate) setCurrentRate(String(found.rate));
              else setCurrentRate('');
            }}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#0062db]"
          >
            <option value="">Select your current lender</option>
            {LENDERS.map(l => (
              <option key={l.name} value={l.name}>{l.name}{l.rate ? ` (${l.rate}% p.a.)` : ''}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Outstanding Loan Amount (USD)</label>
          <input
            type="number"
            value={outstandingAmt}
            onChange={e => setOutstandingAmt(e.target.value)}
            placeholder="e.g. 30000"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base font-semibold focus:outline-none focus:border-[#0062db]"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Current Interest Rate (% p.a.)</label>
          <input
            type="number"
            value={currentRate}
            onChange={e => setCurrentRate(e.target.value)}
            placeholder="e.g. 11.5"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base font-semibold focus:outline-none focus:border-[#0062db]"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Loan Account Number</label>
          <input
            type="text"
            value={accountNo}
            onChange={e => setAccountNo(e.target.value)}
            placeholder="Enter account number"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#0062db]"
          />
        </div>

        {btConfirmed ? (
          <div className="flex items-center gap-2 bg-green-50 rounded-xl px-4 py-3">
            <CheckCircle size={16} className="text-green-500" />
            <p className="text-sm text-green-700 font-medium">Application submitted. Our team will contact you in 3–5 business days.</p>
          </div>
        ) : (
          <button
            onClick={() => setBtConfirmed(true)}
            disabled={!canSubmit}
            className={`w-full font-semibold py-3 rounded-xl text-sm transition-all ${
              canSubmit ? 'bg-[#0062db] text-white' : 'bg-gray-100 text-gray-400'
            }`}
          >
            Apply for Balance Transfer to Credila
          </button>
        )}
        <p className="text-xs text-gray-400 text-center">Credila will verify and coordinate directly with your current lender</p>
      </div>
    </div>
  );
}
