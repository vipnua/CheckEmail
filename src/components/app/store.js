import { configureStore } from '@reduxjs/toolkit';
import { checkMailApi } from '../services/emailCheck';
import { checkProxyApi } from '../services/proxyCheck';
const store = configureStore({
  reducer: {
    [checkMailApi.reducerPath]: checkMailApi.reducer,
    [checkProxyApi.reducerPath]: checkProxyApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: true
    }).concat([checkMailApi.middleware,checkProxyApi.middleware])
});

export default store;
