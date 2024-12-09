import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
// const baseUrl = import.meta.env.VITE_BACKEND_URL;
const baseUrl = "https://car-wash-booking-system-server-henna.vercel.app/api";


const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('Authorization', 'Bearer ' + token)
        }
        return headers;
    }

})

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQuery,
    tagTypes: ['review', 'slot', "services", "user", "booking"],
    endpoints: () => ({}),
});

