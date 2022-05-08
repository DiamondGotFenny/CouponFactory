import React, { useEffect, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import appContext from '../context/AppContext';
import { useParams } from 'react-router-dom';
const ProductsList = ({ account, contract }) => {
  //write a usestate to store the products
  const [products, setProducts] = useState([]);

  //use account instead of id in url, then use url to query the products
  const { vendorId } = useParams();
  const [vendorAdrs, setVendorAdrs] = useState('');
  const [deleteAcess, setDeleteAcess] = useState(false);
  console.log(vendorId, 'vendorId');

  const getVendorAddress = async (vendorId) => {
    if (!contract) {
      return;
    }
    if (!account || !vendorId) {
      return;
    }
    try {
      const response = await contract.methods.getVendorAddress(vendorId).call();
      console.log(response, 'vendor address');
      setVendorAdrs(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductsList = async () => {
    if (!contract) {
      return;
    }

    if (!vendorAdrs) {
      return;
    }
    try {
      const response = await contract.methods.getProducts(vendorAdrs).call();
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

  const accessDelete = async () => {
    if (!vendorAdrs || account) return;
    if (account[0] === vendorAdrs) {
      setDeleteAcess(true);
    }
    setDeleteAcess(false);
  };

  useEffect(() => {
    getProductsList();
  }, [contract, account, vendorAdrs]);
  useEffect(() => {
    getVendorAddress(vendorId);
  }, [vendorId, account]);
  useEffect(() => {
    accessDelete();
  }, [account]);
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
                {deleteAcess ? (
                  <Button
                    variant='danger'
                    onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </Button>
                ) : (
                  <Button variant='success'>Use Coupon</Button>
                )}
              </Card.Body>
            </Card>
          )
      )}
    </div>
  );
};
export default ProductsList;
