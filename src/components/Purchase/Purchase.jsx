import  { useState, useEffect } from "react";
import Header from "./Header";
import ProductSearch from "./ProductSearch";
import CartTable from "./CartTable";
import SummaryFooter from "./SummaryFooter";
import Controls from "./Controls";
import "./styles.css";
import { q } from "framer-motion/client";
import { saveGRN } from "../../API/APIGRN";
import { savePurchase } from "../../API//APIPurchase"
import {getSuppliers} from "../../API/APISupplier";
import InvoicePreview from "./InvoicePreview";

const Purchase = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cash, setCash] = useState(0);
  const [change, setChange] = useState(0);
  const [supplier, setSupplier] = useState(1);
  const [grn, setGrn] = useState({ supplierId: 1, total: 0 });
  const [printGrn, setPrintGrn] = useState(null);
  const [ProductList, setProductList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);

  useEffect(() => {
    if (!grn?.id) {
      getNewGrn();
    }
    if (!supplierList?.length) {
      getSupplierList();
    }
  }, []);

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);
  const getNewGrn = async () => {
    try {
      const response = await saveGRN({ supplierId: 1, total: 0 });
      console.log("Grn saved:", response);
      setGrn(response);
    } catch (error) {
      console.error("Error saving grn:", error);
    }
  };
  const getSupplierList = async () => {
    try {
      const response = await getSuppliers();
      setSupplierList(response);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  }
  const handleAddToCart = (product) => {
    if (grn == null) {
      alert("Please create an grn first!");
      return;
    }
    const discountedPrice = product?.unitCost * (1 - product?.discount / 100);
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
    setCartItems((prev) => prev.filter((item) => item?.id !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item?.id === id ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  const handleNewGrn = () => {
    getNewGrn();
    setPrintGrn(null);
    setCartItems([]);
    setCash("");
    setSupplier(1);
  };

  const handleSubmitGrn = () => {
    if (cartItems?.length === 0) {
      alert("Please add items to the cart before submitting the grn.");
      return;
    }

    const grnData = {
      id: grn.id,
      supplierId: supplier,
      total: cartItems.reduce(
        (sum, item) =>
          sum + item?.unitCost * item?.quantity * (1 - item?.discount / 100),
        0
      )
    };
    const PurchaseData = {
      grn: grnData,
      items: cartItems,
    };
    const submitPurchaseData = async () => {
        console.log("PurchaseData:", PurchaseData);
      if(cash < PurchaseData.grn.total) {
        alert("Cash is not enough to pay the invoice.");
        return;
      }
      try {
        const response = await savePurchase(PurchaseData);
        handlePrintInvoice(response);
        console.log("Sale submitted:", response);
        return response;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error?.message;
        alert(errorMessage);
        console.error("Error:", errorMessage);
      }
    };
    const response = submitPurchaseData();
  };
  const handlePrintInvoice = (PurchaseData) => {
    setPrintInvoice(PurchaseData);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 w-full cashier-app">
      <div className="max-w-screen-xl mx-auto cashier-container">
        <Header suppliers={supplierList} grn={grn} setSupplier={setSupplier}/>

        {printGrn && 
        (<div className="w-full flex justify-center ">
          <InvoicePreview grn={printGrn} productList={ProductList} setPrintGrn={setPrintGrn} close={handleNewGrn}/>
          </div>)}

        <ProductSearch 
        onAdd={handleAddToCart} 
        grn={grn} 
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
          change={change}
          setChange={setChange}
        />
        <Controls
          onNewGrn={handleNewGrn}
          onSubmitGrn={handleSubmitGrn}
        />
      </div>
    </div>
  );
};

export default Purchase;
