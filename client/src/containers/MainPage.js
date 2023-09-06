import React from "react";
import { useSelector } from "react-redux";
import { selectAuthenticated } from "../store/slice";
import { Button } from "../components/commonStyles";
import { ButtonContainer, MainPageContainer, StyledTitle } from "./styles";

const MainPage = ({ history }) => {
  const isAuth = useSelector(selectAuthenticated);
  return (
    <MainPageContainer>
      <StyledTitle>simple chat</StyledTitle>
      <p>Real-time online chat application for you and your friends</p>
      <ButtonContainer>
        {!isAuth ? (
          <>
            <Button onClick={() => history.push("/register")}>Sign Up</Button>
            <Button onClick={() => history.push("/login")}>Login</Button>
          </>
        ) : (
          <Button onClick={() => history.push("/messenger")}>
            Start Messaging
          </Button>
        )}
      </ButtonContainer>
    </MainPageContainer>
  );
};

export default MainPage;
