import React, { useEffect, useState, useContext } from 'react';
import appContext from '../context/AppContext';
import VendorCard from './VendorCard';

const VendorsList = ({ account, contract }) => {
  const { vendorAccountsList, setVendorAccountsList } = useContext(appContext);

  const generateId = (account) => {
    const startString = account.substring(0, 4);
    const id = Math.random().toString(36).substring(2, 15) + startString;
    return id;
  };
  console.log(vendorAccountsList, 'vendorAccountsList');

  useEffect(() => {
    if (!account) {
      return;
    }
    if (vendorAccountsList.length === 0) {
      setVendorAccountsList([...vendorAccountsList, account[0]]);
    }
  }, [vendorAccountsList, account]);
  return (
    <div>
      <h1>Vendors List</h1>
      {vendorAccountsList.map(
        (vendorAccount) =>
          vendorAccount && (
            <VendorCard
              key={generateId(vendorAccount)}
              account={account}
              contract={contract}
              vendorAccount={vendorAccount}
            />
          )
      )}
    </div>
  );
};
export default VendorsList;
