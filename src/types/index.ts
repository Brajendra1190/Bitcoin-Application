export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface BitcoinData {
  current_price: number;
  price_change_percentage_24h: number;
  last_updated: string;
}

export interface Portfolio {
  fiat: {
    currency: string;
    amount: number;
  };
  btc: number;
}