import React, { useState, useEffect } from 'react';

const appContext = React.createContext(null);

export const AppContextProvider = ({ children }) => {
  const [productsList, setProductsList] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendorsIdList, setVendorsIdList] = useState([]);

  useEffect(() => {
    console.log(localStorage.getItem('vendorsIdList'), 'get local storage');
    localStorage.getItem('vendorsIdList') &&
      setVendorsIdList(JSON.parse(localStorage.getItem('vendorsIdList')));
  }, []);
  console.log(vendorsIdList, 'vendorsIdList appContext');
  return (
    <appContext.Provider
      value={{
        productsList,
        setProductsList,
        selectedVendor,
        setSelectedVendor,
        vendorsIdList,
        setVendorsIdList,
      }}>
      {children}
    </appContext.Provider>
  );
};
export default appContext;
