import React, { useEffect, useState, useContext } from 'react';
import appContext from '../context/AppContext';
import VendorCard from './VendorCard';

const VendorsList = ({ account, contract }) => {
  const [vendors, setVendors] = useState([]);
  const { newVendor } = useContext(appContext);

  const handleAddVendor = (newVendor) => {
    if (!newVendor) {
      return;
    }
    console.log(newVendor, 'handle newVendor');
    setVendors([...vendors, newVendor]);
  };

  useEffect(() => {
    handleAddVendor(newVendor);
  }, [newVendor]);

  return (
    <div>
      <h1>Vendors List</h1>
      {vendors.map(
        (vendor) =>
          vendor && (
            <VendorCard
              key={vendor.vendorId}
              account={account}
              contract={contract}
              vendor={vendor}
            />
          )
      )}
    </div>
  );
};
export default VendorsList;
