
import React from 'react';

import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import TermsOfU from './components/TermOfU/TermOfU';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import AddProduct from './components/AddProduct/AddProduct';
import Landing from './components/LandingPage/Landing';
import CashierScreen from './components/Cashier/CashierScreen';
import BaseScreen from './components/BaseScreen/BaseScreen';

import { Outlet } from 'react-router-dom';
import Test from './components/Test/Test';

function App ( ) {

  return (

    <>

      <Landing/>
      {/*<CashierScreen/>*/}
      {/*<BaseScreen/>*/}
      {/*<Outlet/>*/}

      <Test/>


    </>

  );

}

export default App;

