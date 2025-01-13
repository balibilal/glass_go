
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/user',
    mode: 'cors'
    
   }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    allUser: builder.query({
      query: () => '/get-all',
      providesTags: ['User'],

    }),


    createUser: builder.mutation({
      query: (data) => ({
        url: '/new',
        method: 'POST',
        headers: {
          'Accept': 'application/json'
      },
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
          url: `/delete-user/${id}`,
          method: 'DELETE',
      }),
      invalidatesTags: ['User'],
  }),
    
      userLogin: builder.mutation({
        query: (data) => ({
          url: '/login',
          method: 'POST',
          headers: {
            'Accept': 'application/json'
        },
          body: data,
        }),
        invalidatesTags: ['User'],

      }),

      userLogout: builder.mutation({
        query: () => ({
          url: '/logout',
          method: 'POST',
        }),
        invalidatesTags: ['User'],

      }),


  }),
})


export const { useAllUserQuery, useCreateUserMutation, useUserLoginMutation, useUserLogoutMutation, useDeleteUserMutation } = authApi