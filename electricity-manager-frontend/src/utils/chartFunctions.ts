import { Price } from '../types';

export const getPricesByDate = (prices: Price[] | undefined, date: string) => {
  if (prices) {
    return prices.filter((item: Price) => item.date === date);
  }
  return [];
};
