import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CouponFactory from './contracts/CouponFactory.json';
import getWeb3 from './getWeb3';
import './App.css';
import VendorAction from './components/ChooseAction';
import ProductsList from './components/ProductsList';

const App = () => {
  const [account, setAccount] = React.useState(null);
  const [contract, setContract] = React.useState(null);

  const [couponInput, setCouponInput] = React.useState({
    couponName: '',
    couponSymbol: '',
    couponSupply: 10,
  });
  const [coupon, setCoupon] = React.useState({
    _name: '',
    _symbol: '',
    _totalSupply: 0,
  });

  const initWeb3 = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const account = await web3.eth.getAccounts();
      setAccount(account);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CouponFactory.networks[networkId];
      const instance = new web3.eth.Contract(
        CouponFactory.abi,
        deployedNetwork && deployedNetwork.address
      );
      instance.options.address = deployedNetwork.address;
      setContract(instance);
      //get deployed contract address
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

  /* const handleCreateCouponChange = (event) => {
    setCouponInput({ ...couponInput, [event.target.name]: event.target.value });
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
 */
  const handleGetCouponInfo = async (e) => {
    e.preventDefault();
    if (!contract) {
      return <div>can not get the contract!</div>;
    }
    try {
      const response = await contract.methods.getTokenInfo(account[0]).call();
      console.log(response);
      setCoupon(response);
    } catch (error) {
      console.log(error);
    }
  };

  //check if the account[0] is already create a token
  const checkIfAccountHasToken = async (e) => {
    try {
      const response = await contract.methods.getTokenOwner(account[0]).call();
      if (response) {
        alert('You already create coupon token!');
        return true;
      }
    } catch (error) {
      alert('You do not create a coupon token!');
      console.log(error);
    }
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <VendorAction account={account} contract={contract} />
        <Routes>
          <Route path='/' element={<div>vendor list</div>} />
          <Route
            path='/productsList'
            element={<ProductsList account={account} contract={contract} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
