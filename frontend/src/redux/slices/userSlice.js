import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null
}

const userSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    loginStart: (state) => {
      state.loading = true;
      state.error = null
    },
    setUser : (state, action) => {
      state.currentUser = action.payload;
      state.loading = false,
      state.error = null;
      localStorage.setItem("user",JSON.stringify(action.payload))
    },

    clearUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem("user")
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
})

export const {loginStart, setUser, clearUser, setError} = userSlice.actions;

export default userSlice.reducer;