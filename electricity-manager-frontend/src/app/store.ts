import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { switchesApi } from '../features/switches/switchesAPI';
import { pricesApi } from '../features/prices/pricesAPI';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [switchesApi.reducerPath]: switchesApi.reducer,
    [pricesApi.reducerPath]: pricesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(switchesApi.middleware, pricesApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
