import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const CreateTokenModal = ({ show, onHide, contract, account }) => {
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

  //check if the account[0] is already create a token
  const checkIfAccountHasToken = async (e) => {
    try {
      const response = await contract.methods.isVendor(account[0]).call();
      if (response) {
        alert('You already create coupon token!');
        return true;
      }
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  const handleCreateCouponSubmit = async (e) => {
    e.preventDefault();
    if (!contract) {
      return <div>can not get the contract!</div>;
    }
    //check if the accout is already created a coupon
    const isCouponCreated = await checkIfAccountHasToken();
    if (isCouponCreated) return;

    //create a new token
    try {
      const response = await contract.methods
        .createToken(
          couponInput.couponName,
          couponInput.couponSymbol,
          couponInput.couponSupply.toString()
        )
        .send({ from: account[0] });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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
              type='number'
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
