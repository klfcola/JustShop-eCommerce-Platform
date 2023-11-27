import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInformation: localStorage.getItem("userInformation")
        ? JSON.parse(localStorage.getItem("userInformation"))
        : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInformation = action.payload;
            localStorage.setItem(
                "useInformation",
                JSON.stringify(action.payload)
            );
        },
    },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
