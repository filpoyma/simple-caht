import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthenticated, selectUsername } from "../../store/slice";
import {
  RightContainer,
  StyledNav,
  StyledTitle,
  StyledWelcome,
} from "./styles";
import { Button } from "../commonStyles";
import { logOut } from "../../store/asyncThunk";

const NavBar = () => {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  const isAuth = useSelector(selectAuthenticated);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <StyledNav>
      <h1>
        <StyledTitle to="/">simple chatr</StyledTitle>
      </h1>
      {isAuth && (
        <RightContainer>
          <StyledWelcome>
            <p>Welcome {username}</p>
          </StyledWelcome>
          <Button onClick={handleLogout}>Log Out</Button>
        </RightContainer>
      )}
    </StyledNav>
  );
};

export default NavBar;
