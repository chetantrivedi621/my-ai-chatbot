import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([]);

  return (
    <ChatContext.Provider value={{ chatHistory, setChatHistory }}>
      {children}
    </ChatContext.Provider>
  );
};
