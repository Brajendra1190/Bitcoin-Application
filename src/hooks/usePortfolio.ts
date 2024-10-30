import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Portfolio } from '../types';
import { db } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export function usePortfolio() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState<Portfolio>({
    fiat: {
      currency: 'USD',
      amount: 10000,
    },
    btc: 0,
  });

  const handleTrade = async (type: 'buy' | 'sell', amount: number) => {
    if (!user) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      const updatedPortfolio = { ...portfolio };

      if (type === 'buy') {
        updatedPortfolio.btc += amount;
        updatedPortfolio.fiat.amount -= amount * 30000; // Example price
      } else {
        updatedPortfolio.btc -= amount;
        updatedPortfolio.fiat.amount += amount * 30000; // Example price
      }

      await updateDoc(userRef, {
        portfolio: updatedPortfolio,
      });

      setPortfolio(updatedPortfolio);
    } catch (error) {
      console.error('Failed to update portfolio:', error);
    }
  };

  return { portfolio, handleTrade };
}