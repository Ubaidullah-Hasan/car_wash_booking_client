import { baseApi } from "../../api/baseApi";

const serviceManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSlotByServiceId: builder.query({
            query: (serviceId) => {
                return {
                    url: `/slots/${serviceId}`,
                    method: "GET",
                }
            },
            providesTags: ['slot']
        }),
        getSlotBySlotId: builder.query({
            query: (slotId) => {
                return {
                    url: `/slots/selectedSlot/${slotId}`,
                    method: "GET",
                }
            },
            providesTags: ['slot']
        }),
        getAllSlots: builder.query({
            query: () => ({
                url: "/slots",
                method: "GET",
            }),
            providesTags: ['slot']
        }),
        createSlots: builder.mutation({
            query: (data) => ({
                url: "/slots",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['slot']
        }),
        updateSlotStatus: builder.mutation({
            query: (args) => {
                console.log(args.status);
                return {
                    url: `/slots/status/${args.slotId}`,
                    method: "PATCH",
                    body: args.status
                }
            },
            invalidatesTags: ['slot']
        }),
        
    }),
});

export const { useGetSlotByServiceIdQuery, useGetSlotBySlotIdQuery, useGetAllSlotsQuery, useCreateSlotsMutation, useUpdateSlotStatusMutation } = serviceManagementApi;



