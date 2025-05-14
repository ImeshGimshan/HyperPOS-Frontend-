import React from 'react'
import { IoSearchSharp } from "react-icons/io5";


const Header = ({grn , selectGRN}) => {
    return (
        <div className="flex justify-between items-center py-5">
            <div className="flex gap-2 md:flex-row flex-col">
                <div className="flex gap-4 items-center font-semibold">
                    <IoSearchSharp/>
                    <lable>Search For GRN By ID</lable>
                </div>
                <input 
                    type="number" 
                    name="search" 
                    placeholder="Press Enter key to search" 
                    className="bg-gray-800 p-1 rounded w-55"
                    onKeyDown={(e)=> e.key === "Enter" && selectGRN(e.target.value)}
                />
            </div>
            <div className="flex gap-4 items-center font-semibold md:flex-row flex-col">
                <lable>GRN ID:</lable>
                <input
                    type="text"
                    value={grn?.id || ""}
                    readOnly
                    className="bg-gray-800 p-1 rounded"
                />
                <lable>Supplier ID:</lable>
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