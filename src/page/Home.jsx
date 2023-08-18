import React, { useEffect } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import List from "component/list";
import { addTask, fetchTodo } from "redux/feature/todo-list/todoSlice";
import "asset/css/home.css";
const Home = () => {
  const taskList = useSelector(state => state.todo.taskList);
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  useEffect(() => {
    dispatch(fetchTodo());
  }, []);
  const handleTaskSubmit = e => {
    e.preventDefault();
    dispatch(addTask(task));
    setTask("");
  };
  return (
    <>
      <Container className="container" fluid>
        <form action="" onSubmit={handleTaskSubmit}>
          <div className="task-card">
            <h1 className="task-card-heading">My Todo</h1>
            <input
              placeholder="Input task name and then enter to add"
              type="text"
              name="Task"
              id="Task"
              className="task-field"
              value={task}
              onChange={e => {
                setTask(e.target.value);
              }}
            />
            <hr className="list-endline" />
            <List taskList={taskList} />
          </div>
        </form>
      </Container>
    </>
  );
};

export default Home;
