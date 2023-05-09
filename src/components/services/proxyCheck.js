import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const checkProxyApi = createApi({
    reducerPath: 'checkProxyApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9000/api' }),
    endpoints: (builder) => ({
      checkProxyHttp: builder.mutation({
        query: (proxy) => ({
          url: '/check-proxy-https',
          method: 'POST',
          body: proxy,
        }),
        invalidatesTags: ['checkProxyApi'], // thêm tag 'Proxy'
      }),
      checkProxySocks5: builder.mutation({
        query: (proxy) => ({
          url: '/check-proxy-socks',
          method: 'POST',
          body: proxy,
        }),
        invalidatesTags: ['checkProxyApi'], // thêm tag 'Proxy'
      }),
    }),
  });
  
export const { useCheckProxyHttpMutation,useCheckProxySocks5Mutation } = checkProxyApi;
