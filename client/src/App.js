import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { useIdleTimer } from "react-idle-timer";
import GlobalStyles from "./utils/GlobalStyles";

import Messenger from "./containers/Messenger";
import MainPage from "./containers/MainPage";

import { Container } from "./components/commonStyles";
import { SignUp, AuthRoute, SignIn } from "./components/Auth/";
import NavBar from "./components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./store/asyncThunk";
import { selectAuthenticated } from "./store/slice";

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectAuthenticated);
  useIdleTimer({
    onAction: (event) => {
      if (isAuth) dispatch(refreshToken());
    },
    debounce: 3000,
  });

  return (
    <BrowserRouter>
      <GlobalStyles />
      <NavBar />
      <Container>
        <Route exact path="/" component={MainPage} />
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={SignIn} />
        <AuthRoute path="/messenger" component={Messenger} />
      </Container>
    </BrowserRouter>
  );
};

export default App;
