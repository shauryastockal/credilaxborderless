import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, ChevronRight, CheckCircle, Plus, ArrowLeft, ChevronDown } from 'lucide-react';
import { wallets, indianBeneficiaries, internationalBeneficiaries } from '../data/dummy';

const COUNTRIES = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Australia',
  'Canada', 'Singapore', 'UAE', 'Netherlands', 'Sweden', 'Other',
];

// Rates relative to 1 USD
const FX_TO_USD = { USD: 1, EUR: 1.08, GBP: 1.27, AUD: 0.65, CAD: 0.73, SGD: 0.74 };
const INR_PER_USD = 83.45;

function getRate(fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) return 1;
  if (toCurrency === 'INR') return (1 / FX_TO_USD[fromCurrency]) * INR_PER_USD;
  const fromUsd = FX_TO_USD[fromCurrency];
  const toUsd = FX_TO_USD[toCurrency];
  return (1 / fromUsd) * toUsd;
}

function formatAmount(amount, currency) {
  const symbols = { USD: '$', EUR: '€', GBP: '£', AUD: 'A$', CAD: 'C$', SGD: 'S$', INR: '₹' };
  const sym = symbols[currency] || currency + ' ';
  if (currency === 'INR') return sym + parseFloat(amount).toLocaleString('en-IN');
  return sym + parseFloat(amount).toLocaleString();
}

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
    <div className="p-4 md:p-6 space-y-5 md:max-w-2xl">
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
  const [addingBeneficiary, setAddingBeneficiary] = useState(false);
  const [localBeneficiaries, setLocalBeneficiaries] = useState(internationalBeneficiaries);
  const [selectedWallet, setSelectedWallet] = useState(wallets[0]);

  const destCurrency = selectedBeneficiary?.currency || 'USD';
  const rate = getRate(selectedWallet.currency, destCurrency);
  const walletRate = getRate('USD', selectedWallet.currency);
  const instantFee = (5 * walletRate).toFixed(2);
  const swiftFee = (15 * walletRate).toFixed(2);
  const feeInWallet = transferType === 'instant' ? instantFee : swiftFee;
  const convertedAmount = amount ? parseFloat(amount) * rate : 0;
  const sameWallet = selectedWallet.currency === destCurrency;

  if (addingBeneficiary) {
    return (
      <AddBeneficiaryForm
        isIndia={false}
        onBack={() => setAddingBeneficiary(false)}
        onSave={(b) => {
          setLocalBeneficiaries(prev => [...prev, { ...b, id: Date.now() }]);
          setAddingBeneficiary(false);
        }}
      />
    );
  }

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
            {localBeneficiaries.map(b => (
              <button
                key={b.id}
                onClick={() => { setSelectedBeneficiary(b); setCategory(b.category || ''); setStep(2); }}
                className={`w-full text-left bg-white rounded-2xl p-4 border shadow-sm flex items-center gap-3 ${selectedBeneficiary?.id === b.id ? 'border-[#0062db]' : 'border-gray-100'}`}
              >
                <div className="w-10 h-10 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#0062db] font-bold text-sm">
                  {b.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{b.name}</p>
                  <p className="text-xs text-gray-400">{b.bank} · {b.country}</p>
                  {b.category && <span className="text-xs text-[#0062db] font-medium bg-[#e8f0fe] px-2 py-0.5 rounded-full mt-1 inline-block">{b.category}</span>}
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </button>
            ))}
          </div>

          <button
            onClick={() => setAddingBeneficiary(true)}
            className="w-full border border-dashed border-gray-300 rounded-2xl py-3 flex items-center justify-center gap-2 text-sm text-gray-500 hover:border-[#0062db] hover:text-[#0062db] transition-colors"
          >
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

          <WalletSelector selected={selectedWallet} onSelect={setSelectedWallet} />

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <label className="text-xs text-gray-500 mb-1 block">You Send ({selectedWallet.currency})</label>
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-3">
              <span className="text-3xl font-bold text-gray-900">{selectedWallet.symbol}</span>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 text-3xl font-bold text-gray-900 focus:outline-none"
              />
              <span className="text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">{selectedWallet.currency}</span>
            </div>
            {!sameWallet && (
              <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                <span>Recipient gets ({destCurrency})</span>
                <span className="font-semibold text-gray-800">
                  {amount ? formatAmount(convertedAmount, destCurrency) : '—'}
                </span>
              </div>
            )}
            {!sameWallet && (
              <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
                <span>Rate</span>
                <span>1 {selectedWallet.currency} = {rate.toFixed(4)} {destCurrency}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
              <span>Transfer type</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTransferType('instant')}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${transferType === 'instant' ? 'bg-[#0062db] text-white border-[#0062db]' : 'bg-white text-gray-600 border-gray-200'}`}
              >
                Instant · {selectedWallet.symbol}{instantFee}
              </button>
              <button
                onClick={() => setTransferType('swift')}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${transferType === 'swift' ? 'bg-[#0062db] text-white border-[#0062db]' : 'bg-white text-gray-600 border-gray-200'}`}
              >
                SWIFT · {selectedWallet.symbol}{swiftFee}
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
            <Row label="From" value={`${selectedWallet.flag} ${selectedWallet.currency} Wallet`} />
            <Row label="To" value={`${selectedBeneficiary?.name}`} />
            <Row label="Bank" value={`${selectedBeneficiary?.bank} · ${selectedBeneficiary?.country}`} />
            <Row label="You Send" value={formatAmount(amount, selectedWallet.currency)} />
            {!sameWallet && <Row label="Rate" value={`1 ${selectedWallet.currency} = ${rate.toFixed(4)} ${destCurrency}`} />}
            {!sameWallet && <Row label="They Receive" value={formatAmount(convertedAmount, destCurrency)} highlight />}
            <Row label="Fee" value={formatAmount(feeInWallet.toFixed(2), selectedWallet.currency)} />
            <Row label="Total Deducted" value={formatAmount((parseFloat(amount || 0) + feeInWallet).toFixed(2), selectedWallet.currency)} highlight={sameWallet} />
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
  const [addingBeneficiary, setAddingBeneficiary] = useState(false);
  const [localBeneficiaries, setLocalBeneficiaries] = useState(indianBeneficiaries);
  const [selectedWallet, setSelectedWallet] = useState(wallets[0]);

  const rate = getRate(selectedWallet.currency, 'INR');
  const inrAmount = amount ? (parseFloat(amount) * rate).toFixed(2) : '';

  if (addingBeneficiary) {
    return (
      <AddBeneficiaryForm
        isIndia={true}
        onBack={() => setAddingBeneficiary(false)}
        onSave={(b) => {
          setLocalBeneficiaries(prev => [...prev, { ...b, id: Date.now(), account: `••••${b.accountNumber.slice(-4)}` }]);
          setAddingBeneficiary(false);
        }}
      />
    );
  }

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
            {localBeneficiaries.map(b => (
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

          <button
            onClick={() => setAddingBeneficiary(true)}
            className="w-full border border-dashed border-gray-300 rounded-2xl py-3 flex items-center justify-center gap-2 text-sm text-gray-500 hover:border-[#0062db] hover:text-[#0062db] transition-colors"
          >
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

          <WalletSelector selected={selectedWallet} onSelect={setSelectedWallet} />

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <label className="text-xs text-gray-500 mb-1 block">You Send ({selectedWallet.currency})</label>
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-3">
              <span className="text-3xl font-bold text-gray-900">{selectedWallet.symbol}</span>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 text-3xl font-bold text-gray-900 focus:outline-none"
              />
              <span className="text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">{selectedWallet.currency}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Recipient gets (INR)</span>
              <span className="font-semibold text-gray-800">{inrAmount ? formatAmount(inrAmount, 'INR') : '—'}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
              <span>Rate</span>
              <span>1 {selectedWallet.currency} = ₹{rate.toFixed(2)}</span>
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
            <Row label="From" value={`${selectedWallet.flag} ${selectedWallet.currency} Wallet`} />
            <Row label="To" value={`${selectedBeneficiary?.name} · ${selectedBeneficiary?.bank}`} />
            <Row label="You Send" value={formatAmount(amount, selectedWallet.currency)} />
            <Row label="They Receive" value={inrAmount ? formatAmount(inrAmount, 'INR') : '—'} highlight />
            <Row label="Rate" value={`1 ${selectedWallet.currency} = ₹${rate.toFixed(2)}`} />
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

function WalletSelector({ selected, onSelect }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm"
      >
        <span className="text-lg">{selected.flag}</span>
        <div className="flex-1 text-left">
          <p className="text-xs text-gray-400">Pay from</p>
          <p className="text-sm font-semibold text-gray-800">{selected.currency} Wallet</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Balance</p>
          <p className="text-sm font-semibold text-gray-800">
            {selected.symbol}{selected.unlienBalance.toLocaleString()}
          </p>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-2xl shadow-lg z-20 overflow-hidden">
          {wallets.map(w => (
            <button
              key={w.id}
              onClick={() => { onSelect(w); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${selected.id === w.id ? 'bg-[#e8f0fe]' : ''}`}
            >
              <span className="text-base">{w.flag}</span>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-gray-800">{w.currency}</p>
              </div>
              <p className={`text-sm font-semibold ${w.unlienBalance > 0 ? 'text-gray-800' : 'text-gray-300'}`}>
                {w.symbol}{w.unlienBalance.toLocaleString()}
              </p>
              {selected.id === w.id && <div className="w-2 h-2 rounded-full bg-[#0062db]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AddBeneficiaryForm({ isIndia, onBack, onSave }) {
  const [payeeType, setPayeeType] = useState('individual');
  const [name, setName] = useState('');
  const [country, setCountry] = useState(isIndia ? 'India' : '');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [saved, setSaved] = useState(false);

  const canSave = name && accountNumber && bankCode && (isIndia || country);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      onSave({ name, payeeType, country: isIndia ? '🇮🇳 India' : country, accountNumber, bankCode, bank: bankCode, relation: payeeType === 'business' ? 'Business' : 'Individual' });
    }, 800);
  };

  if (saved) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center space-y-4">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle size={28} className="text-green-500" />
        </div>
        <p className="text-base font-bold text-gray-900">Beneficiary Saved!</p>
        <p className="text-sm text-gray-500">{name} has been added to your beneficiaries.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
          <ArrowLeft size={15} className="text-gray-600" />
        </button>
        <h2 className="text-sm font-semibold text-gray-800">Add New Beneficiary</h2>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
        {/* Payee type */}
        <div>
          <label className="text-xs text-gray-500 mb-2 block">Payee Type</label>
          <div className="flex gap-2">
            {['individual', 'business'].map(type => (
              <button
                key={type}
                onClick={() => setPayeeType(type)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all capitalize ${
                  payeeType === type ? 'bg-[#0062db] text-white border-[#0062db]' : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                {type === 'individual' ? 'Individual' : 'Business'}
              </button>
            ))}
          </div>
        </div>

        {/* Payee name */}
        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Payee Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={payeeType === 'business' ? 'e.g. NYU Bursar Office' : 'e.g. Rahul Sharma'}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0062db]"
          />
        </div>

        {/* Country */}
        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Payee Country</label>
          {isIndia ? (
            <div className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-500 flex items-center gap-2">
              🇮🇳 India
            </div>
          ) : (
            <select
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#0062db]"
            >
              <option value="">Select country</option>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
        </div>

        {/* Account number */}
        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Account Number</label>
          <input
            type="text"
            value={accountNumber}
            onChange={e => setAccountNumber(e.target.value)}
            placeholder="Enter account number"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0062db]"
          />
        </div>

        {/* IFSC / Sort code */}
        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">
            {isIndia ? 'IFSC Code' : 'Sort Code / Routing Number'}
          </label>
          <input
            type="text"
            value={bankCode}
            onChange={e => setBankCode(e.target.value)}
            placeholder={isIndia ? 'e.g. HDFC0001234' : 'e.g. 20-15-42'}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0062db]"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!canSave}
          className={`w-full font-semibold py-3 rounded-xl text-sm transition-all ${
            canSave ? 'bg-[#0062db] text-white' : 'bg-gray-100 text-gray-400'
          }`}
        >
          Save Beneficiary
        </button>
      </div>
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
