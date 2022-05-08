import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';

const VendorCard = ({ account, contract, vendorAccount }) => {
  const [vendor, setVendor] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [productCount, setProductCount] = useState(0);

  const getProductsCounts = async (vendorAccount) => {
    if (!contract) {
      return;
    }
    if (!vendorAccount) {
      return;
    }
    try {
      const productsArray = await contract.methods
        .getProductIDList(vendorAccount)
        .call();
      console.log(productsArray, 'productsArray');
      setProductCount(productsArray.length);
    } catch (error) {
      console.log(error);
    }
  };

  const checkTokenBalance = async (vendorAccount) => {
    if (!contract) {
      return;
    }
    if (!vendorAccount || account[0]) {
      return;
    }
    try {
      const tokenBalance = await contract.methods
        .balanceOf(vendorAccount, account[0])
        .call();
      setTokenBalance(tokenBalance);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCoupon = async (vendorAccount) => {
    if (!contract) {
      return;
    }
    if (!vendorAccount || account[0]) {
      return;
    }
    const tokenBalance = await checkTokenBalance(vendorAccount);
    if (tokenBalance > 1) {
      alert('You have already got a coupon');
      return;
    }
    try {
      await contract.methods
        .getCoupon(vendorAccount, account[0])
        .send({ from: account[0] });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetVendorInfo = async (vendorAccount) => {
    if (!contract) {
      return;
    }
    if (!account) {
      return;
    }
    try {
      const response = await contract.methods
        .getVendorBasicInfo(vendorAccount)
        .call();
      console.log(response, 'vendorInfo');
      setVendor(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetVendorInfo(vendorAccount);
    getProductsCounts(vendorAccount);
    checkTokenBalance(vendorAccount);
  }, [vendorAccount, account, contract]);

  /* useEffect(() => {
    checkTokenBalance(vendor.vendorAddress);
    getProductsCounts(vendor.vendorAccount);
  }, [vendor.vendorAddress, account]); */

  return (
    <>
      {vendor && (
        <Card key={vendor._vendorId} style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{vendor._vendorName}</Card.Title>
            <Card.Text>
              <b>Vendor Name:</b> {vendor._vendorName}
            </Card.Text>
            <Card.Text>
              <b>Vendor Account:</b> {vendorAccount}
            </Card.Text>
            <Card.Text>
              <b>Coupon Name:</b> {vendor._name}
            </Card.Text>
            <Card.Text>
              <b>Coupon Symbol:</b> {vendor._symbol}
            </Card.Text>
            <Card.Text>
              <b>Coupon Supply:</b> {vendor._totalSupply}
            </Card.Text>
            <Card.Text>
              <b>Products:</b> {productCount}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Link to={`/${vendor._vendorId}/productsList`}>
              <Button variant='info'>View Producuts</Button>
            </Link>
            {tokenBalance > 1 ? (
              <Card.Text>`Your Token balance: ${tokenBalance}`</Card.Text>
            ) : (
              <Button
                variant='success'
                onClick={() => handleGetCoupon(vendorAccount)}>
                Get Coupon
              </Button>
            )}
          </Card.Footer>
        </Card>
      )}
    </>
  );
};

export default VendorCard;
