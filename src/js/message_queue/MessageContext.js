import React, { createContext, useState } from 'react';

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [abnormalMessages, setAbnormalMessages] = useState([]);
  const [normalMessages, setNormalMessages] = useState([]);

  const contextValue = {
    abnormalMessages,
    setAbnormalMessages,
    normalMessages,
    setNormalMessages
  };

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageProvider };