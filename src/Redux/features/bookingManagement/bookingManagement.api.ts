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
        
    }),
});

export const {useCreateBookingMutation} = bookingManagementApi;



