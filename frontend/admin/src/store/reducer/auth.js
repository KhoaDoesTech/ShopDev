import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('accessToken')
const shop = JSON.parse(localStorage.getItem('shop'));
const initialState = {
    isAuthenticated: !!token,
    shop
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogout: (state) => {
        localStorage.clear();
        state.isAuthenticated = false;
    },
    setLogin: (state, {payload}) => {
        localStorage.setItem("accessToken", payload);
        state.isAuthenticated = true;
    },
    setShop: (state, {payload}) => {
      localStorage.setItem("shop", JSON.stringify(payload));
      state.shop = payload;
    }

  }
});

export const shopSelector = state => state.auth.shop;

export const { setLogout, setLogin, setShop } = authSlice.actions

export default authSlice.reducer