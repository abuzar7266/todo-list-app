import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Login from "component/login";
import Signup from "component/signup";
import "asset/css/auth.css";
const Auth = () => {
  const [onLogged, setOnLogged] = useState(0);
  const setAuth = () => {
    setOnLogged(!onLogged);
  };
  return (
    <>
      <Container className="container" fluid>
        {onLogged ? <Signup setAuth={setAuth} /> : <Login setAuth={setAuth} />}
      </Container>
    </>
  );
};

export default Auth;
