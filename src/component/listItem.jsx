import React from "react";
import { SquareOutlined } from "@mui/icons-material";
import { CheckBox } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";

const ListItem = ({iD, status, setTask, handleEnter, handleMakeUpdate, handleDeleteTask, handleChecked, data, idx, task}) =>{
        return (<tr>
            <td colSpan={10} style={{padding:'15px'}}>
                {data.status==0 ? <SquareOutlined style={{fontSize:'14px',cursor:'pointer'}} onClick={()=>{handleChecked(idx)}}/>:<CheckBox style={{fontSize:'14px'}}/>}
                { (status===1 && iD===idx) ?<input type="text" name="update-task" value={task} onChange={(e)=>{setTask(e.target.value);}} onKeyPress={handleEnter}/>:(data.status==1 ? <s>{data.task}</s>:data.status==0 && <span>{data.task}</span>)}
                </td>
                <td style={{textAlign:'right', padding:'15px'}}><Edit style={{fontSize:'14px'}} onClick={()=>{
                    handleMakeUpdate(data.task, idx, 1)
                }}/><Delete style={{fontSize:'14px', cursor:'pointer'}} onClick={()=>{handleDeleteTask(idx)}}/></td>
            </tr>);
}

export default ListItem;