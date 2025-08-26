import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApi";
import authReducer from './features/auth/authSlice'
import { projectApi } from "./features/adminApi/adminApi";


export const store = configureStore({
  reducer: {
  auth:authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(projectApi.middleware),
});