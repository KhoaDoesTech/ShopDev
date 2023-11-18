import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
export default store;