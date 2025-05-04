import React, { useState, useEffect } from 'react';
import Select from 'react-select';

// Example customer data
const customers = [
  {
    id: 1,
    name: 'Cash',
    address: 'noAddress',
    phone: '1234567890',
    email: 'nomail@mail.com',
    isActive: true,
    createdAt: '2025-05-03T22:28:29.149927',
    updatedAt: '2025-05-03T22:28:29.149943',
  },
  {
    id: 2,
    name: 'customer 01 new',
    address: 'new address line 01, line 02, line 03.',
    phone: '1234567893',
    email: 'exmample@email.com',
    isActive: false,
    createdAt: null,
    updatedAt: '2025-05-03T22:57:35.8302',
  },
];

const Header = () => {
  const [invoiceId, setInvoiceId] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    // Generate Invoice ID based on current timestamp
    const generatedInvoiceId = `INV-${Date.now()}`;
    setInvoiceId(generatedInvoiceId);
  }, []);

  const customerOptions = customers.map((customer) => ({
    label: `${customer.name} (ID: ${customer.id})`,
    value: customer.id,
  }));

  const handleCustomerChange = (selectedOption) => {
    setSelectedCustomer(selectedOption);
  };

  return (
    <div className="flex justify-between items-center py-2">
      <h1 className="text-2xl font-bold">HYPER POS</h1>
      <div className="flex gap-2 items-center">
        <label>Invoice ID:</label>
        <input
          type="text"
          value={invoiceId}
          readOnly
          className="bg-gray-800 p-1 rounded"
        />
        <label>Customer ID:</label>
        <Select
          options={customerOptions}
          value={selectedCustomer}
          onChange={handleCustomerChange}
          placeholder="Select or Search Customer"
          isSearchable
          getOptionLabel={(e) => e.label}
          getOptionValue={(e) => e.value}
          className="w-60"
        />
      </div>
    </div>
  );
};

export default Header;
