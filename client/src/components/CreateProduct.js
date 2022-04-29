import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CreateProduct = ({ show, handleClose, handleCreateProductSubmit }) => {
  //create a state object to store the values of the form
  const [productInput, setProductInput] = React.useState({
    name: '',
    id: null,
    price: null,
    stock: null,
  });

  //create a function to handle the change of the form
  const handleChange = (e) => {
    //set the state of the productInput object to the value of the input
    setProductInput({
      ...productInput,
      [e.target.name]: e.target.value,
    });
  };

  //create a function to handle the submit of the form
  const handleSubmit = (e) => {
    //prevent the default behavior of the submit
    e.preventDefault();
    //call the handleCreateProductSubmit function with the productInput object as an argument
    handleCreateProductSubmit(productInput);
  };

  //return the modal component with the form and the buttons
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Name"
              name="name"
              value={productInput.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formProductId">
            <Form.Label>Product ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Product ID"
              name="id"
              value={productInput.id}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formProductPrice">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Product Price"
              name="productPrice"
              value={productInput.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formProductQuantity">
            <Form.Label>Product Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Product Quantity"
              name="stock"
              value={productInput.stock}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateProduct;
