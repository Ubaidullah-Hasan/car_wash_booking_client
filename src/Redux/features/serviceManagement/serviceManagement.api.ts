import { baseApi } from "../../api/baseApi";

const serviceManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllServices: builder.query({
            query: () => {
                return {
                    url: "/services",
                    method: "GET",
                };
            },
        }),
    }),
});

export const {useGetAllServicesQuery} = serviceManagementApi;



