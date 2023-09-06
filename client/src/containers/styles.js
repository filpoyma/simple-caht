import styled from "styled-components";

export const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-around;
  margin-top: 12px;
`;

export const StyledTitle = styled.h2`
  font-size: 42px;
  margin-bottom: 12px;
  position: relative;
  //&::after {
  //  background-color: rgba(40, 167, 69, 0.8);
  //  content: "";
  //  display: block;
  //  height: 8px;
  //  position: absolute;
  //  width: 100%;
  //  top: 29px;
  //  z-index: -1;
  //}
`;

export const MessengerContainer = styled.div`
  width: 100%;
  height: 100%;
`;
