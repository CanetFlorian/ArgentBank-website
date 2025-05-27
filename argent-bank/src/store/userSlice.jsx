import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstName: "",
    lastName: "",
    isAuthenticated: false,

};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.firstName = action.payload.firstName;
            state.lastName= action.payload.lastName;
            state.isAuthenticated= true;
        },
        logout(state) {
            state.firstName = "";
            state.lastName = "";
            state.isAuthenticated = false;
        },
    },

}) ;

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;