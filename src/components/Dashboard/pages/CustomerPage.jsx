// Imports : ( React , useState ) , ( Eye , SlidersHorizontal ) , ( customerData )
import { useState, useEffect } from "react";

import { Eye, SlidersHorizontal } from "lucide-react";

import { getCustomerData } from "../data/customerData";

import FetchLoader from './FetchLoader';

// Function : ( ViewModal )
function ViewModal({ customer, onClose }) {
  // Function to format date strings
  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="fixed inset-0 top-14 sm:top-16 bg-black/70 backdrop-blur-sm flex justify-center items-center z-40 p-4 sm:p-8">
      <div className="bg-hyper-dark/90 rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative border border-purple-500/30">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-purple-500/30">
          <div className="w-full text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white hyper-text-glow">Customer Details</h2>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white text-xl cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Container with padding to create space for scrollbar */}
        <div className="px-2">
          {/* Scrollable content area with purple-themed scrollbar */}
          <div className="max-h-[60vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-purple-900/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-purple-500/50 hover:[&::-webkit-scrollbar-thumb]:bg-purple-400/70 p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-5">
              {/* Basic Information */}
              <div className="bg-purple-900/30 p-3 sm:p-4 rounded-xl border border-purple-500/30">
                <h3 className="text-md font-semibold text-purple-300 mb-2 sm:mb-3 text-center">Basic Information</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-400">Customer ID</span>
                    <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">{customer.id}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-400">Status</span>
                    <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">
                      {customer.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex flex-col col-span-2">
                    <span className="font-medium text-gray-400">Name</span>
                    <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">{customer.name}</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-blue-900/30 p-3 sm:p-4 rounded-xl border border-blue-500/30">
                <h3 className="text-md font-semibold text-blue-300 mb-2 sm:mb-3 text-center">Contact Information</h3>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-400">Email</span>
                    <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">{customer.email || "Not provided"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-400">Phone</span>
                    <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">{customer.phone || "Not provided"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-400">Address</span>
                    <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white whitespace-pre-wrap">{customer.address || "Not provided"}</span>
                  </div>
                </div>
              </div>

              {/* Date Information */}
              <div className="bg-amber-900/30 p-3 sm:p-4 rounded-xl border border-amber-500/30">
                <h3 className="text-md font-semibold text-amber-300 mb-2 sm:mb-3 text-center">Date Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-400">Created At</span>
                    <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">{formatDate(customer.createdAt)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-400">Last Updated</span>
                    <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">{formatDate(customer.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-purple-500/30">
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition duration-200 cursor-pointer shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Function : ( FilterModal )
function FilterModal({ onClose, onApply, currentFilters }) {
  // Using useState to store the values of the filters.
  const [name, setName] = useState(currentFilters.name || "");
  const [email, setEmail] = useState(currentFilters.email || ""); 
  const [phone, setPhone] = useState(currentFilters.phone || "");
  const [address, setAddress] = useState(currentFilters.address || "");
  const [status, setStatus] = useState(currentFilters.status || "");

  // Arrow Function : ( handleApply )
  const handleApply = () => {
    // Calling the onApply function to apply the filter.
    onApply({ name, email, phone, address, status });
    // Calling the onClose function to close the modal.
    onClose();
  };

  // Arrow Function : ( handleReset )
  const handleReset = () => {
    // Setting the values of the filters to empty.
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setStatus("");
  };

  return (
    <div className="fixed inset-0 top-14 sm:top-16 bg-black/70 backdrop-blur-sm flex justify-center items-center z-40">
      <div className="bg-hyper-dark/90 rounded-xl p-4 sm:p-6 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto m-4 border border-purple-500/30">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white text-xl cursor-pointer"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold text-white hyper-text-glow mb-4 text-center">Advanced Filters</h2>

        {/* Basic Information Section */}
        <div className="mb-4">
          <h3 className="text-md font-medium text-purple-300 mb-2 text-center">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 rounded-lg border bg-hyper-dark/50 text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50"
                placeholder="Filter by name"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="p-2 rounded-lg border bg-hyper-dark/50 text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50"
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="mb-4">
          <h3 className="text-md font-medium text-purple-300 mb-2 text-center">Contact Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 rounded-lg border bg-hyper-dark/50 text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50"
                placeholder="Filter by email"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-2 rounded-lg border bg-hyper-dark/50 text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50"
                placeholder="Filter by phone"
              />
            </div>
            <div className="flex flex-col col-span-1 sm:col-span-2">
              <label className="text-gray-400 mb-1">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-2 rounded-lg border bg-hyper-dark/50 text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50"
                placeholder="Filter by address"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button 
            onClick={handleReset} 
            className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 cursor-pointer transition-colors"
          >
            Reset
          </button>
          <button 
            onClick={handleApply}
            className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 cursor-pointer transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

// Function : ( CustomerPage )
function CustomerPage() {
  // Using the useState to create a variable and then update it accordingly by the function.
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({});
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch customer data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setIsFetching(true);
        const data = await getCustomerData();

        if (data) {
          setCustomerData(data);
        } else {
          setError("No data returned from API");
        }
      } catch (err) {
        setError("Failed to fetch customer data");
        console.error("Error fetching customer data:", err);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setIsFetching(false);
        }, 1500); // Keep the fetch loader visible for at least 1.5 seconds
      }
    };

    fetchData();
  }, []);

  // Filtering the data based on the search term and other filters
  const filteredData = customerData.filter((customer) => {
    // Search across all fields
    const searchFields = [
      customer.id.toString(),
      customer.name,
      customer.email || "",
      customer.phone || "",
      customer.address || ""
    ];

    const matchesSearch = searchFields.some(field => 
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply filters
    const matchesName = !filters.name || customer.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchesEmail = !filters.email || (customer.email && customer.email.toLowerCase().includes(
      filters.email.toLowerCase()));
    const matchesPhone = !filters.phone || (customer.phone && customer.phone.includes(filters.phone));
    const matchesAddress = !filters.address || (customer.address && customer.address.toLowerCase().includes(
      filters.address.toLowerCase()));
    const matchesStatus = !filters.status || 
      (filters.status === "active" && customer.isActive) || 
      (filters.status === "inactive" && !customer.isActive);

    // Return true if all conditions are met
    return matchesSearch && matchesName && matchesEmail && matchesPhone && matchesAddress && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white hyper-text-glow text-center">Customer Management</h1>

      {/* Responsive search and filter controls */}
      <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 w-full sm:w-auto bg-hyper-dark/50 text-white border-purple-500/30"
        />
        <button
          onClick={() => setShowFilterModal(true)}
          className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <SlidersHorizontal size={16} /> Options
        </button>
      </div>

      {/* Responsive table container */}
      <div className="bg-hyper-dark/30 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-purple-500/20">
        {isFetching ? (
          <FetchLoader />
        ) : loading ? (
          <div className="p-6 text-center text-white">Loading customer data...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-400">{error}</div>
        ) : (
          <div className="relative">
            <div className="max-h-[70vh] overflow-y-auto overflow-x-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-purple-500/50 hover:[&::-webkit-scrollbar-thumb]:bg-purple-400/70">
              <table className="w-full text-sm text-left">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-purple-900/70 text-white shadow-sm">
                    <th className="p-3 whitespace-nowrap rounded-tl-lg">ID</th>
                    <th className="p-3 whitespace-nowrap">Name</th>
                    <th className="p-3 whitespace-nowrap hidden sm:table-cell">Email</th>
                    <th className="p-3 whitespace-nowrap hidden md:table-cell">Phone</th>
                    <th className="p-3 whitespace-nowrap hidden lg:table-cell">Status</th>
                    <th className="p-3 text-center whitespace-nowrap rounded-tr-lg">View</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((customer) => (
                      <tr key={customer.id} className="border-t border-purple-500/20 text-white hover:bg-white/5 transition duration-200 ease-in-out">
                        <td className="p-3 font-medium">{customer.id}</td>
                        <td className="p-3">{customer.name}</td>
                        <td className="p-3 hidden sm:table-cell">{customer.email || "—"}</td>
                        <td className="p-3 hidden md:table-cell">{customer.phone || "—"}</td>
                        <td className="p-3 hidden lg:table-cell">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            customer.isActive 
                              ? "bg-green-900/50 text-green-300 border border-green-500/30" 
                              : "bg-red-900/50 text-red-300 border border-red-500/30"
                          }`}>
                            {customer.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setSelectedCustomer(customer)}
                            className="text-purple-400 hover:text-purple-300 cursor-pointer transition"
                            aria-label="View customer details"
                          >
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-3 text-center font-medium text-gray-400">No customers found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {selectedCustomer && <ViewModal customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />}
      {showFilterModal && (
        <FilterModal
          currentFilters={filters}
          onClose={() => setShowFilterModal(false)}
          onApply={setFilters}
        />
      )}
    </div>
  );
}

// Exporting the component
export default CustomerPage;