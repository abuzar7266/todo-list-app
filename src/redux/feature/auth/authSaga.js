import { call, put } from "redux-saga/effects";
import { loginSuccess, loginFailure, signupSuccess, signupFailure } from "redux/feature/auth/authSlice";

import axios from "axios";
axios.defaults.headers.common = { Authorization: `Bearer ${localStorage.getItem("token")}` };
axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

const post = (url, body)=>{
  return axios
  .post(url, body)
  .then((res)=>{
    return { status: res.status, data: res.data};
  }).catch((err)=>{
    return { status: 500 };
  })
}
export function* LOGIN(action){
  const response = yield call(()=>post("/user/login", action.payload));
  if(response.status===200){
    yield put(loginSuccess({token: response.data.token}));
  }else{
    yield put(loginFailure());
  }
}
export function* SIGNUP(action){
  const response = yield call(()=>post("/user/signup", action.payload));
  if(response.status===200){
    yield put(signupSuccess());
  }else{
    yield put(signupFailure());
  }
}

export default {
    LOGIN,
    SIGNUP
};
