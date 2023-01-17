import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { PriceUnit } from '../types';
import { TimeZones } from './config';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

export const getAveragePrice = (priceUnits: PriceUnit[]): number => {
  const averagePrice =
    priceUnits.reduce((acc, item) => acc + item.price, 0) / priceUnits.length;
  return averagePrice;
};

export const getPercentageDifference = (
  currentPrice: number,
  previousPrice: number,
): number => {
  const difference = currentPrice - previousPrice;
  const percentageDifference = (difference / previousPrice) * 100;
  return percentageDifference;
};

export const getHighestAndLowestPrice = (
  data: PriceUnit[],
): { highest: number; lowest: number } => {
  const prices = data.map((item) => item.price);
  return {
    highest: Math.max(...prices),
    lowest: Math.min(...prices),
  };
};

export const getCurrentPrice = (
  data: PriceUnit[],
  timeZone: string = TimeZones.FI,
): number => {
  let currentHour = dayjs().tz(timeZone).hour().toString();
  if (currentHour.length === 1) {
    currentHour = `0${currentHour}`;
  }
  currentHour = `${currentHour}:00`;
  const currentPrice = data.find((item) => item.time === currentHour);
  if (!currentPrice) {
    return 0;
  }
  return currentPrice.price;
};

export const roundByTwoDecimals = (number: number): number => {
  return Math.round((number + Number.EPSILON) * 100) / 100;
};
