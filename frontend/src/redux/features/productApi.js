
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/',
    mode: 'cors'
   }),
   tagTypes: ['Product'],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => '/get-products',
      providesTags: ['Product'],
    }),
      addproduct: builder.mutation({
        query: (data) => ({
          url: '/add-product',
          method: 'POST',
          headers: {
            'Accept': 'application/json'
        },
          body: data,
        }),
        invalidatesTags: ['Product'],
      }),

      updateRiders: builder.mutation({
        query: ({ data, id }) => ({
          url: `/riders/${id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['Product'], // Ensures cache invalidation for 'Product' tag
      }),
      
  }),
})


export const { useGetAllProductsQuery, useAddproductMutation, useUpdateRidersMutation } = productApi