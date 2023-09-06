import styled from "styled-components";

export const StyledMessageBox = styled.div`
  background-color: #f0f0f0;
  margin-bottom: 8px;
  width: 30%;
  padding: 12px;
  display: flex;
`;

export const StyledName = styled.p`
  margin-bottom: 6px;
  color: ${({ senderName, currentUserName }) =>
    senderName === currentUserName ? "#BFDB38" : "#00425A"};
`;

export const StyledMessage = styled.p`
  margin-left: 8px;
`;

export const StyledPlaceholder = styled.div`
  background-color: ${({ senderName, currentUserName }) =>
    senderName === currentUserName ? "#BFDB38" : "#00425A"};
  color: #fff;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

export const WrapperContainer = styled.div`
  padding: 0px 12px;
  max-width: 1280px;
  margin: 0 auto;
`;
