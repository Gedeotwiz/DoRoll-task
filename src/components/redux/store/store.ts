import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../task/api/apiSlice'; 
import authReducer from '../auth/authSlices';
import registerReducer from '../auth/registerSlice'; 
import  AddNewtask  from '../slices/newtaskSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    register: registerReducer,
    task:AddNewtask,
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
