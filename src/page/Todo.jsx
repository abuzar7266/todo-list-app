import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import List from "component/list";
import { addTask, fetchTodo } from "redux/feature/todo-list/todoSlice";
import LogoutIcon from '@mui/icons-material/Logout';
import "asset/css/todo.css";

const schema = yup
  .object({
    task: yup.string().min(5).max(30).required(),
  })
  .required();
const mapStateToProps = (state) => ({
    taskList: state.todo.taskList
});

const Todo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(()=>{
    if(localStorage.getItem("token")){
      
    }else{
      navigate('/');
    }
    dispatch(fetchTodo());
  },[])

  const onSubmitHandler = (e) => {
    dispatch(addTask(e["task"]));
    reset();
  };
  const handleLogout = () =>{
    localStorage.setItem("login", false);
    localStorage.removeItem("token");
    navigate('/auth');
  }
  return (
    <>{ localStorage.getItem("token") && <div>
    <span><LogoutIcon style={{marginLeft: '75%', marginTop:'5%', cursor: 'pointer'}} onClick={handleLogout}/></span>
      <Container className="container" fluid>
        <form action="" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="task-card">
            <h1 className="task-card-heading">My Todo</h1>
            <input
              placeholder="Input task name and then enter to add"
              type="text"
              className="task-field"
              {...register("task")}
            />
            <p className="text-danger">{errors.task?.message}</p>
            <hr className="list-endline" />
            <List/>
          </div>
        </form>
      </Container>
    </div>}
    </>
  );
};

export default connect(mapStateToProps)(Todo);
