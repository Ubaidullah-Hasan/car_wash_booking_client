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
            providesTags: ["services"]
        }),
        getPopularServices: builder.query({
            query: () => {
                return {
                    url: "/services/popular",
                    method: "GET",
                };
            },
            providesTags: ["services"]
        }),
        getBestsaleServices: builder.query({
            query: () => {
                return {
                    url: "/services/bestsale",
                    method: "GET"
                };
            },
            providesTags: ["services"]
        }),
        getOffersServices: builder.query({
            query: () => {
                return {
                    url: "/services/offers",
                    method: "GET"                };
            },
            providesTags: ["services"]
        }),
        getSingleService: builder.query({
            query: (serviceId) => {
                return {
                    url: `/services/${serviceId}`,
                    method: "GET",
                }
            },
            providesTags: ["services"]
        }),

        createService: builder.mutation({
            query: (payload) => {
                return {
                    url: `/services`,
                    method: "POST",
                    body: payload
                }
            },
            invalidatesTags: ['services']
        }),

        updateService: builder.mutation({
            query: (args) => {
                return {
                    url: `/services/${args.serviceId}`,
                    method: "PUT",
                    body: args.data
                }
            },
            invalidatesTags: ["services"]
        }),
        deleteService: builder.mutation({
            query: (serviceId) => {
                return {
                    url: `/services/${serviceId}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["services"]
        })
    }),
});

export const { useGetAllServicesQuery, useGetSingleServiceQuery, useCreateServiceMutation, useUpdateServiceMutation, useDeleteServiceMutation, useGetPopularServicesQuery, useGetBestsaleServicesQuery, useGetOffersServicesQuery } = serviceManagementApi;



