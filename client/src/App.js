import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CouponFactory from './contracts/CouponFactory.json';
import getWeb3 from './getWeb3';
import './App.css';
import VendorAction from './components/VendorActions';
import ProductsList from './components/ProductsList';
import { AppContextProvider } from './context/AppContext';
import VendorsList from './components/VendorsList';

const App = () => {
  const [account, setAccount] = React.useState(null);
  const [contract, setContract] = React.useState(null);

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

  return (
    <div className='App'>
      <AppContextProvider account={account} contract={contract}>
        <BrowserRouter>
          <VendorAction account={account} contract={contract} />
          <Routes>
            <Route
              path='/'
              element={<VendorsList account={account} contract={contract} />}
            />
            <Route
              path='/:vendorId/productsList'
              element={<ProductsList account={account} contract={contract} />}
            />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </div>
  );
};
export default App;
