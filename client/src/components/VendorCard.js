import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
const VendorCard = ({ account, contract, vendor }) => {
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
      console.log(tokenBalance, 'tokenBalance');
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
      const response = await contract.methods
        .getCoupon(vendorAccount, account[0])
        .send({ from: account[0] });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkTokenBalance(vendor.vendorAddress);
    getProductsCounts(vendor.vendorAccount);
  }, [vendor.vendorAddress, account]);

  return (
    <Card key={vendor.vendorId} style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{vendor.vendorName}</Card.Title>
        <Card.Text>
          <b>Vendor Name:</b> {vendor.vendorName}
        </Card.Text>
        <Card.Text>
          <b>Vendor Account:</b> {vendor.vendorAccount}
        </Card.Text>
        <Card.Text>
          <b>Coupon Name:</b> {vendor.couponInfo.couponName}
        </Card.Text>
        <Card.Text>
          <b>Coupon Symbol:</b> {vendor.couponInfo.couponSymbol}
        </Card.Text>
        <Card.Text>
          <b>Coupon Supply:</b> {vendor.couponInfo.couponTotalSupply}
        </Card.Text>
        <Card.Text>
          <b>Products:</b> {productCount}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Link to={`/${vendor.vendorId}/productsList`}>
          <Button variant='info'>View Producuts</Button>
        </Link>
        {tokenBalance > 1 ? (
          <Card.Text>`Your Token balance: ${tokenBalance}`</Card.Text>
        ) : (
          <Button
            variant='success'
            onClick={() => handleGetCoupon(vendor.vendorAccount)}>
            Get Coupon
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default VendorCard;
