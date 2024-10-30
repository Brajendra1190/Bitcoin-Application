import React from 'react';
import { Wallet } from 'lucide-react';
import { Portfolio as PortfolioType } from '../types';

interface PortfolioProps {
  portfolio: PortfolioType;
  btcPrice: number;
  currency: string;
}

export function Portfolio({ portfolio, btcPrice, currency }: PortfolioProps) {
  const totalValue = portfolio.fiat.amount + (portfolio.btc * btcPrice);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(undefined, {
      style: 'currency',
      currency: currency,
    });
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-400">Your Portfolio</h2>
        <Wallet className="h-5 w-5 text-blue-500" />
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Bitcoin</span>
          <div className="text-right">
            <div className="font-medium">{portfolio.btc.toFixed(8)} BTC</div>
            <div className="text-sm text-gray-500">
              {formatCurrency(portfolio.btc * btcPrice)}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400">{currency}</span>
          <div className="font-medium">{formatCurrency(portfolio.fiat.amount)}</div>
        </div>
        
        <div className="pt-4 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Value</span>
            <div className="text-xl font-bold">{formatCurrency(totalValue)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}