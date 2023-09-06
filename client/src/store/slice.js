import { createSlice, combineReducers } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./asyncThunk";

// Slices
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isAuthenticated: false,
    isLoading: "idle",
    errors: {},
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    authFailed: (state, action) => {
      state.isAuthenticated = false;
      state.errors = action.payload;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      state.errors = {};
    },
    clearErrors: (state) => {
      // Clear errors if there are some in the state
      if (Object.keys(state.errors).length > 0) {
        state.errors = {};
      }
    },
  },
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      if (state.isLoading === "idle") {
        state.isLoading = "pending";
      }
    },
    [loginUser.pending]: (state, action) => {
      if (state.isLoading === "idle") {
        state.isLoading = "pending";
      }
    },
    [registerUser.fulfilled]: (state, action) => {
      if (state.isLoading === "pending") {
        state.isLoading = "idle";
        state.isAuthenticated = true;
        state.user = action.payload;
      }
    },
    [registerUser.rejected]: (state, action) => {
      if (state.isLoading === "pending") {
        state.isLoading = "idle";
        state.errors = action.payload;
      }
    },
    [loginUser.fulfilled]: (state, action) => {
      if (state.isLoading === "pending") {
        state.isLoading = "idle";
        state.isAuthenticated = true;
        state.user = action.payload;
      }
    },
    [loginUser.rejected]: (state, action) => {
      if (state.isLoading === "pending") {
        state.isLoading = "idle";
        state.errors = action.payload;
      }
    },
  },
});

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    isFetching: false,
  },
  reducers: {
    getChats: (state, action) => {
      state.chats = action.payload;
    },
    addChats: (state, action) => {
      state.chats = state.chats.concat(action.payload);
    },
    setFetching: (state, action) => {
      state.isFetching = action.payload;
    },
  },
});

export const { setCurrentUser, logoutUser, authFailed, clearErrors } =
  authSlice.actions;

export const { getChats, addChats, setFetching } = chatSlice.actions;

// Selectors
export const selectUsername = (state) => state.auth.user.name;
export const selectUserId = (state) => state.auth.user.id;
export const selectError = (state) => state.auth.errors.msg;
export const selectAuthenticated = (state) => state.auth.isAuthenticated;
export const selectChat = (state) => state.chat.chats;

const chatReducer = combineReducers({
  auth: authSlice.reducer,
  chat: chatSlice.reducer,
});

export default chatReducer;
