import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  selectError,
  selectAuthenticated,
} from "../../store/slice";
import { LoginContainer } from "./styles";
import { Button, ErrorMessage, StyledForm, StyledInput } from "../commonStyles";
import { loginUser } from "../../store/asyncThunk";

const SignIn = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isAuth = useSelector(selectAuthenticated);

  useEffect(() => {
    if (isAuth) history.push("/");
  }, [isAuth]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };
    dispatch(loginUser(data));
    setEmail("");
    setPassword("");
  };

  return (
    <LoginContainer>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <StyledInput
          type="text"
          placeholder="Email"
          name={email}
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />
        <StyledInput
          type="password"
          placeholder="Password"
          name={password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ErrorMessage error={error}>
          {error} {"\u00A0"}
        </ErrorMessage>
        <Button type="submit" disabled={!email || !password}>
          Log In
        </Button>
      </StyledForm>
      <p>
        Don't have an account?{" "}
        <Link to="/register" onClick={() => dispatch(clearErrors())}>
          Click here to sign up
        </Link>
      </p>
    </LoginContainer>
  );
};

export default SignIn;
