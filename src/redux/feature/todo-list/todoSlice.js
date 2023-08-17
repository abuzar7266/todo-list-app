import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState = {
    taskList: []
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers:{
        addTask: (state, action)=>{
            state.taskList = [...state.taskList,{status:0,id: nanoid(), task: action.payload}]
        },
        updateTask: (state, action)=>{
           state.taskList[state.taskList.findIndex((x)=>x.id===action.payload.id)].task = action.payload.task;
        },
        deleteTask: (state, action)=>{
            state.taskList = [...state.taskList.filter((x)=>x.id!==action.payload)];
        },
        taskMarkdone: (state, action)=>{
            state.taskList[state.taskList.findIndex((x)=>x.id==action.payload)].status = 1;
        }
    }
})
export const { addTask, updateTask, deleteTask, taskMarkdone } = todoSlice.actions;
export default todoSlice.reducer;
