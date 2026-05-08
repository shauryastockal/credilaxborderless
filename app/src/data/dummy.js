export const user = {
  name: 'Shaurya Anand',
  email: 'arjun.mehta@nyu.edu',
  university: 'New York University',
  country: 'USA',
  creditScore: 712,
  creditScoreMax: 850,
  mcaInterestRate: 4.2,
};

export const wallets = [
  {
    id: 'usd',
    currency: 'USD',
    symbol: '$',
    flag: '🇺🇸',
    unlienBalance: 3248.50,
    color: '#0062db',
  },
  {
    id: 'eur',
    currency: 'EUR',
    symbol: '€',
    flag: '🇪🇺',
    unlienBalance: 1120.00,
    color: '#3aaa7a',
  },
  {
    id: 'gbp',
    currency: 'GBP',
    symbol: '£',
    flag: '🇬🇧',
    unlienBalance: 0,
    color: '#6d28d9',
  },
  {
    id: 'aud',
    currency: 'AUD',
    symbol: 'A$',
    flag: '🇦🇺',
    unlienBalance: 0,
    color: '#b45309',
  },
  {
    id: 'cad',
    currency: 'CAD',
    symbol: 'C$',
    flag: '🇨🇦',
    unlienBalance: 0,
    color: '#b91c1c',
  },
  {
    id: 'sgd',
    currency: 'SGD',
    symbol: 'S$',
    flag: '🇸🇬',
    unlienBalance: 0,
    color: '#0e7490',
  },
];

export const loan = {
  provider: 'Credila',
  totalSanctioned: 45000,
  disbursed: 30000,
  lienBalance: 26752.00,
  unlienReleased: 3248.00,
  nextTranche: 7500,
  nextTrancheDate: 'Aug 1, 2025',
  currency: 'USD',
  symbol: '$',
  totalDebt: 32140.00,
  principal: 30000.00,
  interestAccrued: 2140.00,
  interestRate: 10.5,
  emiAmount: 0,
  emiStartDate: 'Jul 2027',
  repaymentStatus: 'moratorium',
  tranches: [
    { id: 1, amount: 15000, date: 'Jan 15, 2025', status: 'disbursed' },
    { id: 2, amount: 15000, date: 'Apr 15, 2025', status: 'disbursed' },
    { id: 3, amount: 7500, date: 'Aug 1, 2025', status: 'upcoming' },
    { id: 4, amount: 7500, date: 'Jan 1, 2026', status: 'upcoming' },
  ],
  usageBreakdown: [
    { category: 'Tuition', amount: 22000, pct: 73 },
    { category: 'Living', amount: 5500, pct: 18 },
    { category: 'Books', amount: 1200, pct: 4 },
    { category: 'Other', amount: 1300, pct: 5 },
  ],
};

export const card = {
  last4: '4289',
  network: 'Visa',
  holder: 'SHAURYA ANAND',
  expiry: '09/28',
  mode: 'debit',
  frozen: false,
  spendLimit: 2000,
  spentThisMonth: 487.32,
  cashbackEarned: 12.40,
};

export const transactions = [
  { id: 1, type: 'credit', label: 'Interest Earned — Apr 2025', amount: 11.34,    currency: 'USD', date: 'May 1, 2025',  icon: 'interest' },
  { id: 2, type: 'debit',  label: 'Starbucks NYC',              amount: 6.50,     currency: 'USD', date: 'Apr 29, 2025', icon: 'card' },
  { id: 3, type: 'debit',  label: 'Shaurya Anand',              amount: 200.00,   currency: 'USD', date: 'Apr 27, 2025', icon: 'transfer' },
  { id: 4, type: 'credit', label: 'Credila',                    amount: 15000.00, currency: 'USD', date: 'Apr 15, 2025', icon: 'loan' },
  { id: 5, type: 'debit',  label: 'NYU Tuition — Spring',       amount: 11000.00, currency: 'USD', date: 'Apr 10, 2025', icon: 'card' },
  { id: 6, type: 'debit',  label: 'Converted USD → EUR',        amount: 500.00,   currency: 'USD', date: 'Apr 5, 2025',  icon: 'convert' },
  { id: 7, type: 'credit', label: 'Converted EUR received',     amount: 462.50,   currency: 'EUR', date: 'Apr 5, 2025',  icon: 'convert' },
  { id: 8, type: 'debit',  label: 'Amazon.com',                 amount: 34.99,    currency: 'USD', date: 'Apr 3, 2025',  icon: 'card' },
];

export const fxRates = {
  'USD-EUR': 0.925,
  'EUR-USD': 1.081,
  'USD-GBP': 0.791,
  'GBP-USD': 1.264,
  'EUR-GBP': 0.855,
  'GBP-EUR': 1.170,
};

export const indianBeneficiaries = [
  { id: 0, name: 'Shaurya Anand', bank: 'HDFC Bank', account: '••••7890', ifsc: 'HDFC0004321', relation: 'Self' },
  { id: 1, name: 'Suresh Anand', bank: 'HDFC Bank', account: '••••4521', ifsc: 'HDFC0001234', relation: 'Father' },
  { id: 2, name: 'Priya Anand', bank: 'SBI', account: '••••8832', ifsc: 'SBIN0012345', relation: 'Mother' },
];

export const internationalBeneficiaries = [
  {
    id: 1,
    name: 'NYU Bursar Office',
    bank: 'JPMorgan Chase',
    iban: 'US89370400440532013001',
    country: '🇺🇸 United States',
    currency: 'USD',
    category: 'Tuition Fees',
    emoji: '🎓',
  },
  {
    id: 2,
    name: 'Manhattan Rentals LLC',
    bank: 'Bank of America',
    iban: 'US89370400440532013002',
    country: '🇺🇸 United States',
    currency: 'USD',
    category: 'Rent Payment',
    emoji: '🏠',
  },
];

export const investments = {
  roundups: { enabled: true, totalRoundsUp: 12.68, invested: 12.68, dailySavings: 0.42 },
  portfolio: { totalValue: 14.12, gainLoss: +1.44, gainLossPct: +11.36 },
};

export const referral = {
  code: 'SHAURYA25',
  referredCount: 3,
  earnedTotal: 75.00,
  pendingAmount: 25.00,
};
