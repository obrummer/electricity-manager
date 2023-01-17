import {
  getAveragePrice,
  getPercentageDifference,
  getHighestAndLowestPrice,
  getCurrentPrice,
  roundByTwoDecimals,
} from './priceHelpers';
import { dayPriceData } from '../testData';

describe('getAveragePrice', () => {
  it('returns average price', () => {
    const result = getAveragePrice(dayPriceData);
    expect(result).toBe(6.215);
  });
  it('returns right type', () => {
    const result = getAveragePrice(dayPriceData);
    expect(typeof result).toBe('number');
  });
});

describe('getPercentageDifference', () => {
  it('returns negative percentage difference', () => {
    const result = getPercentageDifference(5, 10);
    expect(result).toBe(-50);
  });
  it('returns positive percentage difference', () => {
    const result = getPercentageDifference(10, 5);
    expect(result).toBe(100);
  });
  it('returns zero percentage difference', () => {
    const result = getPercentageDifference(10, 10);
    expect(result).toBe(0);
  });
  it('returns right type', () => {
    const result = getPercentageDifference(5, 10);
    expect(typeof result).toBe('number');
  });
});

describe('getHighestAndLowestPrice', () => {
  it('returns highest and lowest price', () => {
    const result = getHighestAndLowestPrice(dayPriceData);
    expect(result).toEqual({ highest: 8, lowest: 4.08 });
  });
  it('returns right type', () => {
    const result = getHighestAndLowestPrice(dayPriceData);
    expect(typeof result).toBe('object');
  });
});

describe('getCurrentPrice', () => {
  it('returns price', () => {
    const prices = dayPriceData.map((item) => item.price);
    const result = getCurrentPrice(dayPriceData);
    expect(prices).toContain(result);
  });
  it('returns right type', () => {
    const result = getCurrentPrice(dayPriceData);
    expect(typeof result).toBe('number');
  });
});

describe('roundByTwoDecimals', () => {
  it('returns positive rounded number', () => {
    const result = roundByTwoDecimals(5.555);
    expect(result).toBe(5.56);
  });
  it('returns negative rounded number', () => {
    const result = roundByTwoDecimals(-5.555);
    expect(result).toBe(-5.55);
  });
  it('returns number with one decimal', () => {
    const result = roundByTwoDecimals(5.5);
    expect(result).toBe(5.5);
  });
  it('returns integer', () => {
    const result = roundByTwoDecimals(5);
    expect(result).toBe(5);
  });
  it('returns zero', () => {
    const result = roundByTwoDecimals(0);
    expect(result).toBe(0);
  });
  it('returns right type', () => {
    const result = roundByTwoDecimals(5.555);
    expect(typeof result).toBe('number');
  });
});
