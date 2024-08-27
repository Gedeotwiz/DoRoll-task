import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from './thunk'; 


interface AuthState {
    user: any; 
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
  }

const initialState: AuthState = {
  user: null,
  error: null,
  status: 'idle',
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'An unknown error occurred';
      });
  },
});

export default authSlice.reducer;
