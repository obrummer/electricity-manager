import { Price } from '../types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export const getPricesByDate = (prices: Price[] | undefined, date: string) => {
  if (prices) {
    return prices.filter((item: Price) => item.date === date);
  }
  return [];
};

export const getChartData = (data: Price[] | undefined, date: string) => {
  const chartData = data?.filter((item) => item.date === date);
  return chartData || [];
};

export const getCurrentHour = (timeZone: string) => {
  let currentHour = dayjs().tz(timeZone).hour().toString();
  if (currentHour.length === 1) {
    currentHour = `0${currentHour}`;
  }
  return `${currentHour}:00`;
};
