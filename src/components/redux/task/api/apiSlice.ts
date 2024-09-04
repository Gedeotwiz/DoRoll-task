import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { File } from "buffer";


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://doroll-app-bn.onrender.com/API/V1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    
  }),
  tagTypes: ['getTodos', 'getProfile'],
  endpoints: (builder) => ({
    getTasks: builder.query<any, void>({
      query: () => "tasks",
      providesTags: ['getTodos']
    }),

    getTaskRelatedToUserId: builder.query<any, void>({
      query: () => "tasks/userId/tasks",
      providesTags: ['getTodos']
    }),

    getUser: builder.query<any, string>({
      query: (id) => `users/${id}`,
      providesTags: ['getProfile']
  }),

    searchTask: builder.query<any, string | void>({
      query: (searchTerm) => `tasks/search?query=${searchTerm}`,
    }),

    updateTaskStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/tasks/mark/${id}`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['getTodos']
    }),
    updateTask: builder.mutation({
      query: ({ id, time,title,description }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: { time,title,description },
        
      }),
      invalidatesTags: ['getTodos']
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE", 
      }),
      invalidatesTags: ['getTodos']
    }),

    updateProfile: builder.mutation({
      query: ({ id, ...data }: { id: string}) => ({
        url: `/profile/update/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['getProfile']
    }),

    updatePassword: builder.mutation({
      query: ({ id,currentPassword,newPassword }) => ({
        url: `/profile/updatePassword/${id}`,
        method: 'PUT',
        body: {currentPassword,newPassword}
      }),
      invalidatesTags: ['getProfile']
    }),

    uploadImage: builder.mutation({
      query: ({ id, file }) => {
        const formData = new FormData();
        formData.append('file', file);
    
        return {
          url: `profile/uploadImage/${id}`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['getProfile']
    }),
     
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: 'users/forgot-password',
        method: 'POST',
        body: { email },
      }),
      invalidatesTags: ['getProfile']
    }),
   
  }),

});

export const { useGetTasksQuery, useGetTaskRelatedToUserIdQuery,useForgotPasswordMutation,
   useSearchTaskQuery,useGetUserQuery,useUpdatePasswordMutation,useUploadImageMutation,
  useUpdateTaskStatusMutation,useUpdateTaskMutation,useDeleteTaskMutation,useUpdateProfileMutation} = apiSlice;
