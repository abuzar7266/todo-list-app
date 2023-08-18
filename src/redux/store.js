import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import todoReducer from "./feature/todo-list/todoSlice";
import todoSaga from "./sagas/todoSaga";

const saga = createSagaMiddleware();
export const store = configureStore({
    reducer: {
        todo: todoReducer
    },
    middleware:[saga]
});

saga.run(todoSaga);