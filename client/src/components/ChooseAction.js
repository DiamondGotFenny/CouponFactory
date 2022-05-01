import React from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/vendorAction.css';
import CouponInfoModal from './CouponInfoModal';

import CreateTokenModal from './CreateTokenModal';

const VendorAction = ({ account, contract }) => {
  const [isVendor, setIsVendor] = React.useState(false);

  const [openCreateToken, setOpenCreateToken] = React.useState(false);
  const [openCouponInfo, setOpenCouponInfo] = React.useState(false);
  const handleCreateTokenMadalClose = () => {
    setOpenCreateToken(false);
  };

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
          <Button variant='primary' onClick={() => setOpenCreateToken(true)}>
            Create My Coupon
          </Button>
          <Button variant='primary' onClick={() => setOpenCouponInfo(true)}>
            Get My Coupon info
          </Button>
          <Button variant='primary'>Check My Products List</Button>
          <Button variant='primary'>Add Product</Button>
          <Button variant='primary'>Delete Product</Button>
          <Button variant='primary' onClick={() => setIsVendor(false)}>
            Cancel
          </Button>
        </div>
      </header>
      <CreateTokenModal
        show={openCreateToken}
        onHide={handleCreateTokenMadalClose}
        contract={contract}
        account={account}
      />
      <CouponInfoModal
        show={openCouponInfo}
        onHide={() => setOpenCouponInfo(false)}
        contract={contract}
        account={account}
      />
    </div>
  );
};

export default VendorAction;
