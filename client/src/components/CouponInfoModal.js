import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

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
      const response = await contract.methods
        .getVendorBasicInfo(account[0])
        .call();
      const { _name, _symbol, _totalSupply } = response;
      console.log(response, 'coupon');
      setCoupon({
        _name,
        _symbol,
        _totalSupply,
      });
      onHide();
    } catch (error) {
      console.log(error);
    }
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
        <ListGroup>
          <ListGroup.Item variant='primary'>
            <label>Coupon Name:</label> {coupon._name}
          </ListGroup.Item>
          <ListGroup.Item variant='success'>
            <label>Coupon Symbol:</label> {coupon._symbol}
          </ListGroup.Item>
          <ListGroup.Item variant='info'>
            <label> Coupon Supply:</label> {coupon._totalSupply}
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CouponInfoModal;
