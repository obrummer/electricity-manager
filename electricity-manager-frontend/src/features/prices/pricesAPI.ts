import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Price, Indicators } from '../../types';

export const pricesApi = createApi({
  reducerPath: 'pricesApi',
  tagTypes: ['Prices'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getPricesByDate: builder.query<
      Price[],
      { startDate?: string; endDate?: string }
    >({
      query: (arg) => {
        const { startDate, endDate } = arg;
        return {
          url: 'electricitypricebydate',
          params: { startDate, endDate },
        };
      },
      keepUnusedDataFor: 600,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ date }) => ({ type: 'Prices', date } as const)),
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

export const { useGetPricesByDateQuery, useGetIndicatorsQuery } = pricesApi;
