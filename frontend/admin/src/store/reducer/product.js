import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    product: null
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, {payload}) => {
      state.product = payload;
    }
  }
});

export const productSelector = state => state.product.product;

export const { setProduct } = productSlice.actions

export default productSlice.reducer