import React, { useEffect } from "react";

const SummaryFooter = ({ cartItems, cash, setCash, change, setChange }) => {
  const grandTotal = cartItems?.reduce((sum, item) => {
    const total = item?.unitPrice * item?.quantity * (1 - (item?.discount || 0) / 100);
    return sum + (total > 0 ? total : 0);
  }, 0);

  useEffect(() => {
    const parsedCash = parseFloat(cash);
    setChange(parsedCash - grandTotal || 0);
  }, [cash, grandTotal]);

  const handleCashChange = (e) => {
    setCash(e.target.value);
  };

  return (
    <div className="my-4 w-full px-4 py-3 bg-black/30 border border-[#f472b6]/30 rounded-xl shadow-lg">
      <div className="flex justify-between text-lg font-semibold mb-2">
        <span className="text-purple-200">Grand Total:</span>
        <span className="text-[#f472b6] font-extrabold">Rs. {(grandTotal || 0)?.toFixed(2)}</span>
      </div>
      <div className="flex gap-6 mt-2 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-purple-200">Cash:</label>
          <input
            type="number"
            value={Number(cash || 0)}
            onChange={handleCashChange}
            className="bg-[#f472b6] p-1 rounded w-24 text-white font-bold border-none focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-purple-200">Change:</label>
          <input
            type="text"
            readOnly
            value={(change || 0).toFixed(2)}
            className="bg-green-700 p-1 rounded w-24 text-white font-bold border-none"
          />
        </div>
      </div>
    </div>
  );
};

export default SummaryFooter;
