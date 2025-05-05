
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

function App ( ) {

  return (

    <>

      <Router>

        <Routes>
          <Route path = "/" element = { <Login /> } />
          <Route path = "/signup" element = { <Signup /> } />
          <Route path = "/Home" element = { <Landing/> } />
          <Route path = "/termOfU" element = { <TermsOfU /> } />
          <Route path = "/forgotPassword" element = { <ForgotPassword /> } />
          <Route path = "/addProduct" element = { <AddProduct/> } />
        </Routes>

      </Router>

      <Landing/>
      <CashierScreen/>
      <BaseScreen/>

    </>

  );

}

export default App;

