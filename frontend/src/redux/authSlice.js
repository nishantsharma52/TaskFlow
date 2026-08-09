import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  authChecked:false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Loading start/stop
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Login/Register ke baad user store me save hoga
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },

    // Logout
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setAuthChecked:(state,action)=>{
      state.authChecked = action.payload
    }
  },
});

// Actions export
export const { setLoading, setUser, logoutUser,setAuthChecked } = authSlice.actions;

// Reducer export
export default authSlice.reducer;