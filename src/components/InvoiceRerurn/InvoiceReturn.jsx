import { useState, useEffect } from "react";
import CartTable from "./CartTable";
import Header from "./Header";
import SummaryFooter from "./SummaryFooter";
import Controls from "./Controls";
import { returnSale, getSaleById, getSale } from "../../API/APISale";
import { getProducts } from "../../API/APIProducts";
import { a } from "framer-motion/client";
import InvoicePreview from "./InvoicePreview";
function InvoiceReturn() {
  const [invoiceData, setInvoiceData] = useState({});
  const [printInvoice, setPrintInvoice] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cash, setCash] = useState(0);
  const [change, setChange] = useState(0);

  const [productList, setProductList] = useState([
    {
      id: 1,
      barcode: "45646g08115f0",
      name: "new Laptop 57877gf",
      categoryId: 1,
      unit: "PIECE",
      description: null,
      image: null,
      discount: 0,
      price: 100,
      isActive: true,
    },
    {
      id: 2,
      barcode: "4fsidfdfsf",
      name: "phone 15",
      categoryId: 1,
      unit: "PIECE",
      description: "some description",
      image: null,
      discount: 5,
      price: 100000,
      isActive: true,
    },
  ]);

  useEffect(() => {
    getAllProducts();
  }, []);
  useEffect(() => {
    setCartItems(invoiceData?.items);
    setCash(invoiceData?.invoice?.total);
  }, [invoiceData]);

  const getAllProducts = async () => {
    try {
      const response = await getProducts();
      setProductList(response);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      alert("Error :", errorMessage);
      console.error("Error fetching products:", error);
    }
  };
  const selectInvoice = async (id) => {
    console.log("id", id);
    try {
      const response = await getSaleById(id);
      setInvoiceData(response);

    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      alert("Invoice Not Found", errorMessage);
      console.error("Error fetching invoice:", error);
      setInvoiceData({});
    }
  };

  const handleSubmitInvoice = async () => {
    if (cartItems.length === 0) {
      alert("Please add items to the cart before submitting the invoice.");
      return;
    }
    console.log("invoice Items", cartItems);
    try {
      const invoiceForSubmit = setInvoiceForSubmit(
        invoiceData?.invoice,
        cartItems
      );
      console.log("invoiceForSubmit", invoiceForSubmit);
      const response = await returnSale(
        invoiceForSubmit.invoice.id,
        invoiceForSubmit
      );
      setPrintInvoice(response);
      alert("Invoice submitted successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      alert(errorMessage);
      console.error("Error submitting invoice:", error);
    }
    setInvoiceForSubmit(invoiceData?.invoice, cartItems);
  };
  const handleQuantityChange = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: parseInt(quantity),
              amount:
                parseInt(quantity) * (item.price * (1 - item.discount / 100)) ||
                0,
            }
          : item
      )
    );
  };
  const setInvoiceForSubmit = (invoice, items) => {
    const newInvoice = {
      invoice: {
        id: invoice?.id,
        customerId: invoice?.customerId,
        total: items?.reduce((sum, item) => sum + item.amount, 0),
        paymentMethod: invoice?.paymentMethod,
      },
      items: items,
    };
    return newInvoice;
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] bg-gradient-to-br from-[#2d0147] via-[#10022d] to-black text-white p-4 w-full cashier-app">
      <div className="max-w-screen-xl mx-auto cashier-container">
        <Header invoice={invoiceData?.invoice} selectInvoice={selectInvoice} />
        {printInvoice && (
          <InvoicePreview
            invoice={printInvoice}
            productList={productList}
            close={() => setPrintInvoice(null)}
          />
        )}
        <CartTable
          cartItems={cartItems}
          productList={productList}
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
          clear={() => setInvoiceData({})}
          onSubmitInvoice={handleSubmitInvoice}
        />
      </div>
    </div>
  );
}
export default InvoiceReturn;
