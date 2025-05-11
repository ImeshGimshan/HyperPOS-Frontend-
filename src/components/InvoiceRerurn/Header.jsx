import { IoSearchSharp } from "react-icons/io5";
const Header = ({ invoice, selectInvoice }) => {
  return (
    <div className="flex justify-between items-center py-2">
      <div className="flex gap-2  md:flex-row flex-col">
          <div className="flex gap-2 items-center">
            <IoSearchSharp />
            <label>Search For Invoice By ID</label>
          </div>
        <input
          type="number"
          name="search"
          placeholder="Press Enter key to search"
          className="bg-gray-800 p-1 rounded"
          onKeyDown={(e) => e.key === "Enter" && selectInvoice(e.target.value)}
        />
      </div>
      <div className="flex gap-2 items-center md:flex-row flex-col">
        <label>Invoice ID:</label>
        <input
          type="text"
          value={invoice?.id || ""}
          readOnly
          className="bg-gray-800 p-1 rounded"
        />
        <label>Customer:</label>
        <input
          type="text"
          value={invoice?.customerId || ""}
          readOnly
          className="bg-gray-800 p-1 rounded"
        />
      </div>
    </div>
  );
};

export default Header;
