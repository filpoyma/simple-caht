import React from "react";
import PropTypes from "prop-types";
import { WrapperContainer } from "./styles";

const Wrapper = ({ children }) => {
  return <WrapperContainer>{children}</WrapperContainer>;
};

Wrapper.propTypes = {
  children: PropTypes.node,
};

export default Wrapper;
