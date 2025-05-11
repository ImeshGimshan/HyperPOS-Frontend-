import React, { useEffect } from "react";

const SummaryFooter = ({ cartItems, cash, setCash, change,setChange }) => {


  const grandTotal = cartItems?.reduce((sum, item) => {
    const total = item?.unitPrice * item?.quantity - (item?.discount || 0);
    return sum + (total > 0 ? total : 0);
  }, 0);

  useEffect(() => {
    const parsedCash = parseFloat(cash);
    setChange(  parsedCash - grandTotal || 0);
  }, [cash, grandTotal]);

  const handleCashChange = (e) => {
    setCash(e.target.value);
  };

  return (
    <div className="my-4 w-full">
      <div className="flex justify-between text-lg font-semibold">
        <span>Grand Total:</span>
        <span>Rs. {(grandTotal || 0)?.toFixed(2)}</span>
      </div>

      <div className="flex gap-4 mt-2">
        <div className="flex items-center gap-2">
          <label>Cash:</label>
          <input
            type="number"
            value={Number(cash|| 0)}
            onChange={handleCashChange}
            className="bg-red-700 p-1 rounded w-20 text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <label>Change:</label>
          <input
            type="text"
            readOnly
            value={(change|| 0).toFixed(2)}
            className="bg-green-700 p-1 rounded w-20 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default SummaryFooter;
