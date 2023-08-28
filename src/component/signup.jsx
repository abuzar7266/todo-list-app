import React from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
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
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  })
  .required();
const mapStateToProps = (state) => ({
  user: state.user,
});
const Signup = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(schemaSignup),
  });


  useEffect(()=>{
    if (localStorage.getItem("token")) navigate('/todo');
  },[])
  useEffect(() => {
    if (props.user.state === 3) {
      dispatch(refresh());
      window.location = '/auth';
    }
  }, [props.user]);


  const onSubmitHandler = (e) => {
    dispatch(signup(e));
  };
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
              {...register("firstName")}
            />
            <input
              type="text"
              className="demographic-field"
              placeholder="Last Name"
              {...register("lastName")}
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
