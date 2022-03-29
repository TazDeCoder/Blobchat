import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUser: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    replaceCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    replaceUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
