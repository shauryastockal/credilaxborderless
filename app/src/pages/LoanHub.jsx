import { useState } from 'react';
import { Upload, ChevronDown, ChevronUp, CheckCircle, Clock, Lock, Unlock } from 'lucide-react';
import { loan } from '../data/dummy';

export default function LoanHub() {
  const [showRequest, setShowRequest] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [requested, setRequested] = useState(false);

  const pctUsed = Math.round((loan.disbursed / loan.totalSanctioned) * 100);
  const pctLien = Math.round((loan.lienBalance / loan.disbursed) * 100);

  return (
    <div className="p-4 md:p-6 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Loan Hub</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500">Credila Education Loan</p>
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-6 space-y-5 md:space-y-0">
        {/* Left column */}
        <div className="space-y-5">
          {/* Loan summary card — gradient via style, no changes needed */}
          <div className="rounded-2xl p-5 border border-blue-100 dark:border-[#252942]" style={{ background: 'linear-gradient(145deg, #eef4ff 0%, #e8f0fe 100%)' }}>
            <div className="flex items-start justify-between mb-1">
              <p className="text-xs text-[#0062db]/60 font-medium">Total Sanctioned</p>
              <span className="text-[10px] bg-white/70 text-[#0062db] font-semibold px-2 py-0.5 rounded-full border border-blue-100">Credila</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">${loan.totalSanctioned.toLocaleString()}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-white/60 rounded-xl p-3 backdrop-blur-sm">
                <p className="text-xs text-gray-400 mb-1">Disbursed</p>
                <p className="text-base font-bold text-[#0062db]">${loan.disbursed.toLocaleString()}</p>
              </div>
              <div className="bg-white/60 rounded-xl p-3 backdrop-blur-sm">
                <p className="text-xs text-gray-400 mb-1">Remaining</p>
                <p className="text-base font-bold text-gray-600">${(loan.totalSanctioned - loan.disbursed).toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                <span>Disbursement progress</span>
                <span className="font-semibold text-[#0062db]">{pctUsed}%</span>
              </div>
              <div className="h-2 bg-white/50 rounded-full">
                <div className="h-full bg-[#0062db] rounded-full" style={{ width: `${pctUsed}%` }} />
              </div>
            </div>
          </div>

          {/* Lien / Unlien Status */}
          <div className="bg-white dark:bg-[#1a1d2e] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-[#252942]">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-4">Balance Status</h2>

            <div className="flex gap-3 mb-4">
              <div className="flex-1 bg-orange-50 dark:bg-orange-900/30 rounded-xl p-3 border border-orange-100 dark:border-[#252942]">
                <div className="flex items-center gap-1.5 mb-1">
                  <Lock size={13} className="text-orange-500" />
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">Lien (Locked)</p>
                </div>
                <p className="text-xl font-bold text-orange-600 dark:text-orange-400">${loan.lienBalance.toLocaleString()}</p>
                <p className="text-xs text-orange-400 mt-0.5">Held by Credila</p>
              </div>
              <div className="flex-1 bg-[#e8f0fe] dark:bg-blue-900/30 rounded-xl p-3 border border-blue-100 dark:border-[#252942]">
                <div className="flex items-center gap-1.5 mb-1">
                  <Unlock size={13} className="text-[#0062db]" />
                  <p className="text-xs text-[#0062db] font-medium">Released</p>
                </div>
                <p className="text-xl font-bold text-[#0062db]">${loan.unlienReleased.toLocaleString()}</p>
                <p className="text-xs text-blue-400 mt-0.5">In your wallet</p>
              </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              Lien funds are held by Credila as security. You can request to release funds by submitting proof of academic expenditure.
            </p>

            <button
              onClick={() => setShowRequest(!showRequest)}
              className="w-full bg-[#0062db] text-white font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2"
            >
              <Unlock size={16} />
              Request Lien Release
              {showRequest ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showRequest && (
              <div className="mt-4 p-4 bg-[#f5f7fa] dark:bg-[#131624] rounded-xl space-y-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Lien Release Request</p>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Amount to Release (USD)</label>
                  <input
                    type="number"
                    placeholder="e.g. 1000"
                    className="w-full border border-gray-200 dark:border-[#252942] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0062db] dark:bg-[#1a1d2e] dark:text-gray-100 dark:placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Purpose</label>
                  <select className="w-full border border-gray-200 dark:border-[#252942] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0062db] bg-white dark:bg-[#1a1d2e] dark:text-gray-100">
                    <option>Tuition Payment</option>
                    <option>Living Expenses</option>
                    <option>Books & Supplies</option>
                    <option>Other Academic Expenses</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Upload Receipt / Invoice</label>
                  <div className="border-2 border-dashed border-gray-200 dark:border-[#252942] rounded-xl p-4 text-center cursor-pointer hover:border-[#0062db] transition-colors">
                    <Upload size={20} className="mx-auto text-gray-300 dark:text-gray-600 mb-1" />
                    <p className="text-xs text-gray-400 dark:text-gray-500">Tap to upload PDF or image</p>
                  </div>
                </div>
                {requested ? (
                  <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/30 rounded-xl px-4 py-3">
                    <CheckCircle size={16} className="text-green-500" />
                    <p className="text-sm text-green-700 dark:text-green-400 font-medium">Request submitted! Credila will review in 2–3 business days.</p>
                  </div>
                ) : (
                  <button
                    onClick={() => setRequested(true)}
                    className="w-full bg-[#0062db] text-white font-semibold py-2.5 rounded-xl text-sm"
                  >
                    Submit Request
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Next Tranche */}
          <div className="bg-white dark:bg-[#1a1d2e] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-[#252942]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">Next Tranche</h2>
              <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-[#0062db] font-medium px-2 py-1 rounded-lg">Upcoming</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${loan.nextTranche.toLocaleString()}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Expected {loan.nextTrancheDate}</p>
              </div>
              <button className="bg-[#0062db] text-white text-xs font-semibold px-4 py-2.5 rounded-xl">
                Request Early
              </button>
            </div>
            <div className="space-y-2">
              {loan.tranches.map(t => (
                <div key={t.id} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${t.status === 'disbursed' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-[#252942]'}`}>
                    {t.status === 'disbursed'
                      ? <CheckCircle size={14} className="text-green-500" />
                      : <Clock size={14} className="text-gray-400 dark:text-gray-500" />
                    }
                  </div>
                  <div className="flex-1 flex justify-between">
                    <p className="text-xs text-gray-700 dark:text-gray-300">Tranche {t.id} · {t.date}</p>
                    <p className={`text-xs font-semibold ${t.status === 'disbursed' ? 'text-green-600' : 'text-gray-400 dark:text-gray-500'}`}>
                      ${t.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Debt Breakdown */}
          <div className="bg-white dark:bg-[#1a1d2e] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-[#252942]">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-3">Debt Tracker</h2>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Total Debt</p>
                <p className="text-base font-bold text-gray-900 dark:text-gray-100">${loan.totalDebt.toLocaleString()}</p>
              </div>
              <div className="text-center border-x border-gray-100 dark:border-[#252942]">
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Principal</p>
                <p className="text-base font-bold text-gray-900 dark:text-gray-100">${loan.principal.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Interest</p>
                <p className="text-base font-bold text-orange-500">${loan.interestAccrued.toLocaleString()}</p>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Spending Breakdown</p>
              <div className="space-y-2">
                {loan.usageBreakdown.map(item => (
                  <div key={item.category}>
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <span>{item.category}</span>
                      <span className="font-medium">${item.amount.toLocaleString()} ({item.pct}%)</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-[#252942] rounded-full">
                      <div className="h-full bg-[#0062db] rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f5f7fa] dark:bg-[#131624] rounded-xl p-3 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">EMI Starts</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{loan.emiStartDate}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400">Interest Rate</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{loan.interestRate}% p.a.</p>
              </div>
            </div>
          </div>

          {/* Report Submission */}
          <div className="bg-white dark:bg-[#1a1d2e] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-[#252942]">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-1">Submit Academic Report</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">Required by Credila for continued disbursement</p>
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="w-full border border-dashed border-[#0062db] text-[#0062db] font-medium text-sm py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Upload size={16} />
              Upload Transcript / Receipt
            </button>
            {showUpload && (
              <div className="mt-3 p-4 bg-[#f5f7fa] dark:bg-[#131624] rounded-xl space-y-3">
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Document Type</label>
                  <select className="w-full border border-gray-200 dark:border-[#252942] rounded-xl px-3 py-2.5 text-sm bg-white dark:bg-[#1a1d2e] dark:text-gray-100 focus:outline-none focus:border-[#0062db]">
                    <option>Academic Transcript</option>
                    <option>Tuition Receipt</option>
                    <option>Enrollment Certificate</option>
                    <option>Expense Receipt</option>
                  </select>
                </div>
                <div className="border-2 border-dashed border-gray-200 dark:border-[#252942] rounded-xl p-4 text-center cursor-pointer hover:border-[#0062db] transition-colors">
                  <Upload size={20} className="mx-auto text-gray-300 dark:text-gray-600 mb-1" />
                  <p className="text-xs text-gray-400 dark:text-gray-500">Tap to upload</p>
                </div>
                <button className="w-full bg-[#0062db] text-white font-semibold py-2.5 rounded-xl text-sm">
                  Submit Document
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
