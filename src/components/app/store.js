import { configureStore } from '@reduxjs/toolkit';
import { checkMailApi } from '../services/emailCheck';

const store = configureStore({
  reducer: {
    [checkMailApi.reducerPath]: checkMailApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: true
    }).concat(checkMailApi.middleware)
});

export default store;
