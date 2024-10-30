import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';

interface TradeFormProps {
  onTrade: (type: 'buy' | 'sell', amount: number) => void;
  maxFiat: number;
  maxBtc: number;
  btcPrice: number;
  currency: string;
}

export function TradeForm({ onTrade, maxFiat, maxBtc, btcPrice, currency }: TradeFormProps) {
  const [amount, setAmount] = useState<string>('');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      onTrade(tradeType, numAmount);
      setAmount('');
    }
  };

  const maxAmount = tradeType === 'buy' ? maxFiat / btcPrice : maxBtc;
  const total = (parseFloat(amount) || 0) * btcPrice;

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(undefined, {
      style: 'currency',
      currency: currency,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Trade Bitcoin</h2>
        <button
          type="button"
          onClick={() => setTradeType(prev => prev === 'buy' ? 'sell' : 'buy')}
          className="flex items-center space-x-2 text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg transition-colors"
        >
          <ArrowUpDown className="h-4 w-4" />
          <span>{tradeType.toUpperCase()}</span>
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Amount (BTC)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.0001"
            min="0"
            max={maxAmount}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
          />
          <div className="mt-1 text-sm text-gray-500">
            Max: {maxAmount.toFixed(8)} BTC
          </div>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex justify-between text-sm">
            <span>Total {tradeType === 'buy' ? 'Cost' : 'Received'}</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={!btcPrice || parseFloat(amount) <= 0}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            tradeType === 'buy'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-red-600 hover:bg-red-700'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {tradeType === 'buy' ? 'Buy Bitcoin' : 'Sell Bitcoin'}
        </button>
      </div>
    </form>
  );
}