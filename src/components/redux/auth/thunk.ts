import { createAsyncThunk } from '@reduxjs/toolkit';


interface FormData {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData: FormData) => {
    const response = await fetch('http://localhost:3001/API/V1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch'); 
    }

    return await response.json();
  }
);
