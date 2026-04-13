import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
  reducerPath:"authApi",
  baseQuery: fetchBaseQuery({
    baseUrl:import.meta.env.VITE_BASE_URL,
      credentials: "include",
  }),

   endpoints: (builder) => ({
    signin: builder.mutation({
      query: (data) => ({
        url:"/api/auth/signin",
        method:"POST",
        body:data
      })
    }),


    signup: builder.mutation({
      query:(data) => ({
        url:"/api/auth/signup",
        method:"POST",
        body: data
      }),
    }) ,

    getAllBooks : builder.query({
      query: () => ({
        url:"/api/book/get-all-books"
      })
    }),

    getBookById: builder.query({
      query:(bookId) => ({
        url:`/api/book/${bookId}`
      })
    }),

    addRating: builder.mutation({
      query: ({rating, bookId}) => ({
        url:`/api/book/addRating/${bookId}`,
        method:'POST',
        body: {rating},
        credentials:"include"
      })
    }),

    getAllFavouriteBooks: builder.query({
      query:() => ({
        url : "/api/book/getAllFavouriteBooks"
      })
    }),

    addToFavourite: builder.mutation({
      query:({bookId}) => ({
        url:`/api/book/addToFavourites/${bookId}`,
        method:'POST'
      })
    }),

    removeFromFavourite: builder.mutation({
      query:({bookId}) => ({
        url:`/api/book/removeFromFavourites/${bookId}`,
        method:"POST"
      })
    }),

    getUserById: builder.query ({
      query: () => ({
        url:"/api/auth/user"
      })
    }),

    searchBooks: builder.query({
      query:(searchTerm) => ({
        url:`/api/book/search?query=${searchTerm}`,
        method:'GET'
      })
    }),

    getBooksByCategory: builder.query({
      query: (category) => ({
        url: `/api/book/category/${category}`,
        method:'GET'
      })
    }),

   })
})

export const {useSigninMutation, useSignupMutation, useGetAllBooksQuery, useGetBookByIdQuery, useAddRatingMutation, useGetAllFavouriteBooksQuery, useAddToFavouriteMutation, useRemoveFromFavouriteMutation, useGetUserByIdQuery, useSearchBooksQuery, useGetBooksByCategoryQuery} = authApiSlice;