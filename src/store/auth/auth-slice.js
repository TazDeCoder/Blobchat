import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
  id: undefined,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initAuth(state, action) {
      state.authenticated = true;
      state.id = action.payload;
      state.error = null;
    },
    signInSuccess(state, action) {
      state.authenticated = true;
      state.id = action.payload;
      state.error = null;
    },
    signInError(state, action) {
      state.error = action.payload;
    },
    signOutSuccess() {
      return initialState;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
