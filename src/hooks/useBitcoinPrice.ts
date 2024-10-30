import { useState, useEffect } from 'react';
import { getBitcoinPrice } from '../services/api';
import { BitcoinData } from '../types';

export function useBitcoinPrice(currency: string) {
  const [data, setData] = useState<BitcoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchPrice() {
      try {
        const data = await getBitcoinPrice(currency);
        if (mounted) {
          setData(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to fetch Bitcoin price');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    const interval = setInterval(fetchPrice, 30000); // Update every 30 seconds
    fetchPrice();

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [currency]);

  return { data, loading, error };
}