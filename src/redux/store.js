import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import todoReducer from "./feature/todo-list/todoSlice";
import mySaga from "./sagas/mySaga";
import authReducer from "./feature/auth/authSlice";

const saga = createSagaMiddleware();
export const store = configureStore({
    reducer: {
        todo: todoReducer,
        auth: authReducer
    },
    middleware:[saga]
});

saga.run(mySaga);