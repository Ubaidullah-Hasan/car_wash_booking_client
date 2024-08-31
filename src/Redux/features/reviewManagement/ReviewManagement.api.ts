import { baseApi } from "../../api/baseApi";

const reviewManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createReview: builder.mutation({
            query: (reviewData) => {
                return {
                    url: '/reviews',
                    method: 'POST',
                    body: reviewData,
                }
            }
        })
    }),
});

export const { useCreateReviewMutation } = reviewManagementApi;
