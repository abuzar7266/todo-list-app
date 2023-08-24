import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { connect, useDispatch } from "react-redux";
import * as yup from "yup";
import { refresh, signup } from "redux/feature/auth/authSlice";

const schemaSignup = yup
  .object({
    username: yup.string().min(5).max(16).required(),
    password: yup.string().min(5).max(16).required(),
    email: yup.string().email().required(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
  })
  .required();
const mapStateToProps = (state) => ({
  auth: state.auth,
});
const Signup = (props) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(schemaSignup),
  });
  useEffect(() => {
    if (localStorage.getItem("token")) window.location = "/todo";
    if (props.auth.state === 1) alert(props.auth.msg);
    else if (props.auth.state === 200) {
      alert(props.auth.msg);
      dispatch(refresh());
      props.setAuth();
    }
  }, [props.auth]);
  const onSubmitHandler = (e) => {
    dispatch(signup(e));
  };
  useEffect(() => {
    if (props.auth.state == 3) {
      props.setAuth();
    }
  }, [props.auth.state]);
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h1 className="header-form">Signup</h1>
          {!isDirty ||
            (!isValid && (
              <p className="alert alert-sm alert-danger">
                Fill the form correctly
              </p>
            ))}
        </div>
        <form action="" onSubmitCapture={handleSubmit(onSubmitHandler)}>
          <div className="card-body">
            <input
              type="text"
              className="demographic-field"
              placeholder="First Name"
              {...register("firstname")}
            />
            <input
              type="text"
              className="demographic-field"
              placeholder="Last Name"
              {...register("lastname")}
            />
            <input
              type="text"
              className="demographic-field"
              placeholder="Username"
              {...register("username")}
            />
            <input
              type="text"
              className="demographic-field"
              placeholder="Email"
              {...register("email")}
            />
            <input
              type="password"
              className="demographic-field"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          <input
            type="submit"
            className="submit"
            value="Signup"
            disabled={!isDirty || !isValid}
          />
        </form>
        <div className="submit-btn">
          <button
            className="move-btn"
            onClick={() => {
              props.setAuth();
            }}
          >
            Go to login page
          </button>
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps)(Signup);
