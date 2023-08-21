import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import List from "component/list";
import { addTask, fetchTodo } from "redux/feature/todo-list/todoSlice";
import "asset/css/home.css";

const schema = yup
  .object({
    task: yup.string().min(5).max(30).required(),
  })
  .required();
const Home = () => {
  const taskList = useSelector((state) => state.todo.taskList);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    dispatch(fetchTodo());
  }, []);
  const onSubmitHandler = (e) => {
    dispatch(addTask(e["task"]));
    reset();
  };
  return (
    <>
      <Container className="container" fluid>
        <form action="" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="task-card">
            <h1 className="task-card-heading">My Todo</h1>
            <input
              placeholder="Input task name and then enter to add"
              type="text"
              s
              className="task-field"
              {...register("task")}
            />
            <p className="text-danger">{errors.task?.message}</p>
            <hr className="list-endline" />
            <List taskList={taskList} />
          </div>
        </form>
      </Container>
    </>
  );
};

export default Home;
