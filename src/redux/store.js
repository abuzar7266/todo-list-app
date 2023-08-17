import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./feature/todo-list/todoSlice";
export const store = configureStore({
    reducer: {
        todo: todoReducer
    }
});