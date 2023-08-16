import React from "react";
import { useState } from 'react'
import { SquareOutlined } from "@mui/icons-material";
import { CheckBox } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import '../asset/css/listItem.css'

const ListItem = ({taskList, setTaskList, task}) =>{
        const [state, setState] = useState({
            update:0,
            task:null
        });
        return (
            <tr>
                <td colSpan={10} className="column-1">
                    { task.status==0 ? (<SquareOutlined className="icon-format" onClick={()=>{
                        taskList[taskList.findIndex((x)=>x.id==task.id)].status = 1;
                        setTaskList([...taskList]);
                    }}/>):(<CheckBox className="icon-format"/>) }
                    { (state.update===1) ? (<input type="text" name="update-task" value={state.task.task} onChange={(e)=>{setState({...state, task:{...state.task, task:e.target.value}})}} onKeyPress={(e)=>{
                        if(e.key==="Enter"){
                            taskList[taskList.findIndex((x)=>x.id===state.task.id)] = state.task;
                            setTaskList([...taskList]);
                            setState({update:0,task:null});
                        }
                    }}/>):(task.status==1 ? (<s>{task.task}</s>):(task.status==0 && <span>{task.task}</span>))}
                </td>
                <td className="column-2">
                    <Edit className="icon-format" onClick={()=>{
                        state.update===1 ? setState({update:0,task:null}) : setState({update:1,task:task})
                    }}/>
                    <Delete className="icon-format" onClick={()=>{
                        setTaskList(taskList.filter((x)=>x.id!==task.id));
                    }}/>
                </td>
            </tr>
        );
}

export default ListItem;