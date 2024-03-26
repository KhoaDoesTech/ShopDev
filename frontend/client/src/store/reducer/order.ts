/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    order: null
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<any>) => {
            state.order = action.payload;
        }

    }
});

export const orderSelector = (state: any) => state.order.order;

export const { setOrder } = orderSlice.actions

export default orderSlice.reducer