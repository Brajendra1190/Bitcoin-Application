import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { BitcoinData } from '../types';

interface PriceDisplayProps {
  data: BitcoinData | null;
  loading: boolean;
  error: string | null;
  currency: string;
}

export function PriceDisplay({ data, loading, error, currency }: PriceDisplayProps) {
  if (loading) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 animate-pulse">
        <div className="h-20 bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!data) return null;

  const isPositive = data.price_change_percentage_24h >= 0;

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-400">Bitcoin Price</h2>
        {isPositive ? (
          <TrendingUp className="h-5 w-5 text-green-500" />
        ) : (
          <TrendingDown className="h-5 w-5 text-red-500" />
        )}
      </div>
      <div className="mt-4">
        <span className="text-4xl font-bold">
          {data.current_price.toLocaleString(undefined, {
            style: 'currency',
            currency: currency,
          })}
        </span>
        <div className="mt-2">
          <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '↑' : '↓'} {Math.abs(data.price_change_percentage_24h).toFixed(2)}%
          </span>
          <span className="text-sm text-gray-400 ml-2">24h</span>
        </div>
      </div>
    </div>
  );
}