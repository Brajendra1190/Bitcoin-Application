import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactions';

export function TransactionHistory() {
  const { transactions, loading } = useTransactions();

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-lg font-medium text-gray-400 mb-4">Transaction History</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-lg font-medium text-gray-400 mb-4">Transaction History</h2>
      
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              {tx.type === 'buy' ? (
                <ArrowDownRight className="h-5 w-5 text-green-500" />
              ) : (
                <ArrowUpRight className="h-5 w-5 text-red-500" />
              )}
              <div>
                <div className="font-medium">
                  {tx.type === 'buy' ? 'Bought' : 'Sold'} Bitcoin
                </div>
                <div className="text-sm text-gray-400">
                  {new Date(tx.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-medium">{tx.btcAmount.toFixed(8)} BTC</div>
              <div className="text-sm text-gray-400">
                {tx.fiatAmount.toLocaleString(undefined, {
                  style: 'currency',
                  currency: tx.currency,
                })}
              </div>
            </div>
          </div>
        ))}

        {transactions.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No transactions yet
          </div>
        )}
      </div>
    </div>
  );
}