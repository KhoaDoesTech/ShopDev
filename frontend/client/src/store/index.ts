import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth";
import cartReducer from "./reducer/cart";
import orderReducer from "./reducer/order";

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        order: orderReducer
    },
});
export default store;