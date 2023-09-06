import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MessageBox from "../elements/MessageBox";

const RenderChat = styled.div`
  height: 511px;
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding-top: 8px;
`;

const ChatView = ({ chatData, currentUserName }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <RenderChat>
      {chatData.map((chat, i) => {
        return (
          <MessageBox
            key={i}
            senderName={chat.sender?.name}
            message={chat.message}
            currentUserName={currentUserName}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </RenderChat>
  );
};

ChatView.propTypes = {
  chatData: PropTypes.arrayOf(PropTypes.shape),
  currentUser: PropTypes.string,
};

export default ChatView;
