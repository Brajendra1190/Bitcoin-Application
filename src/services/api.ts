import axios from 'axios';
import { BitcoinData } from '../types';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export async function getBitcoinPrice(currency: string): Promise<BitcoinData> {
  const response = await axios.get(
    `${COINGECKO_API}/simple/price?ids=bitcoin&vs_currencies=${currency.toLowerCase()}&include_24hr_change=true&include_last_updated_at=true`
  );
  
  const data = response.data.bitcoin;
  return {
    current_price: data[currency.toLowerCase()],
    price_change_percentage_24h: data[`${currency.toLowerCase()}_24h_change`],
    last_updated: new Date(data.last_updated_at * 1000).toISOString(),
  };
}

export async function getSupportedCurrencies(): Promise<string[]> {
  const response = await axios.get(`${COINGECKO_API}/simple/supported_vs_currencies`);
  return response.data;
}