import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,
  otp: {
    phone: "",
    hash: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      console.log(action.payload.user);

      state.user = action.payload.user;

      state.isAuth = action.payload.auth;
    },
    setOtp: (state, action) => {
      state.otp.phone = action.payload.phone;
      state.otp.hash = action.payload.hash;
    },
  },
});

export const { setAuth, setOtp } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
