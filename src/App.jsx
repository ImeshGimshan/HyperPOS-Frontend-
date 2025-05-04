import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import TermsOfU from './components/TermOfU/TermOfU';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Landing from './components/LandingPage/Landing';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/termOfU" element={<TermsOfU />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
    <Landing/>
   </>
  );
}

export default App;
