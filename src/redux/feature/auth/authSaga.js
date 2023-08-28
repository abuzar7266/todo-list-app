import { call, put } from "redux-saga/effects";
import { loginSuccess, loginFailure, signupSuccess, signupFailure } from "redux/feature/auth/authSlice";
import { apiCallRequest } from "redux/api";

export function* LOGIN(action){
  const response = yield call(()=>apiCallRequest("/user/login", "POST", action.payload));
  if(response.token??0){
    yield put(loginSuccess({token: response.token}));
  }else{
    yield put(loginFailure());
  }
}
export function* SIGNUP(action){
  const response = yield call(()=>apiCallRequest("/user/signup","POST", action.payload));
  if(response.success??0){
    yield put(signupSuccess());
  }else{
    yield put(signupFailure());
  }
}

export default {
    LOGIN,
    SIGNUP
};
