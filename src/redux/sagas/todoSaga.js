import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchTodoSuccess,
  addTaskSucess,
} from "redux/feature/todo-list/todoSlice";

function* FETCH_TODO() {
  const todo = yield call(() => fetch("https://dummyjson.com/todos"));
  const formattedTodo = yield todo.json();
  yield put(
    fetchTodoSuccess(
      formattedTodo.todos.map((data, idx) => {
        return {
          description: data.todo,
          id: `${data.id}`,
          isChecked: data.completed,
        };
      })
    )
  );
}

function* POST_ADD_TODO(action) {
  const todo = yield call(() => {
    return fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: action.payload,
        completed: false,
        userId: 5,
      }),
    }).then(res => res.json());
  });
  yield put(addTaskSucess(todo));
}
function* todoSaga() {
  yield takeEvery("todo/fetchTodo", FETCH_TODO);
  yield takeEvery("todo/addTask", POST_ADD_TODO);
}

export default todoSaga;
