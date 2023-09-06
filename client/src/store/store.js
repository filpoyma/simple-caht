import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slice";
import { checkAuth } from "./asyncThunk";

const store = configureStore({
  reducer: chatReducer,
});

store.dispatch(checkAuth());

export default store;
