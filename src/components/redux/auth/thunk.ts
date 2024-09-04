import { createAsyncThunk } from '@reduxjs/toolkit';  

interface FormData {  
  email: string;  
  password: string;  
}  

export const loginUser = createAsyncThunk(  
  'auth/loginUser',  
  async (formData: FormData) => {  
    const response = await fetch('https://doroll-app-bn.onrender.com/API/V1/users/login', {  
      method: 'POST',  
      headers: {  
        'Content-Type': 'application/json',  
      },  
      body: JSON.stringify(formData),  
    });  
 
    if (!response.ok) {  
      const errorResponse = await response.json();  
      throw new Error(errorResponse.message || 'Failed to fetch');   
    }  
 
    const data = await response.json(); 
      
    localStorage.setItem('token', data.token);   

    return data;   
  }  
);