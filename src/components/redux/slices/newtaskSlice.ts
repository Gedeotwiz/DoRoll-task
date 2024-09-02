import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const AddNewtask = createAsyncThunk(
  'tasks/addNewTask',
  async (formData: { title: string; description: string; time: string; userId: string }) => {
    const token = localStorage.getItem("token");
    const response = await fetch('http://localhost:3001/API/V1/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });
    if (!response.ok) {
      throw new Error('Failed to add task');
    }
    return response.json();
  }
);

interface TaskState {
  task: any; 
  error: string | null; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: TaskState = {
  task: null,
  error: null,
  status: 'idle',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddNewtask.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(AddNewtask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.task = action.payload;
            })
      .addCase(AddNewtask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'An unknown error occurred';
      });
  },
});

export default taskSlice.reducer;
