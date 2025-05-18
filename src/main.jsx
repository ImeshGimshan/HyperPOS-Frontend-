
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
import PurchasePage from "./components/Dashboard/pages/PurchasePage.jsx";
import Organization from "./components/Organization/Organization.jsx";
//import OrganizationPage from "./components/Dashboard/pages/OrganizationPage.jsx";

import Customerregister from './components/customer/registercustomer.jsx';
import SupplierRegistration from './components/register/register.jsx';
import InvoiceReturn from './components/InvoiceRerurn/InvoiceReturn.jsx';
import Category from './components/Category/Categoty.jsx';
import Purchase from './components/Purchase/Purchase.jsx';
import GrnReturn from './components/ReturnPurchase/GrnReturn.jsx';

import BaseScreenLayout from './components/BaseScreen/layout/BaseScreenLayout.jsx';
import BaseScreenHome from './components/BaseScreen/pages/BaseScreenHome.jsx';

import './index.css'
import './styles/hyperpos-theme.css';

// Creating the router object.
const router = createBrowserRouter ( [
  {
    path : "/",
    element : <App />,
    children : [
      { index : true , element : <Landing /> },
      { path : "login" , element : <Login /> },
      { path : "signup" , element : <Signup /> },
      { path : "termsofuse" , element : <TermsOfU /> },
      { path : "forgotpassword" , element : <ForgotPassword /> },
      { path : "addproduct" , element : <AddProduct /> },
      { path : "cashier" , element : <CashierScreen /> },

      { 
        path : "basescreen", 
        element : <BaseScreenLayout />,
        children : [
          { index : true , element : <BaseScreenHome /> },
          { path : "cashier" , element : <CashierScreen /> },
          { path : "invoice-return" , element : <InvoiceReturn /> },
          { path : "customer-registration" , element : <Customerregister /> }
        ]
      },

      { path : "test" , element: <Test /> },
      { path : "customerregister" , element : <Customerregister /> },
      { path : "supplierregister" , element : <SupplierRegistration /> },
      { path : "invoicereturn" , element : <InvoiceReturn /> },
      { path : "grnreturn" , element : <GrnReturn /> },
      { path : "category" , element : <Category /> },
      { path : "purchase" , element : <Purchase /> },
      { path : "product" , element : <AddProduct /> },

      {
        path : "dashboard",
        element : <DashboardLayout />,
        children : [
          { index : true , element : <DashboardHome /> },
          { path : "grn" , element : <GRNPage /> },
          { path : "invoices" , element : <InvoicePage /> },
          { path : "users" , element : <UserPage /> },
          { path : "customers" , element : <CustomerPage /> },
          { path : "products" , element : <ProductPage /> },
          { path : "sales" , element : <SalePage /> },
          { path : "purchases" , element : <PurchasePage /> },
          //{ path : "organizations" , element : <OrganizationPage /> },
          { path : "organization" , element : <Organization /> },
          { path : "purchase" , element : <Purchase /> },
          { path : "customerregister" , element : <Customerregister /> },
          { path : "addproduct" , element : <AddProduct /> },
          { path : "supplierregister" , element : <SupplierRegistration /> },
          { path : "grnreturn" , element : <GrnReturn /> },
          { path : "invoicereturn" , element : <InvoiceReturn /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot ( document.getElementById ( 'root' ) ).render(
  <React.StrictMode>
    <RouterProvider router = { router } />
  </React.StrictMode>
);
