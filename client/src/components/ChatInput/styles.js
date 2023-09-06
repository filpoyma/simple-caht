import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledInput = styled.input`
  width: 80%;
  padding: 10px;
  margin-right: 10px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.28);
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.41),
    0 1px 1px rgba(255, 255, 255, 0.38);
  word-wrap: break-word;
  white-space: pre-wrap;
`;
