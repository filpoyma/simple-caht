import styled from "styled-components";

export const StyledForm = styled.form`
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const StyledInput = styled.input`
  border: 1px solid lightgray;
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;
  min-height: 23px;
  -webkit-appearance: none;
  margin-right: 8px;
`;

export const ErrorMessage = styled.p`
  color: red;
  visibility: ${({ error }) => (error ? "visible" : "hidden")};
`;

export const Button = styled.button`
  font-family: "Helvetica Neue", sans-serif;
  cursor: pointer;
  display: inline-block;
  padding: 5px 10px;
  font-size: 14px;
  background: #1f8a70;
  color: #fff;
  border-radius: 6px;
  border: 1px solid transparent;
  -webkit-appearance: none;
  transition: 100ms linear;
  min-width: 100px;

  &:hover {
    background: #156450;
  }
`;

export const Container = styled.div`
  height: calc(100vh - 64px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
