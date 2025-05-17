// Imports : ( React , useState ) , ( Eye , SlidersHorizontal ) , ( purchaseData )
import { useState, useEffect } from "react";
import { Eye, SlidersHorizontal } from "lucide-react";
import { getPurchaseData } from "../data/purchaseData";
import FetchLoader from './FetchLoader';

// Function : ( ViewModal )
// Passing : ( purchase - The data props. , onClose - To close the filter modal. )
function ViewModal({ purchase, onClose }) {
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
            <h2 className="text-xl sm:text-2xl font-bold text-white hyper-text-glow">Purchase Details</h2>
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
              {/* GRN Information */}
              <div className="bg-purple-900/30 p-3 sm:p-4 rounded-xl border border-purple-500/30">
                <h3 className="text-md font-semibold text-purple-300 mb-3 text-center">Purchase Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center p-2 bg-hyper-dark/50 rounded-md">
                    <span className="font-medium text-gray-400 w-24">Purchase ID:</span>
                    <span className="text-white ml-2">{purchase.grn.id}</span>
                  </div>
              
                  <div className="flex items-center p-2 bg-hyper-dark/50 rounded-md">
                    <span className="font-medium text-gray-400 w-24">Supplier ID:</span>
                    <span className="text-white ml-2">{purchase.grn.supplierId}</span>
                  </div>
              
                  <div className="flex items-center p-2 bg-hyper-dark/50 rounded-md">
                    <span className="font-medium text-gray-400 w-24">Date:</span>
                    <span className="text-white ml-2">{formatDate(purchase.grn.updatedAt)}</span>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="bg-green-900/30 p-3 sm:p-4 rounded-xl border border-green-500/30">
                <h3 className="text-md font-semibold text-green-300 mb-3 text-center">Financial Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center p-2 bg-hyper-dark/50 rounded-md">
                    <span className="font-medium text-gray-400 w-24">Total Value:</span>
                    <span className="text-green-300 font-bold ml-2">
                      Rs {purchase.grn.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items Information */}
              <div className="bg-blue-900/30 p-3 sm:p-4 rounded-xl border border-blue-500/30">
                <h3 className="text-md font-semibold text-blue-300 mb-3 text-center">Items ({purchase.items.length})</h3>
                <div className="space-y-3">
                  {purchase.items.map((item) => (
                    <div key={item.id} className="bg-hyper-dark/50 p-3 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-blue-300">Item #{item.id}</span>
                        <span className="text-xs px-2 py-1 bg-blue-900/50 text-blue-300 rounded-full border border-blue-500/30">
                          Product #{item.productId}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-gray-400">Quantity:</span> 
                          <span className="ml-auto text-white">{item.quantity}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-gray-400">Unit Cost:</span> 
                          <span className="ml-auto text-white">Rs {item.unitCost.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-gray-400">Discount:</span> 
                          <span className="ml-auto text-pink-300">{item.discount}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-gray-400">Amount:</span> 
                          <span className="ml-auto font-semibold text-green-300">Rs {item.amount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
              className="px-4 sm:px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition duration-200 cursor-pointer shadow-sm"
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
// Passing : ( onClose - To close the filter modal. , onApply - To apply the filter. , supplierList - To show the supplier list. , currentFilters - To show the current filters. )
function FilterModal({ onClose, onApply, supplierList, currentFilters }) {
  // Using useState to store the values of the filters.
  const [supplierId, setSupplierId] = useState(currentFilters.supplierId || "");
  const [minTotal, setMinTotal] = useState(currentFilters.minTotal || "");
  const [maxTotal, setMaxTotal] = useState(currentFilters.maxTotal || "");
  const [startDate, setStartDate] = useState(currentFilters.startDate || "");
  const [endDate, setEndDate] = useState(currentFilters.endDate || "");

  // Arrow Function : ( handleApply )
  const handleApply = () => {
    // Calling the onApply function to apply the filter.
    onApply({ supplierId, minTotal, maxTotal, startDate, endDate });
    // Calling the onClose function to close the modal.
    onClose();
  };

  // Arrow Function : ( handleReset )
  const handleReset = () => {
    // Setting the values of the filters to empty.
    setSupplierId("");
    setMinTotal("");
    setMaxTotal("");
    setStartDate("");
    setEndDate("");
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

        {/* Supplier Information */}
        <div className="mb-4">
          <h3 className="text-md font-medium text-purple-300 mb-2 text-center">Supplier Information</h3>
          <div className="grid grid-cols-1 gap-4 text-sm">
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Supplier ID</label>
              <select
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                className="p-2 rounded-lg border bg-hyper-dark/50 text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50"
              >
                <option value="">All</option>
                {supplierList.map((id) => (
                  <option key={id} value={id}>{id}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div className="mb-4">
          <h3 className="text-md font-medium text-purple-300 mb-2 text-center">Financial Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Min Total (Rs)</label>
              <input 
                type="number" 
                className="p-2 rounded-lg border bg-hyper-dark/50 text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50" 
                value={minTotal} 
                onChange={(e) => setMinTotal(e.target.value)} 
                placeholder="Minimum total"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Max Total (Rs)</label>
              <input 
                type="number" 
                className="p-2 rounded-lg border bg-hyper-dark/50 text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50" 
                value={maxTotal}
                onChange={(e) => setMaxTotal(e.target.value)} 
                placeholder="Maximum total"
              />
            </div>
          </div>
        </div>

        {/* Date Range */}
        <div className="mb-4">
          <h3 className="text-md font-medium text-purple-300 mb-2 text-center">Date Range</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Start Date</label>
              <input 
                type="date" 
                className="p-2 rounded-lg border bg-hyper-dark/50 text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">End Date</label>
              <input 
                type="date" 
                className="p-2 rounded-lg border bg-hyper-dark/50 text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)} 
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6 border-t border-purple-500/30 pt-4">
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

// Function : ( PurchasePage )
function PurchasePage() {
  // Using the useState to create a variable and then update it accordingly by the function.
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({});
  const [purchaseData, setPurchaseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Add isFetching state
  const [isFetching, setIsFetching] = useState(true);

  // Function to format date for display in the table
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Fetch purchase data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setIsFetching(true);
        const data = await getPurchaseData();

        if (data) {
          setPurchaseData(data);
        } else {
          setError("No data returned from API");
        }
      } catch (err) {
        setError("Failed to fetch purchase data");
        console.error("Error fetching purchase data:", err);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setIsFetching(false);
        }, 1500); // Keep the fetch loader visible for at least 1.5 seconds
      }
    };

    fetchData();
  }, []);

  // Extract unique supplier IDs for filter dropdown
  const supplierList = [...new Set(purchaseData
    .filter(purchase => purchase && purchase.grn && purchase.grn.supplierId)
    .map(purchase => purchase.grn.supplierId))];

  // Filtering the data based on the search term and other filters
  const filteredData = purchaseData.filter((purchase) => {
    // Skip invalid entries
    if (!purchase || !purchase.grn) return false;

    // Search across all fields
    const searchFields = [
      purchase.grn.id?.toString() || '',
      purchase.grn.supplierId?.toString() || '',
      purchase.grn.total?.toString() || ''
    ];

    const matchesSearch = searchFields.some(field => 
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply filters
    const matchesSupplierId = !filters.supplierId || 
      purchase.grn.supplierId?.toString() === filters.supplierId;

    const matchesTotal = 
      (!filters.minTotal || (purchase.grn.total && purchase.grn.total >= Number(filters.minTotal))) && 
      (!filters.maxTotal || (purchase.grn.total && purchase.grn.total <= Number(filters.maxTotal)));

    const matchesDate = 
      (!filters.startDate || !purchase.grn.updatedAt || new Date(purchase.grn.updatedAt) >= new Date(filters.startDate)) && 
      (!filters.endDate || !purchase.grn.updatedAt || new Date(purchase.grn.updatedAt) <= new Date(filters.endDate + "T23:59:59"));

    // Return true if all conditions are met
    return matchesSearch && matchesSupplierId && matchesTotal && matchesDate;
  });

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white hyper-text-glow text-center">Purchase Management</h1>

      {/* Responsive search and filter controls */}
      <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
        <input
          type="text"
          placeholder="Search purchases..."
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
          <div className="p-6 text-center text-white">Loading purchase data...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-400">{error}</div>
        ) : (
          <div className="relative">
            <div className="max-h-[70vh] overflow-y-auto overflow-x-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-purple-500/50 hover:[&::-webkit-scrollbar-thumb]:bg-purple-400/70">
              <table className="w-full text-sm text-left">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-purple-900/70 text-white shadow-sm">
                    <th className="p-3 whitespace-nowrap rounded-tl-lg">Purchase ID</th>
                    <th className="p-3 whitespace-nowrap">Supplier ID</th>
                    <th className="p-3 whitespace-nowrap">Total</th>
                    <th className="p-3 whitespace-nowrap hidden md:table-cell">Items</th>
                    <th className="p-3 whitespace-nowrap hidden lg:table-cell">Date</th>
                    <th className="p-3 text-center whitespace-nowrap rounded-tr-lg">View</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((purchase) => (
                      <tr key={purchase.grn.id} className="border-t border-purple-500/20 text-white hover:bg-white/5 transition duration-200 ease-in-out">
                        <td className="p-3 font-medium">{purchase.grn.id}</td>
                        <td className="p-3">{purchase.grn.supplierId}</td>
                        <td className="p-3 text-green-300">Rs {purchase.grn.total.toLocaleString()}</td>
                        <td className="p-3 hidden md:table-cell">{purchase.items.length}</td>
                        <td className="p-3 hidden lg:table-cell">{formatDate(purchase.grn.updatedAt)}</td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setSelectedPurchase(purchase)}
                            className="text-purple-400 hover:text-purple-300 cursor-pointer transition"
                            aria-label="View purchase details"
                          >
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-3 text-center font-medium text-gray-400">No purchases found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {selectedPurchase && <ViewModal purchase={selectedPurchase} onClose={() => setSelectedPurchase(null)} />}
      {showFilterModal && (
        <FilterModal
          supplierList={supplierList}
          currentFilters={filters}
          onClose={() => setShowFilterModal(false)}
          onApply={setFilters}
        />
      )}
    </div>
  );
}

// Exporting the component
export default PurchasePage;
