import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SwitchPoint } from '../../types';

// Define a service using a base URL and expected endpoints
export const switchesApi = createApi({
  reducerPath: 'switchesApi',
  tagTypes: ['Switches'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getSwitches: builder.query<SwitchPoint[], void>({
      query: () => 'switches',
      // Provides a list of `Swtiches` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Switches` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ _id }) => ({ type: 'Switches', _id } as const)),
              { type: 'Switches', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Switches', id: 'LIST' }` is invalidated
            [{ type: 'Switches', id: 'LIST' }],
    }),
    createSwitch: builder.mutation<SwitchPoint, Partial<SwitchPoint>>({
      query(body) {
        return {
          url: 'switches',
          method: 'POST',
          body,
        };
      },
      // Invalidates all Switch-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created switch could show up in any lists.
      invalidatesTags: [{ type: 'Switches', id: 'LIST' }],
    }),
    updateSwitch: builder.mutation<SwitchPoint, Partial<SwitchPoint>>({
      query(data) {
        const { _id, ...body } = data;
        return {
          url: `switches/${_id}`,
          method: 'PUT',
          body,
        };
      },
      // Invalidates all queries that subscribe to this Switch `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { _id }) => [{ type: 'Switches', _id }],
    }),
    deleteSwitch: builder.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `switches/${id}`,
          method: 'DELETE',
        };
      },
      // Invalidates all queries that subscribe to this Switch `id` only.
      invalidatesTags: (result, error, _id) => [{ type: 'Switches', _id }],
    }),
  }),
});

export const {
  useGetSwitchesQuery,
  useCreateSwitchMutation,
  useUpdateSwitchMutation,
  useDeleteSwitchMutation,
} = switchesApi;
