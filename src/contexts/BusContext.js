import { createContext, useContext, useState } from 'react';

const BusContext = createContext({});

const BusContextProvider = ({ children }) => {
  const [busEdit, setBusEdit] = useState(null);

  const handleCancel = () => setBusEdit(null)
  
  return (
  <BusContext.Provider
    value={{
      busEdit,
      setBusEdit,
      handleCancel
    }}
  >
    {children}
  </BusContext.Provider>
  );
};

export default BusContextProvider;

export const useBusContext = () => useContext(BusContext)