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
        })
    }),
});

export const { useGetSlotByServiceIdQuery, useGetSlotBySlotIdQuery } = serviceManagementApi;



