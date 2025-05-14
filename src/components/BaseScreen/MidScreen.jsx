import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CashierScreen from '../Cashier/CashierScreen';

function MidScreen({ sidebarExpanded }) {
  return (
    <div className={`flex-1 bg-gray-100 overflow-y-auto transition-all duration-300 ${sidebarExpanded ? 'ml-0' : 'ml-0'}`}>
      <Routes>
        <Route path="/cashier" element={<CashierScreen />} />
        <Route path="/invoice-return" element={<div>Invoice Return Content</div>} />
        <Route path="/customer-registration" element={<div>Customer Registration Content</div>} />
        {/* Default route redirects to cashier */}
        <Route path="*" element={<Navigate to="/cashier" replace />} />
      </Routes>
    </div>
  );
}

export default MidScreen;
