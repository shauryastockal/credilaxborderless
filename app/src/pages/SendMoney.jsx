import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, ChevronRight, CheckCircle, Plus } from 'lucide-react';
import { wallets, indianBeneficiaries, internationalBeneficiaries } from '../data/dummy';

const indiaCategories = ['Education', 'Living Expenses', 'Family Support', 'Other'];
const globalCategories = ['Tuition Fees', 'Rent', 'Living Expenses', 'Other'];

export default function SendMoney() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const isIndia = params.get('india') === '1';

  const [tab, setTab] = useState(isIndia ? 'india' : 'global');
  const [step, setStep] = useState(1);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [sent, setSent] = useState(false);

  const selectedWallet = wallets[0];
  const fxRate = 83.45;

  const resetTab = (newTab) => {
    setTab(newTab);
    setStep(1);
    setSent(false);
    setSelectedBeneficiary(null);
    setAmount('');
    setCategory('');
  };

  return (
    <div className="p-4 space-y-5 max-w-2xl">
      <h1 className="text-xl font-bold text-gray-900">Send Money</h1>

      {/* Tab */}
      <div className="flex bg-white rounded-2xl p-1 shadow-sm border border-gray-100 gap-1">
        <button
          onClick={() => resetTab('global')}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${tab === 'global' ? 'bg-[#0062db] text-white' : 'text-gray-400'}`}
        >
          🌐 International
        </button>
        <button
          onClick={() => resetTab('india')}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${tab === 'india' ? 'bg-[#0062db] text-white' : 'text-gray-400'}`}
        >
          🇮🇳 Send to India
        </button>
      </div>

      {sent ? (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={32} className="text-green-500" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">Transfer Initiated!</p>
            <p className="text-sm text-gray-500 mt-1">
              ${parseFloat(amount).toLocaleString()} sent to {selectedBeneficiary?.name}
            </p>
            {tab === 'india' && (
              <p className="text-sm text-gray-500">≈ ₹{(parseFloat(amount) * fxRate).toLocaleString('en-IN')} at {fxRate} INR/USD</p>
            )}
          </div>
          <p className="text-xs text-gray-400">Estimated arrival: 1–2 business days</p>
          <button onClick={() => navigate('/')} className="w-full bg-[#0062db] text-white font-semibold py-3 rounded-xl text-sm">
            Back to Home
          </button>
        </div>
      ) : tab === 'india' ? (
        <IndiaFlow
          step={step}
          setStep={setStep}
          selectedBeneficiary={selectedBeneficiary}
          setSelectedBeneficiary={setSelectedBeneficiary}
          amount={amount}
          setAmount={setAmount}
          category={category}
          setCategory={setCategory}
          fxRate={fxRate}
          wallet={selectedWallet}
          onSend={() => setSent(true)}
        />
      ) : (
        <GlobalFlow
          step={step}
          setStep={setStep}
          selectedBeneficiary={selectedBeneficiary}
          setSelectedBeneficiary={setSelectedBeneficiary}
          amount={amount}
          setAmount={setAmount}
          category={category}
          setCategory={setCategory}
          wallet={selectedWallet}
          onSend={() => setSent(true)}
        />
      )}
    </div>
  );
}

