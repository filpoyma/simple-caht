import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  clearErrors,
  selectAuthenticated,
} from "../../store/slice";
import { Button, ErrorMessage, StyledForm, StyledInput } from "../commonStyles";
import { SignUpContainer } from "./styles";
import { registerUser } from "../../store/asyncThunk";

const SignUp = ({ history }) => {
  const [name, setName] = useState("");
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
    const newUser = {
      name,
      email,
      password,
    };
    dispatch(registerUser(newUser));
  };

  return (
    <SignUpContainer>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Register</h2>
        <StyledInput
          type="text"
          placeholder="Username"
          name={name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Button type="submit" disabled={!name || !email || !password}>
          Submit
        </Button>
      </StyledForm>
      <p>
        Alreay have an account?{" "}
        <Link to="/login" onClick={() => dispatch(clearErrors())}>
          Click here to login
        </Link>
      </p>
    </SignUpContainer>
  );
};

export default SignUp;
