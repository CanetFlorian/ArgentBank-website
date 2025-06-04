import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstName: "",
    lastName: "",
    userName: "",
    token : null,
    isAuthenticated: false,

};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.userName = action.payload.userName;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.firstName = "";
            state.lastName = "";
            state.userName = "";
            state.token = null;
            state.isAuthenticated = false;
        },
    },

}) ;

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;