/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    cartQuantity: 0
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        increaseCart: (state) => {
            state.cartQuantity = state.cartQuantity + 1;
        },
        decreaseCart: (state) => {
            state.cartQuantity = state.cartQuantity - 1;
        },
        clearCart: (state) => {
            state.cartQuantity = 0;
        }

    }
});

export const cartSelector = (state: any) => state.product.cartQuantity;

export const { increaseCart, clearCart, decreaseCart } = productSlice.actions

export default productSlice.reducer