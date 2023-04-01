import { createContext, useContext, useState } from 'react';

const TerminalContext = createContext({});

const TerminalContextProvider = ({ children }) => {
  const [terminalEdit, setTerminalEdit] = useState(null);

  const handleCancel = () => setTerminalEdit(null)
  return (
  <TerminalContext.Provider
    value={{
      terminalEdit,
      setTerminalEdit,
      handleCancel
    }}
  >
    {children}
  </TerminalContext.Provider>
  );
};

export default TerminalContextProvider;

export const useTerminalContext = () => useContext(TerminalContext)