import { call, put } from "redux-saga/effects";
import { fetchTodoSuccess } from "redux/feature/todo-list/todoSlice";

import axios from "axios";
axios.defaults.headers.common = { Authorization: `Bearer ${localStorage.getItem("token")}` };
axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

export function* FETCH_TODO() {
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
export function* POST_ADD_TODO(action) {
  yield call(() =>
    axios.post("/", { description: action.payload })
  );
  yield call(FETCH_TODO);
}
export function* UPDATE_TODO(action){
  yield call(()=>axios.put(`/${action.payload.id}`, { description: action.payload.description}));
  yield call(FETCH_TODO);
}
export function* MARK_DONE_TODO(action){
  yield call(()=>axios.put(`/${action.payload.id}`, { isChecked: action.payload.isChecked }));
  yield call(FETCH_TODO);
}
export function* DELETE_TODO(action){
  yield call(()=>axios.delete(`/${action.payload}`));
  yield call(FETCH_TODO);
}
