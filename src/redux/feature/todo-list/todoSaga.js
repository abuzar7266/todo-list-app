import { call, put } from "redux-saga/effects";
import { fetchTodoSuccess } from "redux/feature/todo-list/todoSlice";
import { apiCallRequest } from "redux/api";

export function* FETCH_TODO() {
  const todo = yield call(() => apiCallRequest('/', 'GET'));
  console.log(todo);
  yield put(
    fetchTodoSuccess(
      todo.todo.map((data, idx) => {
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
    apiCallRequest("/",'POST', { description: action.payload })
  );
  yield call(FETCH_TODO);
}
export function* UPDATE_TODO(action){
  yield call(()=>apiCallRequest(`/${action.payload.id}`,'PUT', { description: action.payload.description}));
  yield call(FETCH_TODO);
}
export function* MARK_DONE_TODO(action){
  yield call(()=>apiCallRequest(`/${action.payload.id}`,'PUT', { isChecked: action.payload.isChecked }));
  yield call(FETCH_TODO);
}
export function* DELETE_TODO(action){
  yield call(()=>apiCallRequest(`/${action.payload}`,'DELETE'));
  yield call(FETCH_TODO);
}
