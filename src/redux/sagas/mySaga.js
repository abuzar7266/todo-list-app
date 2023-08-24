import { call, put, takeEvery, all } from "redux-saga/effects";
import { fetchTodoSuccess } from "redux/feature/todo-list/todoSlice";
import { authSuccess } from "redux/feature/auth/authSlice";

import axios from "axios";
axios.defaults.headers.common = { Authorization: `Bearer ${localStorage.getItem("token")}` };
axios.defaults.baseURL = "http://localhost:3001";

function* FETCH_TODO() {
  const todo = yield call(() => axios.get("/"));
  console.log(todo);
  yield put(
    fetchTodoSuccess(
      todo.data.todo.map((data, idx) => {
        return {
          ...data,
          id: data._id,
        };
      })
    )
  );
}
function* POST_ADD_TODO(action) {
  yield call(() =>
    axios.post("/", { description: action.payload })
  );
  yield call(FETCH_TODO);
}
function* UPDATE_TODO(action){
  yield call(()=>axios.put(`/${action.payload.id}`, { description: action.payload.description}));
  yield call(FETCH_TODO);
}
function* MARK_DONE_TODO(action){
  yield call(()=>axios.put(`/${action.payload.id}`, { isChecked: action.payload.isChecked }));
  yield call(FETCH_TODO);
}
function* DELETE_TODO(action){
  yield call(()=>axios.delete(`/${action.payload}`));
  yield call(FETCH_TODO);
}
const makePost = (url, body)=>{
  return axios
  .post(url, body)
  .then((res)=>{
    return { status: res.status, data: res.data};
  }).catch((err)=>{
    return { status: 500 };
  })
}
function* LOGIN(action){
  const response = yield call(()=>makePost("/user/login", action.payload));
  if(response.status==200){
    yield put(authSuccess({login: true, msg: "Successfully logged in", token: response.data.token, state:1 }));
  }else{
    yield put(authSuccess({login: true, msg: "Incorrect username or password", token: "", state: 2}));
  }
}
function* SIGNUP(action){
  const response = yield call(()=>makePost("/user/signup", action.payload));
  if(response.status==200){
    yield put(authSuccess({msg: "Successfully signed up", state: 3}));
  }else{
    yield put(authSuccess({msg: "Failed to create an account", state: 4}));
  }
}
function* todoSaga() {
  yield takeEvery("todo/fetchTodo",  FETCH_TODO);
  yield takeEvery("todo/addTask", POST_ADD_TODO);
  yield takeEvery("todo/updateTask", UPDATE_TODO);
  yield takeEvery("todo/taskMarkdone", MARK_DONE_TODO);
  yield takeEvery("todo/deleteTask", DELETE_TODO);

  yield takeEvery("auth/login", LOGIN);
  yield takeEvery("auth/signup", SIGNUP);
}

export default todoSaga;
