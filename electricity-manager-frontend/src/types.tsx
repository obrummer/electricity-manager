export interface SwitchPoint {
  _id: string;
  name: string;
  isActive: boolean;
  highLimit: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export enum DialogMode {
  create = 'create',
  edit = 'edit',
}
export interface Price {
  price: number;
  time: string;
  priceWithTax: number;
  date: string;
}

export interface Indicators {
  averagePriceToday: number;
  priceDifferencePercentage: number;
  todayHighestPrice: number;
  todayLowestPrice: number;
  currentPrice: number;
}
