import React from 'react';
import ListItem from './listItem';
const List = ({taskList, status, iD, handleChecked, handleDeleteTask,handleMakeUpdate,task, handleEnter, setTask}) =>{
    return (<>
            <table className="table table-sm" style={{textAlign:'left',fontSize:'smaller'}} >
                <tbody style={{border:'none',borderBottom:'1px solid black'}}>
                    {
                        taskList.map((data,idx)=>{
                            return (<>
                                <ListItem task={task} status={status} iD={iD} 
                                setTask={setTask} handleEnter={handleEnter} 
                                handleMakeUpdate={handleMakeUpdate} handleDeleteTask={handleDeleteTask} 
                                handleChecked={handleChecked} data={data} idx={idx}/>
                            </>)
                        })
                    }
                </tbody>
            </table>
    </>)
}

export default List;