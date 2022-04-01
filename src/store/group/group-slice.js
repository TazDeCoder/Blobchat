import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
  currentGroup: undefined,
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    replaceGroups(state, action) {
      state.groups = action.payload;
    },
    replaceCurrentGroup(state, action) {
      state.currentGroup = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export const groupReducer = groupSlice.reducer;
export const groupActions = groupSlice.actions;
