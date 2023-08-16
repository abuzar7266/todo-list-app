import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import List from "../component/list";
import '../asset/css/home.css';
const Home = () =>{
    const [taskList,setTaskList] = useState([]);
    const [task, setTask] = useState("");
    return (<>
    <Container className="container" fluid>
        <form action="" onSubmit={(e)=>{
            e.preventDefault();
            setTaskList([...taskList, {id:`${taskList.length+1}`, status:0,task:task}]);
            setTask("");
        }}>
        <div className="task-card">
            <h1>My Todo</h1>
            <input placeholder="Input task name and then enter to add" type="text" name="Task" id="Task" className="task-field" 
                value={task}
                onChange={(e)=>{
                    setTask(e.target.value);
                }}
            />
            <hr className="list-end"/>
            <List taskList={taskList} setTaskList={setTaskList}/>
        </div>
        </form>
    </Container>
    </>);
}

export default Home;