function GlobalFlow({ step, setStep, selectedBeneficiary, setSelectedBeneficiary, amount, setAmount, category, setCategory, wallet, onSend }) {
  const [transferType, setTransferType] = useState('instant');

  return (
    <div className="space-y-4">
      {/* Step indicators */}
      <div className="flex gap-1">
        {[1, 2, 3].map(s => (
          <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? 'bg-[#0062db]' : 'bg-gray-200'}`} />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-800">Select Beneficiary</h2>

          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              placeholder="Search beneficiaries..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0062db]"
            />
          </div>

          <div className="space-y-2">
            {internationalBeneficiaries.map(b => (
              <button
                key={b.id}
                onClick={() => { setSelectedBeneficiary(b); setCategory(b.category); setStep(2); }}
                className={`w-full text-left bg-white rounded-2xl p-4 border shadow-sm flex items-center gap-3 ${selectedBeneficiary?.id === b.id ? 'border-[#0062db]' : 'border-gray-100'}`}
              >
                <div className="w-10 h-10 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#0062db] font-bold text-sm">
                  {b.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{b.name}</p>
                  <p className="text-xs text-gray-400">{b.bank} · {b.country}</p>
                  <span className="text-xs text-[#0062db] font-medium bg-[#e8f0fe] px-2 py-0.5 rounded-full mt-1 inline-block">{b.category}</span>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </button>
            ))}
          </div>

          <button className="w-full border border-dashed border-gray-300 rounded-2xl py-3 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Plus size={16} />
            Add New Beneficiary
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-800">Enter Amount</h2>

          <div className="bg-[#f5f7fa] rounded-xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#e8f0fe] flex items-center justify-center text-lg">
              {selectedBeneficiary?.emoji}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{selectedBeneficiary?.name}</p>
              <p className="text-xs text-gray-400">{selectedBeneficiary?.bank} · {selectedBeneficiary?.country}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <label className="text-xs text-gray-500 mb-1 block">You Send (USD)</label>
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-3">
              <span className="text-3xl font-bold text-gray-900">$</span>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 text-3xl font-bold text-gray-900 focus:outline-none"
              />
              <span className="text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">USD</span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
              <span>Transfer type</span>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setTransferType('instant')}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${transferType === 'instant' ? 'bg-[#0062db] text-white border-[#0062db]' : 'bg-white text-gray-600 border-gray-200'}`}
              >
                Instant · $5.00
              </button>
              <button
                onClick={() => setTransferType('swift')}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${transferType === 'swift' ? 'bg-[#0062db] text-white border-[#0062db]' : 'bg-white text-gray-600 border-gray-200'}`}
              >
                SWIFT · $15
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-2 block">Purpose</label>
            <div className="grid grid-cols-2 gap-2">
              {globalCategories.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`py-2 rounded-xl text-xs font-medium border transition-all ${category === c ? 'bg-[#0062db] text-white border-[#0062db]' : 'bg-white text-gray-600 border-gray-200'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-600 font-semibold py-3 rounded-xl text-sm">
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!amount}
              className="flex-1 bg-[#0062db] text-white font-semibold py-3 rounded-xl text-sm disabled:opacity-50"
            >
              Review
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-800">Review & Confirm</h2>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
            <Row label="From" value="USD Wallet" />
            <Row label="To" value={`${selectedBeneficiary?.name}`} />
            <Row label="Bank" value={`${selectedBeneficiary?.bank} · ${selectedBeneficiary?.country}`} />
            <Row label="You Send" value={`$${parseFloat(amount).toLocaleString()}`} />
            <Row label="Fee" value={transferType === 'instant' ? '$5.00' : '$15.00'} />
            <Row label="Total Deducted" value={`$${(parseFloat(amount) + (transferType === 'instant' ? 5 : 15)).toLocaleString()}`} highlight />
            <Row label="Transfer Type" value={transferType === 'instant' ? 'Borderless Instant' : 'SWIFT'} />
            <Row label="Purpose" value={category} />
            <Row label="Arrival" value={transferType === 'instant' ? '0–1 business days' : '3–5 business days'} />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setStep(2)} className="flex-1 bg-gray-100 text-gray-600 font-semibold py-3 rounded-xl text-sm">
              Edit
            </button>
            <button onClick={onSend} className="flex-1 bg-[#0062db] text-white font-semibold py-3 rounded-xl text-sm">
              Confirm & Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function IndiaFlow({ step, setStep, selectedBeneficiary, setSelectedBeneficiary, amount, setAmount, category, setCategory, fxRate, wallet, onSend }) {
  const inrAmount = amount ? (parseFloat(amount) * fxRate).toFixed(2) : '';

  return (
    <div className="space-y-4">
      <div className="flex gap-1">
        {[1, 2, 3].map(s => (
          <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? 'bg-[#0062db]' : 'bg-gray-200'}`} />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-800">Select Beneficiary</h2>

          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              placeholder="Search beneficiaries..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0062db]"
            />
          </div>

          <div className="space-y-2">
            {indianBeneficiaries.map(b => (
              <button
                key={b.id}
                onClick={() => { setSelectedBeneficiary(b); setStep(2); }}
                className={`w-full text-left bg-white rounded-2xl p-4 border shadow-sm flex items-center gap-3 ${selectedBeneficiary?.id === b.id ? 'border-[#0062db]' : 'border-gray-100'}`}
              >
                <div className="w-10 h-10 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#0062db] font-bold text-sm">
                  {b.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{b.name}</p>
                  <p className="text-xs text-gray-400">{b.bank} · {b.account} · {b.relation}</p>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </button>
            ))}
          </div>

          <button className="w-full border border-dashed border-gray-300 rounded-2xl py-3 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Plus size={16} />
            Add New Beneficiary
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-800">Enter Amount</h2>

          <div className="bg-[#f5f7fa] rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0062db] flex items-center justify-center text-white text-xs font-bold">
              {selectedBeneficiary?.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{selectedBeneficiary?.name}</p>
              <p className="text-xs text-gray-400">{selectedBeneficiary?.bank} · {selectedBeneficiary?.account}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <label className="text-xs text-gray-500 mb-1 block">You Send (USD)</label>
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-3">
              <span className="text-3xl font-bold text-gray-900">$</span>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 text-3xl font-bold text-gray-900 focus:outline-none"
              />
              <span className="text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">USD</span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Recipient gets</span>
              <span className="font-semibold text-gray-800">₹{inrAmount ? parseFloat(inrAmount).toLocaleString('en-IN') : '—'}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
              <span>Rate</span>
              <span>1 USD = ₹{fxRate}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
              <span>Fee</span>
              <span className="text-green-600 font-medium">FREE (student benefit)</span>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-2 block">Purpose of Remittance</label>
            <div className="grid grid-cols-2 gap-2">
              {indiaCategories.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`py-2 rounded-xl text-xs font-medium border transition-all ${category === c ? 'bg-[#0062db] text-white border-[#0062db]' : 'bg-white text-gray-600 border-gray-200'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-600 font-semibold py-3 rounded-xl text-sm">
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!amount}
              className="flex-1 bg-[#0062db] text-white font-semibold py-3 rounded-xl text-sm disabled:opacity-50"
            >
              Review
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-800">Review & Confirm</h2>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
            <Row label="From" value="USD Wallet" />
            <Row label="To" value={`${selectedBeneficiary?.name} · ${selectedBeneficiary?.bank}`} />
            <Row label="You Send" value={`$${parseFloat(amount).toLocaleString()}`} />
            <Row label="They Receive" value={`₹${(parseFloat(amount) * fxRate).toLocaleString('en-IN')}`} highlight />
            <Row label="Rate" value={`1 USD = ₹${fxRate}`} />
            <Row label="Fee" value="Free" green />
            <Row label="Purpose" value={category} />
            <Row label="Arrival" value="1–2 business days" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setStep(2)} className="flex-1 bg-gray-100 text-gray-600 font-semibold py-3 rounded-xl text-sm">
              Edit
            </button>
            <button onClick={onSend} className="flex-1 bg-[#0062db] text-white font-semibold py-3 rounded-xl text-sm">
              Confirm & Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, highlight, green }) {
  return (
    <div className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0">
      <span className="text-xs text-gray-500">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? 'text-[#0062db]' : green ? 'text-green-600' : 'text-gray-800'}`}>{value}</span>
    </div>
  );
}
