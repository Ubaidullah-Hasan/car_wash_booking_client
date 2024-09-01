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
        })
    }),
});

export const { useGetSlotByServiceIdQuery } = serviceManagementApi;



