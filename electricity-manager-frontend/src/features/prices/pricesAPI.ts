import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Price, Indicators } from '../../types';

// TODO refactor to use only one endpoint
export const pricesApi = createApi({
  reducerPath: 'pricesApi',
  tagTypes: ['Prices'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getPrices: builder.query<Price[], void>({
      query: () => 'electricityprice',
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ time }) => ({ type: 'Prices', time } as const)),
              { type: 'Prices', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Prices', id: 'LIST' }` is invalidated
            [{ type: 'Prices', id: 'LIST' }],
    }),
    getTomorrowPrices: builder.query<Price[], void>({
      query: () => 'tomorrowelectricityprice',
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ time }) => ({ type: 'Prices', time } as const)),
              { type: 'Prices', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Prices', id: 'LIST' }` is invalidated
            [{ type: 'Prices', id: 'LIST' }],
    }),
    getYesterdayPrices: builder.query<Price[], void>({
      query: () => 'yesterdayelectricityprice',
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ time }) => ({ type: 'Prices', time } as const)),
              { type: 'Prices', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Prices', id: 'LIST' }` is invalidated
            [{ type: 'Prices', id: 'LIST' }],
    }),
    getIndicators: builder.query<Indicators, void>({
      query: () => 'indicators',
    }),
  }),
});

export const {
  useGetPricesQuery,
  useGetTomorrowPricesQuery,
  useGetYesterdayPricesQuery,
  useGetIndicatorsQuery,
} = pricesApi;
