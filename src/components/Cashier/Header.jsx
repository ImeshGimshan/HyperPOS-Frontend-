import React, { useState, useEffect } from "react";
import Select from "react-select";

const Header = ({ invoice, customers, setCustomer }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(1);

  useEffect(() => {
    if (invoice) setSelectedCustomer(invoice.customerId);
  }, [invoice]);

  const customerOptions = customers.map((customer) => ({
    label: `${customer?.name} (ID: ${customer?.id})`,
    value: customer?.id,
  }));

  const handleCustomerChange = (selectedOption) => {
    setSelectedCustomer(selectedOption.value);
    setCustomer(selectedOption.value);
  };

  return (
    <div className="rounded-2xl bg-black/40 border border-[#f472b6]/20 shadow-lg p-6 flex flex-col md:flex-row gap-6 md:gap-10 justify-between items-center w-full">
      <div className="w-full md:w-1/2 flex flex-col gap-2">
        <label className="text-purple-200 text-xs">Invoice ID:</label>
        <input
          type="text"
          value={invoice?.id || ""}
          readOnly
          className="bg-[#0f0326]/80 border border-[#f472b6]/30 text-white rounded-lg px-3 py-2 text-center focus:outline-none focus:border-[#f472b6] transition-all shadow-inner"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-2">
        <label className="text-purple-200 text-xs">Customer:</label>
        <Select
          options={customerOptions}
          value={customerOptions.find((c) => c.value === selectedCustomer) || null}
          onChange={handleCustomerChange}
          placeholder="Select Customer"
          isSearchable
          className="text-black rounded-xl"
          styles={{
            control: (base, state) => ({
              ...base,
              background: "rgba(15,3,38,0.7)",
              borderColor: state.isFocused ? "#f472b6" : "#f472b6aa",
              boxShadow: state.isFocused
                ? "0 0 0 2px #f472b6cc"
                : "0 1px 3px #f472b6",
              borderRadius: "0.75rem",
              color: "#fff",
              minHeight: 44,
              fontSize: "1rem",
            }),
            singleValue: (base) => ({
              ...base,
              color: "#fff",
            }),
            menu: (base) => ({
              ...base,
              background: "#1c0e41e0",
              color: "#fff",
              borderRadius: "0.75rem",
              zIndex: 20,
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused
                ? "#f472b6cc"
                : "rgba(44,17,56,0.7)",
              color: state.isFocused ? "#fff" : "#f472b6",
              fontWeight: state.isSelected ? 700 : 500,
              cursor: "pointer",
            }),
            placeholder: (base) => ({
              ...base,
              color: "#f472b6aa",
              fontWeight: 400,
            }),
          }}
        />
      </div>
    </div>
  );
};

export default Header;
