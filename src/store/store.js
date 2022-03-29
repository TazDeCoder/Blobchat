import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth/auth-slice";
import { groupReducer } from "./group/group-slice";
import { messageReducer } from "./message/message-slice";
import { userReducer } from "./user/user-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    group: groupReducer,
    message: messageReducer,
    user: userReducer,
  },
});

export default store;
