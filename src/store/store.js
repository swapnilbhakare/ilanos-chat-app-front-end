import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import activateReducer from "./activateSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    activate: activateReducer,
    user: userReducer,
  },
});

export default store;
