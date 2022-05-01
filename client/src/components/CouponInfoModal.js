import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CouponInfoModal = ({ show, onHide, contract, account }) => {
  const [coupon, setCoupon] = React.useState({
    _name: '',
    _symbol: '',
    _totalSupply: '',
  });

  const handleGetCouponInfo = async () => {
    if (!contract) {
      return;
    }
    if (!account) {
      return;
    }
    try {
      const response = await contract.methods.getTokenInfo(account[0]).call();
      console.log(response);
      setCoupon(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetToken = () => {
    console.log('reset token');
  };

  useEffect(() => {
    handleGetCouponInfo();
  }, [contract, account]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Coupon info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <li>Coupon Name: {coupon._name}</li>
        <li>Coupon Symbol: {coupon._symbol}</li>
        <li>Coupon Supply: {coupon._totalSupply}</li>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
        <Button variant='primary' onClick={handleResetToken}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CouponInfoModal;
