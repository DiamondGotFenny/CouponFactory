import React from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/vendorAction.css';

import CreateTokenModal from "./CreateTokenModal"

const VendorAction = () => {
  const [account, setAccount] = React.useState(null);
  const [contract, setContract] = React.useState(null);

  const [isVendor, setIsVendor] = React.useState(false);

  const [openCreateToken,setOpenCreateToken]=React.useState(false);

  const handleCreateTokenMadalCloase=()=>{
    setOpenCreateToken(false);
  }

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
    <div>
      <header className='choose-vendor'>
        <Button
          variant='primary'
          onClick={() => setIsVendor(true)}
          className={`${isVendor ? 'hidden' : ''}`}>
          I want to Release Coupon
        </Button>
        <div className={`vender-actions-container ${isVendor ? '' : 'hidden'}`}>
        <Button variant='primary'onClick={()=>setOpenCreateToken(true)}>Create My Coupon</Button>
        <Button variant='primary'>Get My Coupon info</Button>
        <Button variant='primary'>Add Product</Button>
        <Button variant='primary'>Delete Product</Button>
        <Button variant='primary' onClick={() => setIsVendor(false)}>
          Cancel
        </Button>
      </div>
      </header>
      <CreateTokenModal show={openCreateToken} onHide={handleCreateTokenMadalCloase} contract={contract}/>
    </div>
  );
};

export default VendorAction;
