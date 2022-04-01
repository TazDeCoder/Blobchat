import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    replaceMessages(state, action) {
      state.messages = action.payload;
    },
    addNewMessage(state, action) {
      state.messages.push(action.payload);
    },
    reset() {
      return initialState;
    },
  },
});

export const messageReducer = messageSlice.reducer;
export const messageActions = messageSlice.actions;
