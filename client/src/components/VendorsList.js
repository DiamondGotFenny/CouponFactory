import React, { useEffect, useState, useContext } from 'react';
import appContext from '../context/AppContext';
import VendorCard from './VendorCard';

const VendorsList = ({ account, contract }) => {
  const { vendorsIdList } = useContext(appContext);

  const [vendorsAccount, setVendorsAccount] = useState([]);

  const getVendorsAccount = async (vendorsIdList) => {
    if (!contract) {
      return;
    }

    const vendorsAcc = await Promise.all(
      vendorsIdList.map(async (vendorId) => {
        const vendorAdrs = await contract.methods
          .getVendorAddress(vendorId)
          .call();
        return vendorAdrs;
      })
    );
    setVendorsAccount(vendorsAcc);
  };
  useEffect(() => {
    getVendorsAccount(vendorsIdList);
  }, [vendorsIdList, contract]);
  return (
    <div>
      <h1>Vendors List</h1>
      {vendorsAccount.map(
        (vAccount) =>
          vAccount && (
            <VendorCard
              key={vAccount}
              account={account}
              contract={contract}
              vendorAccount={vAccount}
            />
          )
      )}
    </div>
  );
};
export default VendorsList;
