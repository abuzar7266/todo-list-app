import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Login from "component/login";
import Signup from "component/signup";
import "asset/css/auth.css";
const Auth = () => {
  const [state, setState] = useState(0);
  const setAuth = () => {
    setState(!state);
  };
  return (
    <>
      <Container className="container" fluid>
        {state ? <Signup setAuth={setAuth} /> : <Login setAuth={setAuth} />}
      </Container>
    </>
  );
};

export default Auth;
