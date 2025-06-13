import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstName: "",
    lastName: "",
    userName: localStorage.getItem('userName') || null,
    token : localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),

};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.userName = action.payload.userName;
            localStorage.setItem('userName', action.payload.userName);
            state.token = action.payload.token || state.token;
            state.isAuthenticated = true;
            if (action.payload.token) { 
                localStorage.setItem('token', action.payload.token)
            }
        },
        logout(state) {
            state.firstName = "";
            state.lastName = "";
            state.userName = "";
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token')
        },
    },

}) ;

export const { setUser, logout } = userSlice.actions;
export const selectUserToken = (state) => state.user.token;
export default userSlice.reducer;