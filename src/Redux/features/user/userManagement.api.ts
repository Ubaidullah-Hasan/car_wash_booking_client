import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserByEmail: builder.query({
            query: (email) => {
                return {
                    url: `/auth/${email}`,
                    method: 'GET',
                    params: email
                }
            }
        })
    }),
});

export const { useGetUserByEmailQuery } = userApi;
