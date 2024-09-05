
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData: { firstName: string; lastName: string; email: string; phoneNumber: string; password: string; role: string },{ rejectWithValue }) => {
    const response = await fetch('https://doroll-app-bn.onrender.com/API/V1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) {
      return rejectWithValue(data.message || 'Failed to fetch');
    }
    return data;
  }
);



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

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'An unknown error occurred';
      });
  },
});

export default registerSlice.reducer;
