import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  avatar: "",
};

const activateSlice = createSlice({
  name: "activate",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.fullName = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const { setName, setAvatar } = activateSlice.actions;
export const selectActivate = (state) => state.activate;

export default activateSlice.reducer;
