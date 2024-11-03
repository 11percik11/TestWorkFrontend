import { User } from "../types";
import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteUser: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
    }),
    registerUser: builder.mutation<{ name: string; group: string; company: string; presence: boolean }, { name: string; group: string; company: string; presence: boolean }>({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
    }),
    getCurrentUsers: builder.query<User[], void>({
      query: () => ({
        url: "/current",
        method: "GET",
      }),
    }),
    getUserById: builder.query<User, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<User, { id: string; userData: {name?: string; group?: string; company?: string; presence?: boolean } }>({
      query: ({ id, userData }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: userData,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useDeleteUserMutation,
  useGetCurrentUsersQuery,
  useLazyGetCurrentUsersQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
} = userApi;

export const {
  endpoints: { deleteUser, registerUser, getCurrentUsers, getUserById, updateUser },
} = userApi;
