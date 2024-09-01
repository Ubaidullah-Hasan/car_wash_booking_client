import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body: userInfo
                }
            }
        }),
        registerUser: builder.mutation({
            query: (registerInfo) => {
                return{
                    url: '/auth/signup',
                    method: 'POST',
                    body: registerInfo
                }
            }
        })
    }),
});

export const {useLoginMutation, useRegisterUserMutation } = authApi;
