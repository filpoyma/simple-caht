import React from "react";
import PropTypes from "prop-types";
import {
  StyledMessage,
  StyledMessageBox,
  StyledName,
  StyledPlaceholder,
} from "./styles";

const MessageBox = ({
  senderName = "",
  message = "",
  currentUserName = "",
}) => {
  return (
    <StyledMessageBox>
      <StyledPlaceholder
        senderName={senderName}
        currentUserName={currentUserName}
      >
        <h3>{senderName.charAt(0)}</h3>
      </StyledPlaceholder>
      <div>
        <StyledName senderName={senderName} currentUserName={currentUserName}>
          {senderName}
        </StyledName>
        <StyledMessage>{message}</StyledMessage>
      </div>
    </StyledMessageBox>
  );
};

MessageBox.propTypes = {
  name: PropTypes.string,
  messge: PropTypes.string,
  currentUser: PropTypes.string,
};

export default MessageBox;
