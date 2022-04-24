import React from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/vendorAction.css';

const VendorAction = () => {
  const [isVendor, setIsVendor] = React.useState(false);
  return (
    <div>
      <header className='choose-vendor'>
        <Button
          variant='primary'
          onClick={() => setIsVendor(true)}
          className={`${isVendor ? 'hidden' : ''}`}>
          I want to Release Coupon
        </Button>
      </header>
      <div className={`vender-actions-container ${isVendor ? '' : 'hidden'}`}>
        <Button variant='primary'>Create My Coupon</Button>
        <Button variant='primary'>Get My Coupon info</Button>
        <Button variant='primary'>Add Product</Button>
        <Button variant='primary'>Delete Product</Button>
        <Button variant='primary' onClick={() => setIsVendor(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default VendorAction;
