import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4300",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (projectData) => ({
        url: "/auth/project/create",
        method: "POST",
        body: projectData,
      }),
    }),
    
    getProjects: builder.query({
      query: () => "/auth/project/allProjects",
    }),

    getProjectById: builder.query({
      query: (id) => ({
        url: `/auth/project/getproject/${id}`,
      }),
    }),

    roleToggle: builder.mutation({
      query: ({ id, role, projectId }) => ({
        url: `/auth/project/roleToggle/${id}`,
        method: "PATCH",
        body: { role, projectId },
      }),
    }),

    addMembers: builder.mutation({
      query: ({ id, projectId }) => ({
        url: `/auth/project/addMember/${id}`,
        method: "POST",
        body: { projectId },
      }),
    }),

    deleteMember: builder.mutation({
      query: ({ id, projectId }) => ({
        url: `/auth/project/deleteMember/${id}`,
        method: "DELETE",
        body: { projectId },
      }),
    }),

    addTask: builder.mutation({
      query: ({ projectId, ...taskData }) => ({
        url: `/auth/project/addtask`,
        method: "POST",
        body: { projectId, ...taskData },
      }),
    }),
    
    editTask: builder.mutation({
      query: ({ taskId,projectId,...updatedTask }) => ({
        url: `/auth/project/edittask/${taskId}`,
        method: "PATCH",
        body: {projectId,...updatedTask},
      }),
    }),
    
    updateTaskStatus: builder.mutation({
  query: ({ taskId, projectId, status }) => ({
    url: `/auth/project/updatestatus/${taskId}`,
    method: 'PATCH',
    body: { projectId, status }
  }),
}),
    

    addComment: builder.mutation({
      query: ({ projectId, taskId, text }) => ({
        url: `/auth/project/addcomment/${projectId}`,
        method: "POST",
        body: {
          text,
          taskId,
        },
      }),
    }),

    listMembers: builder.query({
      query: (projectId) => ({
        url: `/auth/project/listmembers/${projectId}`,
        method: "GET",
      }),
      transformResponse: (response) => ({
        ...response,
        members: response.data || [],
      }),
      providesTags: ["Members"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useRoleToggleMutation,
  useAddMembersMutation,
  useDeleteMemberMutation,
  useAddTaskMutation,
  useEditTaskMutation,
  useAddCommentMutation,
  useUpdateTaskStatusMutation,
  useListMembersQuery,
} = projectApi;
