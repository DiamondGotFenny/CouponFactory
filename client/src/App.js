import React, { useEffect } from 'react';
import CouponFactory from './contracts/CouponFactory.json';
import getWeb3 from './getWeb3';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const App = () => {
  const [web3Instance, setWeb3Instance] = React.useState(null);
  const [account, setAccount] = React.useState(null);
  const [contract, setContract] = React.useState(null);

  const [couponInput, setCouponInput] = React.useState({
    couponName: '',
    couponSymbol: '',
    couponSupply: 10,
  });
  const [coupon, setCoupon] = React.useState({
    couponName: '',
    couponSymbol: '',
    couponSupply: 0,
  });

  const initWeb3 = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      setWeb3Instance(web3);

      // Use web3 to get the user's accounts.
      const account = await web3.eth.getAccounts();
      console.log(account);
      setAccount(account);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CouponFactory.networks[networkId];
      const instance = new web3.eth.Contract(
        CouponFactory.abi,
        deployedNetwork && deployedNetwork.address
      );
      instance.options.address = '0x36436acA6905F30F3484faA694980f0C33Ab6e45';
      console.log(instance);
      setContract(instance);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };
  useEffect(() => {
    initWeb3();
  }, []);

  const handleCreateCouponChange = (event) => {
    setCouponInput({ ...couponInput, [event.target.name]: event.target.value });
  };

  const handleCreateCouponSubmit = async (e) => {
    e.preventDefault();
    if (!contract) {
      return <div>can not get the contract!</div>;
    }
    try {
      console.log('handleCreateCouponSubmit');
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

  const handleGetCouponInfo = async (e) => {
    e.preventDefault();
    if (!contract) {
      return <div>can not get the contract!</div>;
    }
    try {
      console.log('handleGetCouponInfo');
      const response = await contract.methods.getTokenInfo(account[0]).call();
      console.log(response);
      setCoupon(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleCreateCouponSubmit}>
        <h2>Create Coupon</h2>
        <Form.Group className='mb-3' controlId='formCouponName'>
          <Form.Label>Coupon Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Coupon Name'
            name='couponName'
            value={couponInput.couponName}
            onChange={handleCreateCouponChange}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formCouponSymbol'>
          <Form.Label>Coupon Symbol</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Coupon Symbol'
            name='couponSymbol'
            value={couponInput.couponSymbol}
            onChange={handleCreateCouponChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formCouponSupply'>
          <Form.Label>Coupon Supply</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter Coupon Supply'
            name='couponSupply'
            value={couponInput.couponSupply}
            onChange={handleCreateCouponChange}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      <div>
        <h2>Coupon info</h2>
        <ul>
          <li>Coupon Name: {coupon.couponName}</li>
          <li>Coupon Symbol: {coupon.couponSymbol}</li>
          <li>Coupon Supply: {coupon.couponSupply}</li>
        </ul>
        <Button variant='primary' onClick={handleGetCouponInfo}>
          Get Coupon Info
        </Button>
      </div>
    </div>
  );
};
export default App;
