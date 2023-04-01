import { createContext, useContext, useState } from 'react';

const RouteContext = createContext({});

const RouteContextProvider = ({ children }) => {
  const [routeEdit, setRouteEdit] = useState(null);

  const handleCancel = () => setRouteEdit(null)
  
  return (
  <RouteContext.Provider
    value={{
      routeEdit,
      setRouteEdit,
      handleCancel
    }}
  >
    {children}
  </RouteContext.Provider>
  );
};

export default RouteContextProvider;

export const useRouteContext = () => useContext(RouteContext)