import React, { useState, useEffect } from 'react';
import Header from './Header';
import ProductSearch from './ProductSearch';
import CartTable from './CartTable';
import SummaryFooter from './SummaryFooter';
import Controls from './Controls';
import './styles.css';

const CashierScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cash, setCash] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const generateInvoiceNumber = () => {
      const now = new Date();
      return `INV-${now.getFullYear()}${(now.getMonth()+1)
        .toString()
        .padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${now
        .getHours()
        .toString()
        .padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now
        .getSeconds()
        .toString()
        .padStart(2, '0')}`;
    };
    setInvoiceNumber(generateInvoiceNumber());
  }, []);

  const handleAddToCart = (product) => {
    setCartItems((prev) => [
      ...prev,
      {
        ...product,
        id: Date.now(),
        quantity: product.quantity || 1,
        discount: product.discount || 0,
      },
    ]);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  const handleNewInvoice = () => {
    setCartItems([]);
    setCash('');
    setCustomer(null);
    const now = new Date();
    setInvoiceNumber(
      `INV-${now.getFullYear()}${(now.getMonth()+1)
        .toString()
        .padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${now
        .getHours()
        .toString()
        .padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now
        .getSeconds()
        .toString()
        .padStart(2, '0')}`
    );
  };

  const handleSubmitInvoice = () => {
    const invoiceData = {
      invoiceNumber,
      customer,
      items: cartItems,
      total: cartItems.reduce(
        (sum, item) =>
          sum + item.price * item.quantity * (1 - item.discount / 100),
        0
      ),
      cash: parseFloat(cash),
      change:
        parseFloat(cash) -
        cartItems.reduce(
          (sum, item) =>
            sum + item.price * item.quantity * (1 - item.discount / 100),
          0
        ),
      date: new Date().toISOString(),
    };

    console.log('Invoice Data:', invoiceData);
    // Send invoiceData to backend here
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 w-full cashier-app">
      <div className="max-w-screen-xl mx-auto cashier-container">
        <Header invoiceNumber={invoiceNumber} />
        <ProductSearch onAdd={handleAddToCart} />
        <CartTable
          cartItems={cartItems}
          onRemove={handleRemoveFromCart}
          onQuantityChange={handleQuantityChange}
        />
        <SummaryFooter
          cartItems={cartItems}
          cash={cash}
          setCash={setCash}
          customer={customer}
          setCustomer={setCustomer}
        />
        <Controls
          onNewInvoice={handleNewInvoice}
          onSubmitInvoice={handleSubmitInvoice}
        />
      </div>
    </div>
  );
};

export default CashierScreen;
