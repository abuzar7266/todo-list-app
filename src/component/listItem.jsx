import React from "react";
import { useState } from 'react'
import { SquareOutlined } from "@mui/icons-material";
import { CheckBox } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import { updateTask,deleteTask,taskMarkdone } from "../redux/feature/todo-list/todoSlice";
import '../asset/css/listItem.css';
import { useDispatch } from "react-redux";

const ListItem = ({taskList, setTaskList, task}) =>{
        const dispatch = useDispatch();
        const [state, setState] = useState({
            update:0,
            task:null
        });
        return (
            <tr>
                <td colSpan={10} className="column-1">
                    { task.status==0 ? (<SquareOutlined className="icon-format" onClick={()=>{
                        dispatch(taskMarkdone(task.id));
                    }}/>):(<CheckBox className="icon-format"/>) }
                    { (state.update===1) ? (<input type="text" name="update-task" value={state.task.task} onChange={(e)=>{setState({...state, task:{...state.task, task:e.target.value}})}} onKeyPress={(e)=>{
                        if(e.key==="Enter"){
                            dispatch(updateTask({
                                id:state.task.id,
                                task:state.task.task
                            }));
                            setState({update:0,task:null});
                        }
                    }}/>):(task.status==1 ? (<s>{task.task}</s>):(task.status==0 && <span>{task.task}</span>))}
                </td>
                <td className="column-2">
                    <Edit className="icon-format" onClick={()=>{
                        state.update===1 ? setState({update:0,task:null}) : setState({update:1,task:task})
                    }}/>
                    <Delete className="icon-format" onClick={()=>{ dispatch(deleteTask(task.id)) }}/>
                </td>
            </tr>
        );
}

export default ListItem;