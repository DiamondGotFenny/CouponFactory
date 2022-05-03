import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AddProductModal = ({ show, onHide, contract, account }) => {
  const [productInput, setProductInput] = React.useState({
    name: '',
    id: 0,
    price: 0,
    stock: 0,
  });

  const handleChange = (e) => {
    setProductInput({
      ...productInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    if (!contract) {
      alert('can not get the contract!');
      return;
    }
    if (!account) {
      alert('can not get the account!');
      return;
    }

    try {
      const response = await contract.methods
        .setProduct(
          productInput.name,
          productInput.id,
          productInput.price,
          productInput.stock
        )
        .send({ from: account[0] });
      console.log(response);
      onHide();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formProductName'>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type='text'
              name='name'
              placeholder='Enter product name'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId='formProductId'>
            <Form.Label>Product Id</Form.Label>
            <Form.Control
              type='number'
              name='id'
              placeholder='Enter product Id'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId='formProductPrice'>
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type='number'
              name='price'
              placeholder='Enter product price'
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId='formProductStock'>
            <Form.Label>Product Stock</Form.Label>
            <Form.Control
              type='number'
              name='stock'
              placeholder='Enter product stock'
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
        <Button
          variant='primary'
          type='submit'
          onClick={handleAddProductSubmit}>
          Add Product
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AddProductModal;
