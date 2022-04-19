import React, { useEffect } from 'react';
import CouponFactory from './contracts/CouponFactory.json';
import getWeb3 from './getWeb3';

const App = () => {
  const [web3, setWeb3] = React.useState(null);
  const [accounts, setAccounts] = React.useState(null);
  const [contract, setContract] = React.useState(null);

  const getWeb3Instance = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      setWeb3(web3);
    } catch (error) {
      console.log(error);
    }
  };

  const getAccounts = async () => {
    if (!web3) {
      <div>can not connect to Ethereum!</div>;
    }
    try {
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
    } catch (error) {
      console.log(error);
    }
  };

  // Get the contract instance.
  const getContractInstance = async () => {
    if (!web3) {
      <div>can not connect to Ethereum!</div>;
    }
    try {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CouponFactory.networks[networkId];
      const instance = new web3.eth.Contract(
        CouponFactory.abi,
        deployedNetwork && deployedNetwork.address
      );
      setContract(instance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Get network provider and web3 instance.
    getWeb3Instance();
    // Use web3 to get the user's accounts.
    getAccounts();
    // Get the contract instance.
    getContractInstance();
  });
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};
export default App;
