import { baseApi } from "../../api/baseApi";

type TSlotId = {
    date?: string
    startTime?: string,
    endTime?: string,
    time?: string,
}
type TServiceId = {
    name?: string,
}
type TCustomer = {
    name?: string,
}

interface Booking {
    _id: string;
    customer?: TCustomer;
    serviceId: TServiceId;
    slotId: TSlotId;
    vehicleType: string;
    vehicleBrand: string;
    vehicleModel: string;
    manufacturingYear: number;
    registrationPlate: string;
    phone: string;
    name: string;
    paymentStatus: string;
    status: string;
    transactionId: string;
    totalPrice: number;
    createdAt:string;
}


interface GetAllBookingsResponse {
    data: Booking[];
}

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
        getAllBooking: builder.query<Booking[], void>({
            query: () => ({
                url: "/bookings",
                method: "GET",
            }),
            transformResponse: (response: unknown) => {
                const typedResponse = response as GetAllBookingsResponse;
                return typedResponse.data;
            }
        }),
        getMyBooking: builder.query<Booking[], string | undefined>({
            query: (userEmail) => ({
                url: `/bookings/my-bookings/${userEmail}`,
                method: "GET",
            }),
            transformResponse: (response: unknown) => {
                const typedResponse = response as GetAllBookingsResponse;
                return typedResponse.data;
            }
        }),
    }),
});



export const { useCreateBookingMutation, useGetAllBookingQuery, useGetMyBookingQuery } = bookingManagementApi;



