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
  const [cash, setCash] = useState(0);
  const [change, setChange] = useState(0);
  const [customer, setCustomer] = useState(1);
  const [invoice, setInvoice] = useState({ customerId: 1, total: 0 });
  const [printInvoice, setPrintInvoice] = useState(null);
  const [ProductList, setProductList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("CASH");

  useEffect(() => {
    if (!invoice?.id) {
      getNewInvoice();
    }
    if (!customerList?.length) {
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
  };
  const handleAddToCart = (product) => {
    if (invoice == null) {
      alert("Please create an invoice first!");
      return;
    }
    const discountedPrice = product?.unitPrice * (1 - product?.discount / 100);
    console.log("discounted price: " + discountedPrice);
    setCartItems((prev) => [
      ...prev,
      {
        ...product,
        amount: discountedPrice * product?.quantity,
      },
    ]);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item?.productId !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item?.id === id ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  const handleNewInvoice = () => {
    getNewInvoice();
    setPrintInvoice(null);
    setCartItems([]);
    setCash("");
    setCustomer(1);
    setPaymentMethod("CASH");
  };

  const handleSubmitInvoice = () => {
    if (cartItems?.length === 0) {
      alert("Please add items to the cart before submitting the invoice.");
      return;
    }

    const invoiceData = {
      id: invoice.id,
      paymentMethod: paymentMethod,
      customerId: customer,
      total: cartItems.reduce(
        (sum, item) =>
          sum + item?.unitPrice * item?.quantity * (1 - item?.discount / 100),
        0
      ),
      cash: parseFloat(cash),
      change:
        parseFloat(cash) -
        cartItems.reduce(
          (sum, item) =>
            sum + item?.unitPrice * item?.quantity * (1 - item?.discount / 100),
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
            sum + item?.unitPrice * item?.quantity * (1 - item?.discount / 100),
          0
        ),
    };
    const submitSaleData = async () => {
      if (cash < salesData.invoice.total) {
        alert("Cash is not enough to pay the invoice.");
        return;
      }
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
    <div className="max-h-screen bg-gray-900 text-white w-full cashier-app">
      <div className="max-w-screen-xl mx-auto cashier-container">
        <Header
          customers={customerList}
          invoice={invoice}
          setCustomer={setCustomer}
        />

        {printInvoice && (
          <div className="w-full flex justify-center ">
            <InvoicePreview
              invoice={printInvoice}
              productList={ProductList}
              setPrintInvoice={setPrintInvoice}
              close={handleNewInvoice}
            />
          </div>
        )}

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
          change={change}
          setChange={setChange}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
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
