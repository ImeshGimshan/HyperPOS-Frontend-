import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";

const Header = ({ grn, selectGRN }) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = () => {
        if (searchValue.trim() !== "") {
            selectGRN(searchValue.trim());
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-5 mb-4 rounded-lg bg-black/40 border border-[#f472b6]/30 shadow-lg backdrop-blur-md">
            {/* Search area */}
            <div className="flex flex-col gap-1 w-full md:w-auto justify-center items-center">
                <label className="flex items-center gap-2 text-purple-200 font-semibold mb-1">
                    <IoSearchSharp className="text-[#f472b6] text-lg" />
                    Search For GRN By ID
                </label>
                <div className="flex">
                    <input
                        type="number"
                        name="search"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        placeholder="Press Enter or click search"
                        onKeyDown={handleKeyDown}
                        className="bg-[#0f0326]/80 border border-[#f472b6]/30 text-white rounded-l-xl px-3 py-2 w-52 focus:outline-none focus:border-[#f472b6] transition-all shadow-inner placeholder-purple-300/70"
                    />
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="px-4 py-2 rounded-r-xl bg-[#f472b6] hover:bg-pink-700 transition-all text-white font-bold flex items-center justify-center shadow-inner focus:ring-2 focus:ring-[#f472b6]/40 outline-none"
                        tabIndex={-1}
                    >
                        <IoSearchSharp className="text-lg" />
                    </button>
                </div>
            </div>
            {/* GRN Info */}
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto justify-center items-center md:items-center">
                <div className="flex flex-col w-40">
                    <label className="text-purple-300 text-xs mb-1">GRN ID:</label>
                    <input
                        type="text"
                        value={grn?.id || ""}
                        readOnly
                        className="bg-[#0f0326]/80 border border-[#f472b6]/30 text-white rounded-xl px-3 py-2 text-center focus:outline-none focus:border-[#f472b6] transition-all shadow-inner"
                    />
                </div>
                <div className="flex flex-col w-40">
                    <label className="text-purple-300 text-xs mb-1">Supplier ID:</label>
                    <input
                        type="text"
                        value={grn?.supplierId || ""}
                        readOnly
                        className="bg-[#0f0326]/80 border border-[#f472b6]/30 text-white rounded-xl px-3 py-2 text-center focus:outline-none focus:border-[#f472b6] transition-all shadow-inner"
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;