import React, { useState, useEffect } from "react";
import Select from "react-select";
const Header = ({ grn, suppliers, setSupplier }) => {
  const [selectedSupplier, setSelectedSupplier] = useState(1);

  useEffect(() => {
    if (grn) {
      setSelectedSupplier(grn.supplierId);
    }
  }, [grn]);

  const supplierOptions = suppliers.map((supplier) => ({
    label: `${supplier?.name} (ID: ${supplier?.id})`,
    value: supplier?.id,
  }));

  const handleSupplierChange = (selectedOption) => {
    setSelectedSupplier(selectedOption);
    setSupplier(selectedOption.value);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center flex-row justify-between w-full">
        <div className="flex flex-col">
          <label>grn ID:</label>
          <input
            type="text"
            value={grn?.id || ""}
            readOnly
            className="bg-gray-800 p-1 rounded"
          />{" "}
        </div>
        <div>
          <label>Customer:</label>
          <Select
            options={supplierOptions}
            value={
              selectedSupplier
                ? supplierOptions.find((c) => c.value === selectedSupplier)
                : 1
            }
            onChange={handleSupplierChange}
            placeholder="Select Supplier"
            isSearchable
            getOptionLabel={(e) => e.label}
            getOptionValue={(e) => e.value}
            className=" text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
