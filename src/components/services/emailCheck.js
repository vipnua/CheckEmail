import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const checkMailApi = createApi({
  reducerPath: 'checkMailApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://107.189.159.137:9000/api' }),
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
