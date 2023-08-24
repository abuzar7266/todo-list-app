import { call, put, takeEvery, all } from "redux-saga/effects";
import { fetchTodoSuccess } from "redux/feature/todo-list/todoSlice";

import axios from "axios";
axios.defaults.headers.common = { Authorization: `Bearer ${localStorage.getItem("token")}` };
axios.defaults.baseURL = "http://localhost:3001";

function* FETCH_TODO() {
  const todo = yield call(() => axios.get("/"));
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
function* todoSaga() {
  yield takeEvery("todo/fetchTodo",  FETCH_TODO);
  yield takeEvery("todo/addTask", POST_ADD_TODO);
  yield takeEvery("todo/updateTask", UPDATE_TODO);
  yield takeEvery("todo/taskMarkdone", MARK_DONE_TODO);
  yield takeEvery("todo/deleteTask", DELETE_TODO);
}

export default todoSaga;
