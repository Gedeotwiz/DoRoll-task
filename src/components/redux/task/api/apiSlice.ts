import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/API/V1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<any, void>({
      query: () => "tasks",
    }),

    getTaskRelatedToUserId: builder.query<any, void>({
      query: () => "tasks/userId/tasks",
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
    }),

    updateTask: builder.mutation({
      query: ({ id, time,title,description }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: { time,title,description },
      }),
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE", 
      }),
    }),
  }),
});

export const { useGetTasksQuery, useGetTaskRelatedToUserIdQuery, useSearchTaskQuery,
  useUpdateTaskStatusMutation,useUpdateTaskMutation,useDeleteTaskMutation} = apiSlice;
