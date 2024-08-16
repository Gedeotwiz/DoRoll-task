
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:3000/" }),
    endpoints: (builder) => ({
      getTasks: builder.query<any, void>({
        query: () => "tasks",
      }),
      getTaskDetails: builder.query<any, string>({
        query: (taskId) => `tasks/${taskId}`,
      }),
    }),
  });
  
  export const { useGetTasksQuery, useGetTaskDetailsQuery } = apiSlice;