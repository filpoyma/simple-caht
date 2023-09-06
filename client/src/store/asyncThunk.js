import { createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../api/authAPI";
import { logoutUser, setCurrentUser } from "./slice";

export const checkAuth = createAsyncThunk(
  "checkAuth",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await authAPI.checkAuth();
      dispatch(setCurrentUser(res.user));
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

// Thunks
export const registerUser = createAsyncThunk(
  "register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authAPI.register(data);
      const { user, accessToken } = res;
      sessionStorage.setItem("accessToken", accessToken);
      return user;
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authAPI.login(data);
      const { user, accessToken } = res;
      sessionStorage.setItem("accessToken", accessToken);
      return user;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const logOut = createAsyncThunk(
  "logOut",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      await authAPI.logout();
      dispatch(logoutUser());
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "refreshToken",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const res = await authAPI.refreshToken({ accessToken });
      if (res.accessToken)
        sessionStorage.setItem("accessToken", res.accessToken);
      else {
      }
    } catch (err) {
      dispatch(logOut());
      window.location.reload();
      return rejectWithValue(err.data);
    }
  }
);
