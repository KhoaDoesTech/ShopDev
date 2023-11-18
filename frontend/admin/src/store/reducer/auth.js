import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('accessToken')

const initialState = {
    isAuthenticated: !!token,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogout: (state) => {
        state.isAuthenticated = false;
    },
    setLogin: (state) => {
        state.isAuthenticated = true;
    }

  }
});

export const { setLogout, setLogin } = authSlice.actions

export default authSlice.reducer