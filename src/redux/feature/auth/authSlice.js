import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  token: "",
  state: 0,
  msg: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state,
      };
    },
    signup: (state, action) => {
      return {
        ...state,
      };
    },
    loginSuccess: (state, action) => {
        return {
          ...state,
          login: true,
          token: action.payload.token,
          state: 1,
        };
    },
    loginFailure: (state, action) => {
        alert("Incorrect username or password");
        return { ...state, state: 2 };
    },
    signupSuccess: (state, action) => {
      alert("Successfuly created an account");
      return { ...state, state:3 };
    },
    signupFailure: (state, action) => {
        alert("Failed to create an account");
        return { ...state, state: 4 };
    },
    refresh: (state, action) => {
      return {
        ...state,
        state: 0,
        msg: "",
      };
    },
    logout: (state, action) => {
      localStorage.removeItem("token");
      return {
        login: false,
        token: "",
        state: 0,
        msg: "",
      };
    },
  },
});
export const { login, signup, loginSuccess, loginFailure, signupSuccess, signupFailure, refresh, logout } =
  authSlice.actions;
export default authSlice.reducer;
