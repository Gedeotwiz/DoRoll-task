import { createAsyncThunk } from '@reduxjs/toolkit';

interface FormData {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData: FormData, { rejectWithValue }) => {
    const response = await fetch('https://doroll-app-bn.onrender.com/API/V1/users/login', {
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

    localStorage.setItem('token', data.token);

    return data;
  }
);
