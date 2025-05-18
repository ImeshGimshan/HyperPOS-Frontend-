import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const Header = ({ invoice, selectInvoice }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      selectInvoice(searchValue.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 mb-4 rounded-lg bg-black/40 shadow-lg border border-[#f472b6]/30 backdrop-blur-md">
      {/* Search */}
      <div className="flex flex-col gap-1 w-full justify-center items-center md:w-auto">
        <label className="flex items-center gap-2 text-purple-200 font-semibold">
          <IoSearchSharp className="text-[#f472b6] text-lg" />
          Search For Invoice By ID
        </label>
        <div className="flex w-full justify-center items-center">
          <input
            type="number"
            name="search"
            placeholder="Press Enter key to search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-[#0f0326]/70 border border-[#f472b6]/30 text-white rounded-l-xl px-3 py-2 mt-1 focus:outline-none focus:border-[#f472b6] transition-all w-52 shadow-inner"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="mt-1 px-4 py-2 rounded-r-xl bg-[#f472b6] hover:bg-[#e11d48] transition-all text-white font-bold flex items-center justify-center shadow-inner focus:ring-2 focus:ring-[#f472b6]/40 outline-none"
            tabIndex={-1}
          >
            <IoSearchSharp className="text-lg" />
          </button>
        </div>
      </div>

      {/* Invoice info */}
      <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto items-stretch justify-center">
        <div className="flex flex-col w-full md:w-44 min-w-[140px]">
          <label className="text-purple-200 text-xs mb-1">Invoice ID:</label>
          <input
            type="text"
            value={invoice?.id || ""}
            readOnly
            className="bg-[#0f0326]/70 border border-[#f472b6]/30 text-white rounded-xl px-3 py-2 text-center focus:outline-none focus:border-[#f472b6] transition-all shadow-inner"
          />
        </div>
        <div className="flex flex-col w-full md:w-44 min-w-[140px]">
          <label className="text-purple-200 text-xs mb-1">Customer:</label>
          <input
            type="text"
            value={invoice?.customerId || ""}
            readOnly
            className="bg-[#0f0326]/70 border border-[#f472b6]/30 text-white rounded-xl px-3 py-2 text-center focus:outline-none focus:border-[#f472b6] transition-all shadow-inner"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
