import React from 'react'
import { IoSearchSharp } from "react-icons/io5";


const Header = ({grn , selectGRN}) => {
    return (
        <div className="flex justify-between items-center py-2">
            <div className="flex gap-2 md:flex-row flex-col">
                <div className="flex gap-2 items-center">
                    <IoSearchSharp/>
                    <label>Search For GRN By ID</label>
                </div>
                <input 
                    type="number" 
                    name="search" 
                    placeholder="Press Enter key to search" 
                    className="bg-gray-800 p-1 rounded"
                    onKeyDown={(e)=> e.key === "Enter" && selectGRN(e.target.value)}
                />
            </div>
            <div className="flex gap-2 items-center md:flex-row flex-col">
                <label>GRN ID:</label>
                <input
                    type="text"
                    value={grn?.id || ""}
                    readOnly
                    className="bg-gray-800 p-1 rounded"
                />
                <label>Supplier ID:</label>
                <input
                    type="text"
                    value={grn?.supplierId || ""}
                    readOnly
                    className="bg-gray-800 p-1 rounded"
                />
            </div>
        </div>
    );
};

export default Header