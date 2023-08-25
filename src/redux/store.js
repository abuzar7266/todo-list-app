import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import todoReducer from "./feature/todo-list/todoSlice";
import Saga from "./saga";
import authReducer from "./feature/auth/authSlice";

const saga = createSagaMiddleware();
export const store = configureStore({
    reducer: {
        todo: todoReducer,
        user: authReducer
    },
    middleware:[saga]
});

saga.run(Saga);









