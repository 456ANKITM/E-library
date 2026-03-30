import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./api/authApi";
import userReducer from "./slices/userSlice"


export const store = configureStore({
  reducer:{
    [authApiSlice.reducerPath] : authApiSlice.reducer,
    user: userReducer

  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware), 
})

