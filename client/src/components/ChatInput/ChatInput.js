import React, { useState } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
import { StyledForm, StyledInput } from "./styles";
import { Button } from "../commonStyles";

const socket = io.connect("http://localhost:5000");

const ChatInput = ({ username, userId }) => {
  const [message, setMessage] = useState("");

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    socket.emit("Sent Message", {
      userId,
      username,
      message,
    });
    setMessage("");
  };

  return (
    <StyledForm onSubmit={handleMessageSubmit}>
      <StyledInput
        type="text"
        name="message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        label="Message"
        placeholder={`${username} says...`}
      />
      <Button disabled={!message}>Send</Button>
    </StyledForm>
  );
};

ChatInput.propTypes = {
  username: PropTypes.string,
  userId: PropTypes.string,
};

export default ChatInput;
