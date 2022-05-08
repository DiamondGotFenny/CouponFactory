import React, { useState } from 'react';

const appContext = React.createContext(null);

export const AppContextProvider = ({ children }) => {
  const [productsList, setProductsList] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendorAccountsList, setVendorAccountsList] = useState([]);

  return (
    <appContext.Provider
      value={{
        productsList,
        setProductsList,
        selectedVendor,
        setSelectedVendor,
        vendorAccountsList,
        setVendorAccountsList,
      }}>
      {children}
    </appContext.Provider>
  );
};
export default appContext;
