import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  btcAmount: number;
  fiatAmount: number;
  currency: string;
  timestamp: number;
}

export function useTransactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const txs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Transaction[];
      
      setTransactions(txs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { transactions, loading };
}