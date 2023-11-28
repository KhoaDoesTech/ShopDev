import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth";
import productReducer from "./reducer/product";

const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer
    },
});
export default store;