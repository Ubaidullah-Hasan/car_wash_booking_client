import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserByEmail: builder.query({
            query: (email) => {
                return {
                    url: `/auth/${email}`,
                    method: 'GET',
                }
            },
            providesTags: ["user"]
        }),
        getAllUser: builder.query({
            query: () => {
                return {
                    url: `/auth`,
                    method: 'GET',
                }
            },
            providesTags: ["user"]
        }),
        updateUserRole: builder.mutation({
            query: (args) => {
                console.log(args);
                return {
                    url: `/auth/role/${args.userId}`,
                    method: 'PATCH',
                    body: args.role
                }
            },
            invalidatesTags: ["user"]
        }),
        updateUserProfile: builder.mutation({
            query: (args) => {
                return {
                    url: `/auth/${args.email}`,
                    method: 'PATCH',
                    body: args.data
                }
            },
            invalidatesTags: ["user"]
        })
    }),
});

export const { useGetUserByEmailQuery, useGetAllUserQuery, useUpdateUserRoleMutation, useUpdateUserProfileMutation } = userApi;
