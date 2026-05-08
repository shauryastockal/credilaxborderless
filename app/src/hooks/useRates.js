import { useState, useEffect } from 'react';

const CACHE_KEY = 'borderless_fx_rates';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

// Fallback rates (1 USD = X units of each currency)
export const FALLBACK_RATES = {
  USD: 1, EUR: 0.925, GBP: 0.791, AUD: 1.54,
  CAD: 1.37, SGD: 1.35, INR: 83.45,
};

// Returns how many units of toCurrency you get for 1 unit of fromCurrency
export function getRate(fromCurrency, toCurrency, usdRates) {
  if (fromCurrency === toCurrency) return 1;
  const r = usdRates || FALLBACK_RATES;
  // 1 fromCurrency → USD → toCurrency
  return (1 / r[fromCurrency]) * r[toCurrency];
}

export default function useRates() {
  const [rates, setRates] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) return data;
      }
    } catch {}
    return FALLBACK_RATES;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          setLoading(false);
          return;
        }
      } catch {}
    }

    fetch('https://open.er-api.com/v6/latest/USD')
      .then(r => r.json())
      .then(data => {
        if (data.result === 'success') {
          const r = data.rates;
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data: r, timestamp: Date.now() }));
          setRates(r);
        }
      })
      .catch(() => {}) // keep fallback on network error
      .finally(() => setLoading(false));
  }, []);

  return { rates, loading };
}
