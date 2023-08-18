import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  taskList: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    fetchTodoSuccess: (state, action) => {
      state.taskList = [...action.payload];
      state.loading = false;
    },
    fetchTodo: (state, action) => {
      state.loading = true;
    },
    addTask: (state, action) => {
      state.loading = false;
    },
    addTaskSucess: (state, action) => {
      state.taskList = [
        ...state.taskList,
        {
          isChecked: action.payload.completed,
          id: nanoid(),
          description: action.payload.todo,
        },
      ];
      state.loading = true;
    },
    updateTask: (state, action) => {
      state.taskList[
        state.taskList.findIndex(x => x.id === action.payload.id)
      ].description = action.payload.description;
    },
    deleteTask: (state, action) => {
      state.taskList = [...state.taskList.filter(x => x.id !== action.payload)];
    },
    taskMarkdone: (state, action) => {
      state.taskList[
        state.taskList.findIndex(x => x.id === action.payload)
      ].isChecked = 1;
    },
  },
});
export const {
  addTask,
  updateTask,
  deleteTask,
  taskMarkdone,
  fetchTodoSuccess,
  fetchTodo,
  addTaskSucess,
} = todoSlice.actions;
export default todoSlice.reducer;
