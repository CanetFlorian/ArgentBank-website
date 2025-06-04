import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { userApi } from './apiSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [userApi.reducerPath] : userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(userApi.middleware)
}
);

