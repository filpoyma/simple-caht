import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthenticated } from "../../store/slice";

const AuthRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(selectAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
