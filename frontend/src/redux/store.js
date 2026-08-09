import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice.js";
import todoReducer from "./todoSlice.js"

export const store = configureStore({
  reducer: {
    auth:authReducer,
    todo:todoReducer,
  },
})