import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ProductsList = ({ account, contract }) => {
  //write a usestate to store the products
  const [products, setProducts] = useState([]);

  const getProductsList = async () => {
    if (!contract) {
      return;
    }
    if (!account) {
      return;
    }
    try {
      const response = await contract.methods.getProducts(account[0]).call();
      console.log(response);
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!contract) {
      return;
    }
    if (!account) {
      return;
    }
    try {
      await contract.methods
        .deleteProduct(productId)
        .send({ from: account[0] });
      getProductsList();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsList();
  }, [contract, account]);

  return (
    <div>
      <h1>Products List</h1>
      {products.map(
        (product) =>
          product._exist && (
            <Card key={product.id} style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  <b>Product Name:</b> {product.name}
                </Card.Text>
                <Card.Text>
                  <b>Product ID:</b> {product.id}
                </Card.Text>
                <Card.Text>
                  <b>Product Price:</b> {product.price}
                </Card.Text>
                <Card.Text>
                  <b>Product Stock:</b> {product.stock}
                </Card.Text>
                <Button
                  variant='danger'
                  onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          )
      )}
    </div>
  );
};
export default ProductsList;
