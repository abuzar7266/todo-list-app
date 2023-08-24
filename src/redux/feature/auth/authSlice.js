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
    authSuccess: (state, action) => {
      if (action.payload.login) {
        return {
          ...state,
          login: action.payload.login,
          token: action.payload.token,
          state: action.payload.state,
        };
      } else if (action.payload.state) {
        alert(action.payload.msg);
        return { ...state, state: action.payload.state };
      }
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
export const { login, signup, authSuccess, refresh, logout } =
  authSlice.actions;
export default authSlice.reducer;
