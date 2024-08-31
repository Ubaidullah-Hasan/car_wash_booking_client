/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";


type TResponse = {
    data: any,
    success: boolean,
    message: string,
    statusCode: number,
}

const reviewManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createReview: builder.mutation({
            query: (reviewData) => {
                return {
                    url: '/reviews',
                    method: 'PATCH',
                    body: reviewData,
                }
            },
            invalidatesTags: ['review']
        }),
        getReviewByUserId: builder.query({
            query: (userId) => {
                return {
                    url: `/reviews/${userId}`,
                    method: 'GET',
                }
            },
            providesTags: ['review']
        }),
        getAllReviews: builder.query<TResponse, any>({
            query: (params) => {
                return {
                    url: "/reviews",
                    method: 'GET',
                    params: params
                }
            },
            providesTags: ['review']
        })
    }),
});

export const { useCreateReviewMutation, useGetReviewByUserIdQuery, useGetAllReviewsQuery } = reviewManagementApi;
