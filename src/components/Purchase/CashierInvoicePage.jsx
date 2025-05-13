import React, { useState } from 'react';
import SummaryFooter from './SummaryFooter';
import Controls from './Controls';

const CashierInvoicePage = () => {
  const [cartItems, setCartItems] = useState([
    // Example initial cart (can be empty)
    // { id: 1, name: 'Item A', price: 100, quantity: 2, discount: 10 }
  ]);

  const handleNewInvoice = () => {
    setCartItems([]); // Clears the cart
  };

  return (
    <div>
      {/* Pass cartItems to SummaryFooter */}
      <SummaryFooter cartItems={cartItems} />
      
      {/* Pass the clear function to Controls */}
      <Controls onNewInvoice={handleNewInvoice} />
    </div>
  );
};

export default CashierInvoicePage;
