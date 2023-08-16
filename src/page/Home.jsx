import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import '../index.css';
import List from "../component/list";
function removeElementAtIndex(array, index) {
    if (index < 0 || index >= array.length) {
      console.error("Index out of bounds");
      return;
    }
    
    array.splice(index, 1);
}
const Home = () =>{
    const [taskList,setTaskList] = useState([]);
    const [status,setStatus] = useState(0);
    const [iD, setID] = useState(-1);
    const [task, setTask] = useState("");

    const handleAddTask = (task) =>{
        /* Add new task to <taskList> */
        console.log(taskList);
        setTaskList([...taskList, {status:0,task:task}]);

    }
    const handleDeleteTask = (idx) =>{
        /* Remove <id> Task from <taskList> */
        console.log(idx,taskList.length);
        const dummy = taskList.filter((_, i) => i !== idx);
        setTaskList([...dummy]);
        // setTaskList([...dummy]);
    }
    const handleUpdateTask = () =>{
        /* Update <id> task from taskList*/
        taskList[iD].task = task;
        setTaskList([...taskList]);
    }
    const handleChecked = (idx)=>{
        taskList[idx].status = 1;
        console.log(taskList[idx]);
        setTaskList([...taskList]);
        setStatus(0);
    }
    const handleEnter = (e) =>{
        if(e.key==="Enter" && status===0){
            handleAddTask(e.target.value);
            document.getElementById("Task").value = "";
        }else if(e.key==="Enter" && status===1){
            handleUpdateTask();
            setStatus(0);
        }
    }
    const handleMakeUpdate = (val, id ,status) =>{
        setTask(val);
        setID(id);
        setStatus(status);
    }
    return (<>
    <Container style={{backgroundColor:'#2F8BAF', width:'1450px', height:'1600px',margin:'0',paddingTop:'20%',paddingLeft:'25%'}} fluid>
        <div className="task-card">
            <h1>My Todo</h1>
            <input placeholder="Input task name and then enter to add" type="text" name="Task" id="Task" className="task-field" onKeyPress={handleEnter}/>
            <hr className="list-end"/>
            <List taskList={taskList} status={status} iD={iD} handleChecked={handleChecked} handleDeleteTask={handleDeleteTask} handleEnter={handleEnter} task={task} handleMakeUpdate={handleMakeUpdate} setTask={setTask}/>
        </div>
    </Container>
    </>);
}

export default Home;