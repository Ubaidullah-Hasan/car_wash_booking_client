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
        getSingleService: builder.query({
            query: (serviceId) => {
                return{
                    url: `/services/${serviceId}`,
                    method: "GET",
                }
            }
        })
    }),
});

export const {useGetAllServicesQuery, useGetSingleServiceQuery} = serviceManagementApi;



