import React, { useState, useEffect } from 'react';
import Select from 'react-select';
const Header = ({invoice,customers,setCustomer}) => {
  const [selectedCustomer, setSelectedCustomer] = useState(1);

  useEffect(() => {
    if (invoice) {
      setSelectedCustomer(invoice.customerId);
    }
  }, [invoice]);
    if (invoice) {
      setSelectedCustomer(invoice.customerId);
    }
  }, [invoice]);

  const customerOptions = customers.map((customer) => ({
    label: `${customer?.name} (ID: ${customer?.id})`,
    value: customer?.id,
    label: `${customer?.name} (ID: ${customer?.id})`,
    value: customer?.id,
  }));

  const handleCustomerChange = (selectedOption) => {
    setSelectedCustomer(selectedOption);
    setCustomer(selectedOption.value);
  };

  return (
    <div className="flex justify-between items-center py-2">
      <h1 className="text-2xl font-bold">HYPER POS</h1>
      <div className="flex gap-2 items-center md:flex-row flex-col">
      <div className="flex gap-2 items-center md:flex-row flex-col">
        <label>Invoice ID:</label>
        <input
          type="text"
          value={invoice?.id||''}
          readOnly
          className="bg-gray-800 p-1 rounded"
        />
        <label>Customer:</label>
        <label>Customer:</label>
        <Select
          options={customerOptions}
          value={selectedCustomer? customerOptions.find((c) => c.value === selectedCustomer) : 1}
          // value={invoice?.customerId ? customerOptions.find((c) => c.value === invoice?.customerId) : null}
          value={selectedCustomer? customerOptions.find((c) => c.value === selectedCustomer) : 1}
          // value={invoice?.customerId ? customerOptions.find((c) => c.value === invoice?.customerId) : null}
          onChange={handleCustomerChange}
          placeholder="Select Customer"
          placeholder="Select Customer"
          isSearchable
          getOptionLabel={(e) => e.label}
          getOptionValue={(e) => e.value}
          className="w-60 text-black"
          className="w-60 text-black"
        />
      </div>
    </div>
  );
};

export default Header;
