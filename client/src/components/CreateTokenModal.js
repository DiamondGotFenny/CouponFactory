import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const CreateTokenModal = ({ show, handleClose, onHide }) => {
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

  const handleCreateCouponSubmit=()=>{
    console.log(couponInput);
  }

  return (
    <Modal show={show} onHide={onHide}>
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
              name='_name'
              value={couponInput._name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId='formCouponSymbol'>
            <Form.Label>Coupon Symbol</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Coupon Symbol'
              name='_symbol'
              value={couponInput._symbol}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId='formCouponSupply'>
            <Form.Label>Coupon Supply</Form.Label>
            <Form.Control
              type="number"
              placeholder='Enter Coupon Supply'
              name='_totalSupply'
              value={couponInput._totalSupply}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
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
