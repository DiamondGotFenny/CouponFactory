import React, { useState } from 'react';

const appContext = React.createContext(null);

export const AppContextProvider = ({ children }) => {
  const [productsList, setProductsList] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [newVendor, setNewVendor] = useState(null);

  return (
    <appContext.Provider
      value={{
        productsList,
        setProductsList,
        selectedVendor,
        setSelectedVendor,
        newVendor,
        setNewVendor,
      }}>
      {children}
    </appContext.Provider>
  );
};
export default appContext;
