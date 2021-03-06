import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../styles/vendorAction.css';
import CouponInfoModal from './CouponInfoModal';

import CreateTokenModal from './CreateTokenModal';
import AddProductModal from './AddProductModal';
import appContext from '../context/AppContext';

const VendorAction = ({ account, contract }) => {
  const navigate = useNavigate();
  const { isVendor } = useContext(appContext);
  const [openCreateToken, setOpenCreateToken] = React.useState(false);
  const [openCouponInfo, setOpenCouponInfo] = React.useState(false);
  const [openAddProduct, setOpenAddProduct] = React.useState(false);
  const handleCreateTokenMadalClose = () => {
    setOpenCreateToken(false);
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleCreateToken = () => {
    if (isVendor) {
      alert(
        'You already create coupon token! Reset Token before you create a new one!'
      );
      return;
    }
    setOpenCreateToken(true);
  };

  const handleResetToken = () => {
    setOpenCreateToken(true);
  };

  return (
    <div>
      <header className='choose-vendor'>
        <Button
          variant='primary'
          onClick={handleCreateToken}
          className={`${isVendor ? 'hidden' : ''}`}>
          I want to Release Coupon
        </Button>
        <div className={`vender-actions-container ${isVendor ? '' : 'hidden'}`}>
          <Button variant='primary' onClick={handleResetToken}>
            Reset Coupon
          </Button>
          <Button variant='primary' onClick={() => setOpenCouponInfo(true)}>
            Get My Coupon info
          </Button>
          <Link to={`/my/productsList`}>
            <Button variant='primary'>Check My Products List</Button>
          </Link>

          <Button variant='primary' onClick={() => setOpenAddProduct(true)}>
            Add Product
          </Button>
          <Button variant='primary' onClick={handleBack}>
            Back To Home
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
      <AddProductModal
        show={openAddProduct}
        onHide={() => setOpenAddProduct(false)}
        contract={contract}
        account={account}
      />
    </div>
  );
};

export default VendorAction;
