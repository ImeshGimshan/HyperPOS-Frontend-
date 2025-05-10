import React, { useState, useEffect } from "react";
import Header from "./Header";
import ProductSearch from "./ProductSearch";
import CartTable from "./CartTable";
import SummaryFooter from "./SummaryFooter";
import Controls from "./Controls";
import "./styles.css";
import { q } from "framer-motion/client";
import { saveInvoice } from "../../API/APIInvoice";
import { submitSale } from "../../API/APISale";
import { getCustomers } from "../../API/APICustomer";
import InvoicePreview from "./InvoicePreview";

const CashierScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cash, setCash] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [customer, setCustomer] = useState(1);
  const [invoice, setInvoice] = useState({  customerId: 1, total: 0 });
  const [printInvoice, setPrintInvoice] = useState(null);
  const [ProductList, setProductList] = useState([]);
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    if (!invoice.id) {
      getNewInvoice();
    }
    if (!customerList.length) {
      getCustomersList();
    }
  }, []);

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  const getNewInvoice = async () => {
    try {
      const response = await saveInvoice({ customerId: 1, total: 0 });
      console.log("Invoice saved:", response);
      setInvoice(response);
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
  };
  const getCustomersList = async () => {
    try {
      const response = await getCustomers();
      setCustomerList(response);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  }
  const handleAddToCart = (product) => {
    if (invoice == null) {
      alert("Please create an invoice first!");
      return;
    }
    const discountedPrice = product.unitPrice * (1 - product.discount / 100);
    console.log("discounted price: " + discountedPrice);
    setCartItems((prev) => [
      ...prev,
      {
        ...product,
        amount: discountedPrice * product.quantity,
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
    getNewInvoice();
    setPrintInvoice(null);
    setCartItems([]);
    setCash("");
    setCustomer(1);
    setInvoiceNumber(`1`);
  };

  const handleSubmitInvoice = () => {
    const invoiceData = {
      id: invoice.id,
      paymentMethod: "CASH",
      customerId: customer,
      total: cartItems.reduce(
        (sum, item) =>
          sum + item.unitPrice * item.quantity * (1 - item.discount / 100),
        0
      ),
      cash: parseFloat(cash),
      change:
        parseFloat(cash) -
        cartItems.reduce(
          (sum, item) =>
            sum + item.unitPrice * item.quantity * (1 - item.discount / 100),
          0
        ),
    };
    const salesData = {
      invoice: invoiceData,
      items: cartItems,
      cash: parseFloat(cash),
      change:
        parseFloat(cash) -
        cartItems.reduce(
          (sum, item) =>
            sum + item.unitPrice * item.quantity * (1 - item.discount / 100),
          0
        ),
    };
    const submitSaleData = async () => {
      try {
        const response = await submitSale(salesData);
        handlePrintInvoice(response);
        console.log("Sale submitted:", response);
        return response;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error?.message;
        alert(errorMessage);
        console.error("Error:", errorMessage);
      }
    };
    const response = submitSaleData();
  };
  const handlePrintInvoice = (salesData) => {
    setPrintInvoice(salesData);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 w-full cashier-app">
      <div className="max-w-screen-xl mx-auto cashier-container">
        <Header customers={customerList} invoice={invoice} />

        {printInvoice && 
        (<div className="w-full flex justify-center ">
          <InvoicePreview invoice={printInvoice} productList={ProductList} setPrintInvoice={setPrintInvoice}/>
          </div>)}

        <ProductSearch 
        onAdd={handleAddToCart} 
        invoice={invoice} 
        setProductList={setProductList} 
        />
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
