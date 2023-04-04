import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const checkMailApi = createApi({
  reducerPath: 'checkMailApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://148.163.48.29:9000/' }),
  endpoints: (builder) => ({
    checkMail: builder.mutation({
      query: (email) => ({
        url: '/check-mail',
        method: 'POST',
        body: email,
      }),
    }),
  }),
});

export const { useCheckMailMutation } = checkMailApi;
