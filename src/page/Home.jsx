import React, { useEffect } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import List from "../component/list";
import '../asset/css/home.css';
import { addTask } from "../redux/feature/todo-list/todoSlice";
import { useDispatch, useSelector } from "react-redux";
const Home = () =>{
    const taskList = useSelector((state)=> state.todo.taskList );
    const dispatch = useDispatch();
    const [task, setTask] = useState("");
    useEffect(()=>{
        console.log(taskList);
    },[taskList])
    return (<>
    <Container className="container" fluid>
        <form action="" onSubmit={(e)=>{
            e.preventDefault();
            dispatch(addTask(task));
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
            <List taskList={taskList} />
        </div>
        </form>
    </Container>
    </>);
}

export default Home;