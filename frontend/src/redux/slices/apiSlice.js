import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants.js";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // Bring cookies
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Products", "Users", "Orders"],
    endpoints: (builder) => ({}),
});
