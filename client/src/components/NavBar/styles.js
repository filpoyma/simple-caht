import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledTitle = styled(Link)`
  color: black;
`;

export const StyledNav = styled.nav`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0px 20px;
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledWelcome = styled.div`
  margin-right: 8px;
`;
