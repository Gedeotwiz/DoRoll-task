import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';  
import { RootState } from '../store/store';   

const CreatingNewTask = createApi({  
  reducerPath: 'api',  
  baseQuery: fetchBaseQuery({  
    baseUrl: 'https://localhost:3001/API/V1/tasks', 
    prepareHeaders: (headers, { getState }) => {  
      const state = getState() as RootState;  
      const token = localStorage.getItem("token");  
      console.log(token);    
      if (token) {  
        headers.set('Authorization', `Bearer ${token}`);  
      }  
      return headers;  
    },  
  }),  
  tagTypes: ['Task'],   
  endpoints: (builder) => ({  
    postTask: builder.mutation<void, { title: string; description: string; time: string; userId: string }>({  
      query: (newTask) => ({  
        url: 'tasks',  
        method: 'POST',  
        body: newTask,  
      }),  
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],   
    }),  
     
  }),  
});  

 
export const { usePostTaskMutation } = CreatingNewTask;  
 
export default CreatingNewTask;