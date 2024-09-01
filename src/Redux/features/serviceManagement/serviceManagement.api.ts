import { baseApi } from "../../api/baseApi";

const serviceManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllServices: builder.query({
            query: (params) => {
                return {
                    url: "/services",
                    method: "GET",
                    params: params
                };
            },
        }),
    }),
});

export const {useGetAllServicesQuery} = serviceManagementApi;



