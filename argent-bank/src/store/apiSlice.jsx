import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi ({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/v1/user/',
    prepareHeaders: (headers, { getState }) => {
   
      const token = getState().user.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (utilisateur) => ({
                url: 'login',
                method: 'POST',
                body: utilisateur,
            }),
        }),
        getUserProfile: builder.query ({
            query : () => ({
                url:'profile',
                method: 'POST',
            }),
        }),
        updateUsername: builder.mutation({
        query: (modifPseudo) => ({
    url: 'profile',  
    method: 'PUT',
    body: { userName: modifPseudo },
            }),
        }),

    })
});

export const { useLoginUserMutation, useGetUserProfileQuery,useUpdateUsernameMutation } = userApi;