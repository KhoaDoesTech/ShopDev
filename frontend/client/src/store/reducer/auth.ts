/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('accessToken')
const account = localStorage.getItem('account');
const initialState = {
  isAuthenticated: !!token,
  account: JSON.parse(account)
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogout: (state) => {
      localStorage.clear();
      state.isAuthenticated = false;
    },
    setLogin: (state, action: PayloadAction<any>) => {
      localStorage.setItem("accessToken", action.payload);
      state.isAuthenticated = true;
    },
    setAccount: (state, action: PayloadAction<any>) => {
      localStorage.setItem("account", JSON.stringify(action.payload));
      state.account = action.payload;
    }

  }
});

export const accountSelector = (state: any) => state.auth.account;

export const { setLogout, setLogin, setAccount } = authSlice.actions

export default authSlice.reducer