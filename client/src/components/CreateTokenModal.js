import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CreateTokenModal = ({ show, handleClose, handleCreateCouponSubmit }) => {
  const [couponInput, setCouponInput] = React.useState({
    _name: '',
    _symbol: '',
    _totalSupply: '',
  });

  const handleChange = (e) => {
    setCouponInput({
      ...couponInput,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Coupon Token</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formCouponName'>
            <Form.Label>Coupon Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Coupon Name'
              name='couponName'
              value={couponInput._name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId='formCouponSymbol'>
            <Form.Label>Coupon Symbol</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Coupon Symbol'
              name='couponSymbol'
              value={couponInput._symbol}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId='formCouponSupply'>
            <Form.Label>Coupon Supply</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Coupon Supply'
              name='couponSupply'
              value={couponInput._totalSupply}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleCreateCouponSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTokenModal;
