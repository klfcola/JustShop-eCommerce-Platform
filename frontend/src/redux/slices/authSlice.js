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
                "userInformation",
                JSON.stringify(action.payload)
            );

            const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
            localStorage.setItem("expirationTime", expirationTime);
        },

        logout: (state, action) => {
            state.userInformation = null;
            localStorage.clear();
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
