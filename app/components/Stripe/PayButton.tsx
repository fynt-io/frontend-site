import React from 'react';
import {useCustomCheckout} from '@stripe/react-stripe-js';

const PayButton = () => {
  const {confirm, canConfirm, confirmationRequirements} = useCustomCheckout();
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    setLoading(true);
    confirm().then(() => {
      setLoading(false);
    })
  };

  return (
    <button disabled={!canConfirm || loading} onClick={handleClick}>
      Pay
    </button>
  )
};

export default PayButton;