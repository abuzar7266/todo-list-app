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
      return {
        ...state,
        taskList:action.payload,
        loading:false
      };
    },
    fetchTodo: (state, action) => {
      return {
        ...state, 
        loading:true
      };
    },
    addTask: (state, action) => {
        return {
            ...state, 
            loading:true
        };
    },
    addTaskSucess: (state, action) => {
      return {
        ...state,
        taskList:[...state.taskList, { isChecked: action.payload.completed, id: nanoid(), description: action.payload.todo }],
        loading: false
      }
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
