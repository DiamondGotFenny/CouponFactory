import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import appContext from '../context/AppContext';

const CreateTokenModal = ({ show, onHide, contract, account }) => {
  const { vendorsIdList, setVendorsIdList } = useContext(appContext);

  const [couponInput, setCouponInput] = React.useState({
    _name: '',
    _symbol: '',
    _totalSupply: '',
    _vendorName: '',
  });

  const handleChange = (e) => {
    setCouponInput({
      ...couponInput,
      [e.target.name]: e.target.value,
    });
  };

  const generateId = (account) => {
    const startString = account.substring(0, 4);
    const id = Math.random().toString(36).substring(2, 15) + startString;
    return id;
  };
  const handleCreateCouponSubmit = async (e) => {
    e.preventDefault();
    if (!contract) {
      return;
    }
    if (!account) {
      return;
    }
    const id = generateId(account[0]);
    try {
      const response = await contract.methods
        .createToken(
          couponInput._name,
          couponInput._symbol,
          couponInput._totalSupply,
          id,
          couponInput._vendorName
        )
        .send({ from: account[0] });
      setVendorsIdList([...vendorsIdList, id]);
      //get to know why the id didn't get saved in local storage
      console.log(vendorsIdList, 'vendorsIdList created');
      localStorage.setItem('vendorsIdList', JSON.stringify(vendorsIdList));
      onHide();
      return;
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
          <Form.Group controlId='formVendorName'>
            <Form.Label>Vendor Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Vendor Name'
              name='_vendorName'
              value={couponInput._vendorName}
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
