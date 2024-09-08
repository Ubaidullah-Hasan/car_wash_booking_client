import { baseApi } from "../../api/baseApi";

const bookingManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBooking: builder.mutation({
            query: (data) => {
                return {
                    url: "/bookings",
                    method: "POST",
                    body: data
                };
            },
            invalidatesTags: ["slot"]
        }),
        getAllBooking: builder.query({
            query: () => ({
                url: "/bookings",
                method: "GET",
            }),
            transformResponse: (response) => {
                return (response.data)
            }
        }),
        getMyBooking: builder.query({
            query: (userEmail) => ({
                url: `/bookings/my-bookings/${userEmail}`,
                method: "GET",
            }),
            transformResponse: (response) => {
                return (response.data)
            }
        }),
    }),
});



export const { useCreateBookingMutation, useGetAllBookingQuery, useGetMyBookingQuery } = bookingManagementApi;



