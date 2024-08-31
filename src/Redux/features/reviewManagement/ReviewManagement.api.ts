import { baseApi } from "../../api/baseApi";

const reviewManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createReview: builder.mutation({
            query: (reviewData) => {
                return {
                    url: '/reviews',
                    method: 'PATCH',
                    body: reviewData,
                }
            }
        }),
        getReviewByUserId: builder.query({
            query: (userId) => {
                return{
                    url: `/reviews/${userId}`,
                    method: 'GET',
                }
            }
        })
    }),
});

export const { useCreateReviewMutation, useGetReviewByUserIdQuery } = reviewManagementApi;
