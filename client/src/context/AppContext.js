import React, { useState, useEffect } from 'react';

const appContext = React.createContext(null);

export const AppContextProvider = ({ contract, account, children }) => {
  const [productsList, setProductsList] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendorsIdList, setVendorsIdList] = useState([]);

  const [isVendor, setIsVendor] = useState(false);

  //check if the account[0] is already create a token
  const checkIfAccountHasToken = async (e) => {
    if (!contract) {
      return;
    }
    if (!account) {
      return;
    }
    try {
      const response = await contract.methods
        .checkVendorExist(account[0])
        .call();
      if (response) {
        //should get the vendorInfo from api
        setIsVendor(true);
        return true;
      }
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  const addVendorEventHandler = () => {
    localStorage.getItem('vendorsIdList') &&
      setVendorsIdList(JSON.parse(localStorage.getItem('vendorsIdList')));
  };

  useEffect(() => {
    localStorage.getItem('vendorsIdList') &&
      setVendorsIdList(JSON.parse(localStorage.getItem('vendorsIdList')));
    window.addEventListener('newVendorCreated', addVendorEventHandler, false);
  }, []);

  useEffect(() => {
    checkIfAccountHasToken();
  }, [account, contract]);

  return (
    <appContext.Provider
      value={{
        productsList,
        setProductsList,
        selectedVendor,
        setSelectedVendor,
        vendorsIdList,
        setVendorsIdList,
        isVendor,
        setIsVendor,
      }}>
      {children}
    </appContext.Provider>
  );
};
export default appContext;
