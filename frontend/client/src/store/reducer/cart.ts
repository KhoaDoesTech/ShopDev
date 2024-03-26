/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sumBy } from 'lodash';
import { CartEndpoint } from '../../api/endpoints/cart';
import axiosClient from '../../config/axiosClient';
import { Cart, UpdateCart } from '../../interfaces';
import { AddToCartDto } from '../../interfaces/index';

// Async Thunks
export const createOrupdateCartReduxThunk = createAsyncThunk('cart/createOrupdateCartRedux', async (data: AddToCartDto) => {
    try {
        const response = await axiosClient.request(CartEndpoint.createOrupdateCartRedux(data));
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
});
export const updateCartThunk = createAsyncThunk('cart/updateCart', async ({ userId, data }: { userId: string, data: UpdateCart }) => {
    try {
        const response = await axiosClient.request(CartEndpoint.updateCart(userId, data));
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
});
export const checkProductExistsThunk = createAsyncThunk('cart/checkProductExists', async ({ userId, productId }: { userId: string, productId: string }) => {
    try {
        const { productExists } = await axiosClient.request(CartEndpoint.checkProductExists(userId, productId));
        return productExists;
    } catch (error) {
        console.log(error)
        return null;
    }
});

interface CartState {
    items: Cart[];
    productExists: boolean;
    totalQuantity: number;
}
const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    productExists: false,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateCartRedux: (state, action: PayloadAction<Cart>) => {
            state.items = action.payload;
            state.totalQuantity = sumBy(state.items, 'quantity');
        },
        increaseItem: (state, action: PayloadAction<Cart>) => {
            const productId = action.payload.product._id;
            const existingItemIndex = state.items.findIndex((item: Cart) => item.product._id === productId);
            console.log({ existingItemIndex })
            if (existingItemIndex !== -1) {
                if (state.items[existingItemIndex].quantity < 10) {
                    state.items[existingItemIndex].quantity += 1;
                }
            } else {
                state.items.push(action.payload);
            }
            state.totalQuantity = sumBy(state.items, 'quantity');


        },
        decreaseItem: (state, action: PayloadAction<any>) => {
            const productId = action.payload.product._id;
            const existingItemIndex = state.items.findIndex(item => item.product._id === productId);
            if (state.items[existingItemIndex].quantity > 0) {
                state.items[existingItemIndex].quantity -= 1;
            }
            // if (state.items[existingItemIndex].quantity == 0) {
            //     state.items.splice(existingItemIndex, 1);
            // }
            state.totalQuantity = sumBy(state.items, 'quantity');

        },
        selectAll: (state) => {
            const allSelected = state.items.every((item) => item.select)
            const updatedCart = state.items.map((item) => ({ ...item, select: !allSelected }));
            state.items = updatedCart;
        },
        deselectAll: (state) => {
            const updatedCart = state.items.map((item) => ({ ...item, select: false }));
            state.items = updatedCart;
        },
        selectOne: (state, action: PayloadAction<string>) => {
            const updatedCart = state.items.map((item) =>
                item.product._id === action.payload ? { ...item, select: !item.select } : item
            );
            state.items = updatedCart;
        }

    },
});

export const cartSelector = (state: any) => state.cart.items;
export const cartTotalSelector = (state: any) => state.cart.totalQuantity;

export const { updateCartRedux, increaseItem, decreaseItem, selectAll, deselectAll, selectOne } = cartSlice.actions

export default cartSlice.reducer