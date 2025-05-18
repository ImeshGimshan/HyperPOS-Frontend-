// Imports : ( useState , useEffect ) , ( Eye , SlidersHorizontal ) , ( productData )
import { useState, useEffect } from "react";

import { Eye, SlidersHorizontal } from "lucide-react";

import { getProductData } from "../data/productData";
import FetchLoader from './FetchLoader';
import { getCategories } from "../../../API/APICategory";

import { billUrl } from "../../../API/APILinks";

// Function : ( ViewModal )
// Passing : ( product - The data props. , onClose - To close the filter modal. )
function ViewModal({ product, onClose }) {
  return (
    <div className="fixed inset-0 top-14 sm:top-16 bg-black/70 backdrop-blur-sm flex justify-center items-center z-40 p-4 sm:p-8">
      <div className="bg-hyper-dark/90 rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative border border-purple-500/30">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-purple-500/30">
          <div className="w-full text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white hyper-text-glow">Product Details</h2>
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
              {/* Product Name and Image */}
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-3 sm:p-4 rounded-xl border border-purple-500/30">
                <h3 className="text-lg font-bold text-white text-center mb-3">{product.name}</h3>
                
                {product.image ? (
                  <div className="flex justify-center">
                    <img 
                      src={`${billUrl}/${product.image}`}
                      alt={product.name} 
                      className="max-h-48 rounded-lg shadow-lg object-contain" 
                    />
                  </div>
                ) : (
                  <div className="flex justify-center py-4">
                    <span className="text-gray-400 italic">No image available</span>
                  </div>
                )}
                
                {/* Status indicator */}
                <div className="flex justify-center mt-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    product.isActive 
                      ? "bg-green-900/50 text-green-300 border border-green-500/30" 
                      : "bg-red-900/50 text-red-300 border border-red-500/30"
                  }`}>
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              
              {/* Basic Information */}
              <div className="bg-purple-900/30 p-3 sm:p-4 rounded-xl border border-purple-500/30">
                <h3 className="text-md font-semibold text-purple-300 mb-3 text-center">Basic Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center p-2 bg-hyper-dark/50 rounded-md">
                    <span className="font-medium text-gray-400 w-24">Product ID:</span>
                    <span className="text-white ml-2">{product.id}</span>
                  </div>
                  
                  <div className="flex items-center p-2 bg-hyper-dark/50 rounded-md">
                    <span className="font-medium text-gray-400 w-24">Barcode:</span>
                    <span className="text-white ml-2 font-mono">{product.barcode || "—"}</span>
                  </div>
                  
                  <div className="flex items-center p-2 bg-hyper-dark/50 rounded-md">
                    <span className="font-medium text-gray-400 w-24">Category:</span>
                    <span className="text-white ml-2">{product.categoryId}</span>
                  </div>
                  
                  <div className="flex items-center p-2 bg-hyper-dark/50 rounded-md">
                    <span className="font-medium text-gray-400 w-24">Unit:</span>
                    <span className="text-white ml-2">{product.unit}</span>
                  </div>
                </div>
              </div>

              {/* Price Information */}
              <div className="bg-blue-900/30 p-3 sm:p-4 rounded-xl border border-blue-500/30">
                <h3 className="text-md font-semibold text-blue-300 mb-3 text-center">Price Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center p-2 bg-hyper-dark/50 rounded-md">
                    <span className="font-medium text-gray-400 w-24">Base Price:</span>
                    <span className="text-white ml-2">Rs {product.price.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center p-2 bg-hyper-dark/50 rounded-md">
                    <span className="font-medium text-gray-400 w-24">Discount:</span>
                    <span className="text-pink-300 ml-2">{product.discount}%</span>
                  </div>
                  
                  <div className="flex items-center p-2 bg-green-900/30 rounded-md border border-green-500/30">
                    <span className="font-medium text-gray-300 w-24">Final Price:</span>
                    <span className="text-green-300 font-bold ml-2">
                      Rs {(product.price * (1 - product.discount / 100)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="bg-amber-900/30 p-3 sm:p-4 rounded-xl border border-amber-500/30">
                  <h3 className="text-md font-semibold text-amber-300 mb-3 text-center">Description</h3>
                  <div className="p-2 bg-hyper-dark/50 rounded-md text-white whitespace-pre-wrap">
                    {product.description}
                  </div>
                </div>
              )}
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
// Passing : ( onClose - To close the filter modal. , onApply - To apply the filter. , currentFilters - To show the current filters. )
function FilterModal({ onClose, onApply, currentFilters, categories, units }) {
  // Using useState to store the values of the filters.
  const [name, setName] = useState(currentFilters.name || "");
  const [barcode, setBarcode] = useState(currentFilters.barcode || ""); 
  const [categoryId, setCategoryId] = useState(currentFilters.categoryId || "");
  const [unit, setUnit] = useState(currentFilters.unit || "");
  const [minPrice, setMinPrice] = useState(currentFilters.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(currentFilters.maxPrice || "");
  const [minDiscount, setMinDiscount] = useState(currentFilters.minDiscount || "");
  const [maxDiscount, setMaxDiscount] = useState(currentFilters.maxDiscount || "");
  const [status, setStatus] = useState(currentFilters.status || "");

  // Arrow Function : ( handleApply )
  const handleApply = () => {
    // Calling the onApply function to apply the filter.
    onApply({ 
      name, 
      barcode, 
      categoryId, 
      unit, 
      minPrice, 
      maxPrice, 
      minDiscount, 
      maxDiscount, 
      status 
    });
    // Calling the onClose function to close the modal.
    onClose();
  };

  // Arrow Function : ( handleReset )
  const handleReset = () => {
    // Setting the values of the filters to empty.
    setName("");
    setBarcode("");
    setCategoryId("");
    setUnit("");
    setMinPrice("");
    setMaxPrice("");
    setMinDiscount("");
    setMaxDiscount("");
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
              <label className="text-gray-400 mb-1">Barcode</label>
              <input
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="p-2 rounded-lg border bg-hyper-dark/50 text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50"
                placeholder="Filter by barcode"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="p-2 rounded-lg border bg-black text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50"
              >
                <option value="">All</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="p-2 rounded-lg border bg-black text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50"
              >
                <option value="">All</option>
                {units.map((unitOption) => (
                  <option key={unitOption} value={unitOption}>{unitOption}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="p-2 rounded-lg border bg-black text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50"
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Price Information Section */}
        <div className="mb-4">
          <h3 className="text-md font-medium text-purple-300 mb-2 text-center">Price Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Min Price</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="p-2 rounded-lg border bg-hyper-dark/50 text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50"
                placeholder="Minimum price"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Max Price</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="p-2 rounded-lg border bg-hyper-dark/50 text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50"
                placeholder="Maximum price"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Min Discount (%)</label>
              <input
                type="number"
                value={minDiscount}
                onChange={(e) => setMinDiscount(e.target.value)}
                className="p-2 rounded-lg border bg-hyper-dark/50 text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50"
                placeholder="Minimum discount"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Max Discount (%)</label>
              <input
                type="number"
                value={maxDiscount}
                onChange={(e) => setMaxDiscount(e.target.value)}
                className="p-2 rounded-lg border bg-hyper-dark/50 text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50"
                placeholder="Maximum discount"
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

// Function : ( ProductPage )
function ProductPage() {
  // Using the useState to create a variable and then update it accordingly by the function.
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({});
  const [productData, setProductData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch product data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setIsFetching(true);
        
        // Fetch products
        const data = await getProductData();
        if (data) {
          setProductData(data);
        } else {
          setError("No product data returned from API");
        }
        
        // Fetch categories
        const categoryData = await getCategories();
        if (categoryData) {
          setCategories(categoryData);
        }
      } catch (err) {
        setError("Failed to fetch product data");
        console.error("Error fetching product data:", err);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setIsFetching(false);
        }, 1500);
      }
    };

    fetchData();
  }, []);

  // Extract unique units for filter dropdown
  const units = [...new Set(productData.map(product => product.unit))];

  // Filtering the data based on the search term and other filters
  const filteredData = productData.filter((product) => {
    // Search across all fields
    const searchFields = [
      product.id.toString(),
      product.name || "",
      product.barcode || "",
      product.unit || "",
      product.price?.toString() || "",
      product.discount?.toString() || ""
    ];

    const matchesSearch = searchFields.some(field => 
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply filters
    const matchesName = !filters.name || 
      (product.name && product.name.toLowerCase().includes(filters.name.toLowerCase()));
    
    const matchesBarcode = !filters.barcode || 
      (product.barcode && product.barcode.toLowerCase().includes(filters.barcode.toLowerCase()));
    
    const matchesCategory = !filters.categoryId || 
      product.categoryId?.toString() === filters.categoryId;
    
    const matchesUnit = !filters.unit || 
      product.unit === filters.unit;
    
    const matchesPrice = 
      (!filters.minPrice || product.price >= +filters.minPrice) && 
      (!filters.maxPrice || product.price <= +filters.maxPrice);
    
    const matchesDiscount = 
      (!filters.minDiscount || product.discount >= +filters.minDiscount) && 
      (!filters.maxDiscount || product.discount <= +filters.maxDiscount);
    
    const matchesStatus = !filters.status || 
      (filters.status === "active" && product.isActive) || 
      (filters.status === "inactive" && !product.isActive);

    // Return true if all conditions are met
    return matchesSearch && matchesName && matchesBarcode && matchesCategory && 
           matchesUnit && matchesPrice && matchesDiscount && matchesStatus;
  });

  // Function to get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white hyper-text-glow text-center">Product Management</h1>

      {/* Responsive search and filter controls */}
      <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
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
          <div className="p-6 text-center text-white">Loading product data...</div>
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
                    <th className="p-3 whitespace-nowrap hidden sm:table-cell">Category</th>
                    <th className="p-3 whitespace-nowrap hidden md:table-cell">Price</th>
                    <th className="p-3 whitespace-nowrap hidden lg:table-cell">Status</th>
                    <th className="p-3 text-center whitespace-nowrap rounded-tr-lg">View</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((product) => (
                      <tr key={product.id} className="border-t border-purple-500/20 text-white hover:bg-white/5 transition duration-200 ease-in-out">
                        <td className="p-3 font-medium">{product.id}</td>
                        <td className="p-3">{product.name}</td>
                        <td className="p-3 hidden sm:table-cell">{getCategoryName(product.categoryId)}</td>
                        <td className="p-3 hidden md:table-cell">
                          <div className="flex flex-col">
                            <span className="text-green-300">Rs {product.price.toLocaleString()}</span>
                            {product.discount > 0 && (
                              <span className="text-xs text-pink-300">-{product.discount}%</span>
                            )}
                          </div>
                        </td>
                        <td className="p-3 hidden lg:table-cell">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            product.isActive 
                              ? "bg-green-900/50 text-green-300 border border-green-500/30" 
                              : "bg-red-900/50 text-red-300 border border-red-500/30"
                          }`}>
                            {product.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setSelectedProduct(product)}
                            className="text-purple-400 hover:text-purple-300 cursor-pointer transition"
                            aria-label="View product details"
                          >
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-3 text-center font-medium text-gray-400">No products found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {selectedProduct && <ViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      {showFilterModal && (
        <FilterModal
          categories={categories}
          units={units}
          currentFilters={filters}
          onClose={() => setShowFilterModal(false)}
          onApply={setFilters}
        />
      )}
    </div>
  );
}

// Exporting the component
export default ProductPage;
