import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider , createBrowserRouter } from "react-router-dom";

import App from './App.jsx'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Landing from './components/LandingPage/Landing';
import TermsOfU from './components/TermOfU/TermOfU';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import AddProduct from './components/AddProduct/AddProduct';
import CashierScreen from './components/Cashier/CashierScreen';
import DashboardLayout from "./components/Dashboard/layout/DashboardLayout.jsx";
import DashboardHome from "./components/Dashboard/pages/DashboardHome.jsx";
import GRNPage from "./components/Dashboard/pages/GRNPage.jsx";
import InvoicePage from "./components/Dashboard/pages/InvoicePage.jsx";
import UserPage from "./components/Dashboard/pages/UserPage.jsx";
import CustomerPage from "./components/Dashboard/pages/CustomerPage.jsx";
import ProductPage from "./components/Dashboard/pages/ProductPage.jsx";
import SalePage from "./components/Dashboard/pages/SalePage.jsx";
import Test from './components/Test/Test';
import BaseScreen from './components/BaseScreen/BaseScreen';
import PurchasePage from "./components/Dashboard/pages/PurchasePage";

import './index.css'
import Customerregister from './components/customer/registercustomer.jsx';
import SupplierRegistration from './components/register/register.jsx';
import InvoiceReturn from './components/InvoiceRerurn/InvoiceReturn.jsx';
import Category from './components/Category/Categoty.jsx';
import Purchase from './components/Purchase/Purchase.jsx';
import GrnReturn from './components/ReturnPurchase/GrnReturn.jsx';


// Creating the router object.
const router = createBrowserRouter ( [

  {

    path: "/",
    element: <App />,
    children: [
      // index : true means that our default route is the login page.
      // path : "" means the url to use along with localhost:port/""
      { index: true , element : <Landing /> },
      { path: "login" , element : <Login /> },
      { path: "signup" , element : <Signup /> },
      { path: "termsofuse" , element : <TermsOfU /> },
      { path: "forgotpassword" , element : <ForgotPassword /> },
      { path: "addproduct" , element : <AddProduct /> },
      { path: "cashier" , element : <CashierScreen /> },
      { path: "basescreen" , element : <BaseScreen /> },
      { path: "test" , element : <Test /> },
      { path: "customerregister" , element : <Customerregister /> },
      { path: "supplierregister", element: <SupplierRegistration/>},
      { path: "invoicereturn", element: <InvoiceReturn/>},
      { path: "grnreturn", element: <GrnReturn/>},
      {path: "category", element: <Category/>},
      {path: "purchase", element: <Purchase/>},
      {path: "product", element: <AddProduct/>},
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true , element : <DashboardHome /> },
          { path: "grn" , element : <GRNPage /> },
          { path: "invoices" , element : <InvoicePage /> },
          { path: "users" , element : <UserPage /> },
          { path: "customers" , element : <CustomerPage /> },
          { path: "products" , element : <ProductPage /> },
          { path: "sales" , element : <SalePage /> },
          { path: "purchases" , element : <PurchasePage /> },
        ],
      },
    ],

  },

] );

ReactDOM.createRoot ( document.getElementById ( 'root' ) ).render (

  <React.StrictMode>
    <RouterProvider router = { router } />
  </React.StrictMode>
  
);
