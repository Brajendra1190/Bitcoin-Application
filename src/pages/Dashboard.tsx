import React from 'react';
import { PriceDisplay } from '../components/PriceDisplay';
import { Portfolio } from '../components/Portfolio';
import { TradeForm } from '../components/TradeForm';
import { TransactionHistory } from '../components/TransactionHistory';
import { useBitcoinPrice } from '../hooks/useBitcoinPrice';
import { usePortfolio } from '../hooks/usePortfolio';

export function Dashboard() {
  const { data: btcData, loading, error } = useBitcoinPrice('USD');
  const { portfolio, handleTrade } = usePortfolio();

  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <PriceDisplay
            data={btcData}
            loading={loading}
            error={error}
            currency={portfolio.fiat.currency}
          />
          <Portfolio
            portfolio={portfolio}
            btcPrice={btcData?.current_price || 0}
            currency={portfolio.fiat.currency}
          />
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
          <TradeForm
            onTrade={handleTrade}
            maxFiat={portfolio.fiat.amount}
            maxBtc={portfolio.btc}
            btcPrice={btcData?.current_price || 0}
            currency={portfolio.fiat.currency}
          />
        </div>
      </div>

      <TransactionHistory />
    </div>
  );
}