import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().min(5).max(16).required(),
    password: yup.string().min(5).max(16).required()
  })
  .required();

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty, errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (localStorage.getItem("token")) localStorage.removeItem("token");
  }, []);
  const onSubmitHandler = (e) => {
    console.log(e);
    axios
      .post("/user/login", e)
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("login", true);
          reset();
          window.location = "http://localhost:3000/todo";
        }else{
            if(!(res.data.token)){
                alert("Incorrect username or password");
            }
        }
      })
      .catch((err)=>{
        alert("Incorrect username or password");
      })
  };
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h1 className="header-form">Login</h1>
          { !isDirty || !isValid && <p className="alert alert-sm alert-danger">Username or password is not valid</p>}
        </div>
        <form action="" onSubmitCapture={handleSubmit(onSubmitHandler)}>
            <div className="card-body">
            <input
                type="text"
                className="demographic-field"
                placeholder="Username"
                {...register("username")}
            />
            <input
                type="password"
                className="demographic-field"
                placeholder="Password"
                {...register("password")}
            />
            </div>
            <input type="submit" className="submit" value="Login" disabled={!isDirty || !isValid}/>
        </form>
        <div className="submit-btn">
          <button className="move-btn" onClick={()=>{
            props.setAuth();
          }}>Go to Signup Page</button>
        </div>
      </div>
    </>
  );
};

export default Login;
