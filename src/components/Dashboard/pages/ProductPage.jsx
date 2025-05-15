// Imports : ( useState , useEffect ) , ( Eye , SlidersHorizontal ) , ( productData )
import { useState, useEffect } from "react";

import { Eye, SlidersHorizontal } from "lucide-react";

import { getProductData } from "../data/productData";

import FetchLoader from "../../ui/FetchLoader";
import  { billUrl} from "../../../API/APILinks"

// Function : ( ViewModal )
// Passing : ( product - The data props. , onClose - To close the filter modal. )
function ViewModal ( { product, onClose } ) {

  return (

    <div className = "fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 sm:p-8">

      <div className = "bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
        {/* Header */}
        <div className = "px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
          <div className = "w-full text-center">
            <h2 className = "text-xl sm:text-2xl font-bold text-purple-900">Product Details</h2>
          </div>
          <button
            onClick = { onClose }
            className = "absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-600 hover:text-gray-900 text-xl cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Container with padding to create space for scrollbar */}
        <div className = "px-2">
          {/* Scrollable content area with purple-themed scrollbar */}
          <div className = "max-h-[60vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-purple-50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-purple-300 hover:[&::-webkit-scrollbar-thumb]:bg-purple-400 p-4 sm:p-6">
            {/* Basic Information */}
            <div className = "space-y-4 sm:space-y-5">
              <div className = "bg-purple-50 p-3 sm:p-4 rounded-xl">
                <h3 className = "text-md font-semibold text-purple-800 mb-2 sm:mb-3 text-center">Basic Information</h3>
                <div className = "grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className = "flex flex-col">
                    <span className = "font-medium text-gray-600">Product ID</span>
                    <span className = "p-2 bg-white rounded-md shadow-sm">{ product.id }</span>
                  </div>
                  <div className = "flex flex-col">
                    <span className = "font-medium text-gray-600">Status</span>
                    <span className = {`p-2 bg-white rounded-md shadow-sm ${product.isActive ? "text-green-600" : "text-red-600"}`}>
                      { product.isActive ? "Active" : "Inactive" }
                    </span>
                  </div>
                  <div className = "flex flex-col col-span-1 sm:col-span-2">
                    <span className = "font-medium text-gray-600">Name</span>
                    <span className = "p-2 bg-white rounded-md shadow-sm">{ product.name }</span>
                  </div>
                  <div className = "flex flex-col col-span-1 sm:col-span-2">
                    <span className = "font-medium text-gray-600">Barcode</span>
                    <span className = "p-2 bg-white rounded-md shadow-sm">{ product.barcode || "Not provided" }</span>
                  </div>
                  <div className = "flex flex-col">
                    <span className = "font-medium text-gray-600">Category ID</span>
                    <span className = "p-2 bg-white rounded-md shadow-sm">{ product.categoryId }</span>
                  </div>
                  <div className = "flex flex-col">
                    <span className = "font-medium text-gray-600">Unit</span>
                    <span className = "p-2 bg-white rounded-md shadow-sm">{ product.unit }</span>
                  </div>
                </div>
              </div>

              {/* Price Information */}
              <div className = "bg-blue-50 p-3 sm:p-4 rounded-xl">
                <h3 className = "text-md font-semibold text-blue-800 mb-2 sm:mb-3 text-center">Price Information</h3>
                <div className = "grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className = "flex flex-col">
                    <span className = "font-medium text-gray-600">Price</span>
                    <span className = "p-2 bg-white rounded-md shadow-sm">Rs { product.price.toLocaleString() }</span>
                  </div>
                  <div className = "flex flex-col">
                    <span className = "font-medium text-gray-600">Discount</span>
                    <span className = "p-2 bg-white rounded-md shadow-sm">{ product.discount }%</span>
                  </div>
                  <div className = "flex flex-col col-span-1 sm:col-span-2">
                    <span className = "font-medium text-gray-600">Final Price</span>
                    <span className = "p-2 bg-white rounded-md shadow-sm font-semibold text-green-700">
                      Rs { (product.price * (1 - product.discount / 100)).toLocaleString() }
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className = "bg-amber-50 p-3 sm:p-4 rounded-xl">
                  <h3 className = "text-md font-semibold text-amber-800 mb-2 sm:mb-3 text-center">Description</h3>
                  <div className = "grid grid-cols-1 gap-3 text-sm">
                    <div className = "flex flex-col">
                      <span className = "p-2 bg-white rounded-md shadow-sm whitespace-pre-wrap">{ product.description }</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Product Image */}
              {product.image && (
                <div className = "bg-green-50 p-3 sm:p-4 rounded-xl">
                  <h3 className = "text-md font-semibold text-green-800 mb-2 sm:mb-3 text-center">Product Image</h3>
                  <div className = "flex justify-center">
                    <img 
                      src = {`${billUrl}/${product.image} `}
                      alt = { product.name } 
                      className = "max-h-48 rounded-lg shadow-sm" 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className = "px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100">
          <div className = "flex justify-center">
            <button
              onClick = { onClose }
              className = "px-4 sm:px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition duration-200 cursor-pointer shadow-sm"
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
function FilterModal ( { onClose, onApply, currentFilters, categories, units } ) {

  // Using useState to store the values of the filters.
  const [ name, setName ] = useState ( currentFilters.name || "" );
  const [ barcode, setBarcode ] = useState ( currentFilters.barcode || "" ); 
  const [ categoryId, setCategoryId ] = useState ( currentFilters.categoryId || "" );
  const [ unit, setUnit ] = useState ( currentFilters.unit || "" );
  const [ minPrice, setMinPrice ] = useState ( currentFilters.minPrice || "" );
  const [ maxPrice, setMaxPrice ] = useState ( currentFilters.maxPrice || "" );
  const [ minDiscount, setMinDiscount ] = useState ( currentFilters.minDiscount || "" );
  const [ maxDiscount, setMaxDiscount ] = useState ( currentFilters.maxDiscount || "" );
  const [ status, setStatus ] = useState ( currentFilters.status || "" );

  // Arrow Function : ( handleApply )
  const handleApply = ( ) => {

    // Calling the onApply function to apply the filter.
    onApply ( { 
      name, 
      barcode, 
      categoryId, 
      unit, 
      minPrice, 
      maxPrice, 
      minDiscount, 
      maxDiscount, 
      status 
    } );
    // Calling the onClose function to close the modal.
    onClose ( );

  };

  // Arrow Function : ( handleReset )
  const handleReset = ( ) => {

    // Setting the values of the filters to empty.
    setName ( "" );
    setBarcode ( "" );
    setCategoryId ( "" );
    setUnit ( "" );
    setMinPrice ( "" );
    setMaxPrice ( "" );
    setMinDiscount ( "" );
    setMaxDiscount ( "" );
    setStatus ( "" );

  };

  return (

    <div className = "fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className = "bg-white rounded-2xl p-4 sm:p-6 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto m-4">

        <button
          onClick = { onClose }
          className = "absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-600 hover:text-gray-900 text-xl cursor-pointer"
        >
          &times;
        </button>

        <h2 className = "text-xl font-semibold text-purple-900 mb-4 text-center">Advanced Filters</h2>

        {/* Basic Information Section */}
        <div className = "mb-4">
          <h3 className = "text-md font-medium text-purple-700 mb-2 text-center">Basic Information</h3>
          <div className = "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className = "flex flex-col">
              <label className = "text-gray-600 mb-1">Name</label>
              <input
                type = "text"
                value = { name }
                onChange = { ( e ) => setName ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
                placeholder = "Filter by name"
              />
            </div>
            <div className = "flex flex-col">
              <label className = "text-gray-600 mb-1">Barcode</label>
              <input
                type = "text"
                value = { barcode }
                onChange = { ( e ) => setBarcode ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
                placeholder = "Filter by barcode"
              />
            </div>
            <div className = "flex flex-col">
              <label className = "text-gray-600 mb-1">Category</label>
              <select
                value = { categoryId }
                onChange = { ( e ) => setCategoryId ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
              >
                <option value = "">All</option>
                { categories.map ( ( category ) => (
                  <option key = { category.id } value = { category.id }>{ category.name }</option>
                ) ) }
              </select>
            </div>
            <div className = "flex flex-col">
              <label className = "text-gray-600 mb-1">Unit</label>
              <select
                value = { unit }
                onChange = { ( e ) => setUnit ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
              >
                <option value = "">All</option>
                { units.map ( ( unitOption ) => (
                  <option key = { unitOption } value = { unitOption }>{ unitOption }</option>
                ) ) }
              </select>
            </div>
            <div className = "flex flex-col">
              <label className = "text-gray-600 mb-1">Status</label>
              <select
                value = { status }
                onChange = { ( e ) => setStatus ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
              >
                <option value = "">All</option>
                <option value = "active">Active</option>
                <option value = "inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Price Information Section */}
        <div className = "mb-4">
          <h3 className = "text-md font-medium text-purple-700 mb-2 text-center">Price Information</h3>
          <div className = "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className = "flex flex-col">
              <label className = "text-gray-600 mb-1">Min Price</label>
              <input
                type = "number"
                value = { minPrice }
                onChange = { ( e ) => setMinPrice ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
                placeholder = "Minimum price"
              />
            </div>
            <div className = "flex flex-col">
              <label className = "text-gray-600 mb-1">Max Price</label>
              <input
                type = "number"
                value = { maxPrice }
                onChange = { ( e ) => setMaxPrice ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
                placeholder = "Maximum price"
              />
            </div>
            <div className = "flex flex-col">
              <label className = "text-gray-600 mb-1">Min Discount (%)</label>
              <input
                type = "number"
                value = { minDiscount }
                onChange = { ( e ) => setMinDiscount ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
                placeholder = "Minimum discount"
              />
            </div>
            <div className = "flex flex-col">
              <label className = "text-gray-600 mb-1">Max Discount (%)</label>
              <input
                type = "number"
                value = { maxDiscount }
                onChange = { ( e ) => setMaxDiscount ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
                placeholder = "Maximum discount"
              />
            </div>
          </div>
        </div>

        <div className = "flex justify-center gap-4 mt-6">
          <button onClick = { handleReset } className = "px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 cursor-pointer">Reset</button>
          <button onClick = { handleApply } className = "px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 cursor-pointer">Apply</button>
        </div>

      </div>

    </div>

  );

}

// Function : ( ProductPage )
function ProductPage ( ) {

  // Using the useState to create a variable and then update it accordingly by the function.
  const [ selectedProduct, setSelectedProduct ] = useState ( null );
  const [ searchTerm, setSearchTerm ] = useState ( "" );
  const [ showFilterModal, setShowFilterModal ] = useState ( false );
  const [ filters, setFilters ] = useState ( {} );
  const [ productData, setProductData ] = useState ( [] );
  const [ loading, setLoading ] = useState ( true );
  const [ error, setError ] = useState ( null );
  // Add isFetching state
  const [ isFetching, setIsFetching ] = useState ( true );

  // Fetch product data from API when component mounts
  useEffect ( ( ) => {

    const fetchData = async ( ) => {

      try {

        setLoading ( true );
        setIsFetching ( true ); // Set isFetching to true
        const data = await getProductData ( );

        if ( data ) {

          setProductData ( data );

        } else {

          setError ( "No data returned from API" );

        }

      } catch ( err ) {

        setError ( "Failed to fetch product data" );
        console.error ( "Error fetching product data:", err );

      } finally {

        setLoading ( false );
        // Add timeout for isFetching
        setTimeout(() => {
          setIsFetching ( false );
        }, 3000);

      }

    };

    fetchData ( );

  }, [] );

  // Get unique categories and units from product data
  const categories = Array.isArray(productData) 
    ? [ ...new Set ( productData.map ( product => product.categoryId ) ) ]
        .map ( id => ({ id, name: `Category ${id}` }) ) 
    : [];

  const units = Array.isArray(productData) 
    ? [ ...new Set ( productData.map ( product => product.unit ) ) ] 
    : [];

  // Filtering the data based on the search term and other filters
  const filteredData = Array.isArray(productData) 
    ? productData.filter ( ( product ) => {

      // Search across all fields
      const searchFields = [
        product.id.toString ( ),
        product.name,
        product.barcode || "",
        product.unit || "",
        product.description || ""
      ];

      const matchesSearch = searchFields.some ( field => 
        field.toLowerCase ( ).includes ( searchTerm.toLowerCase ( ) )
      );

      // Apply filters
      const matchesName = !filters.name || product.name.toLowerCase ( ).includes ( filters.name.toLowerCase ( ) );
      const matchesBarcode = !filters.barcode || ( product.barcode && product.barcode.includes ( filters.barcode ) );
      const matchesCategoryId = !filters.categoryId || product.categoryId.toString() === filters.categoryId.toString();
      const matchesUnit = !filters.unit || product.unit === filters.unit;

      const matchesPrice = 
        ( !filters.minPrice || product.price >= Number(filters.minPrice) ) && 
        ( !filters.maxPrice || product.price <= Number(filters.maxPrice) );

      const matchesDiscount = 
        ( !filters.minDiscount || product.discount >= Number(filters.minDiscount) ) && 
        ( !filters.maxDiscount || product.discount <= Number(filters.maxDiscount) );

      const matchesStatus = !filters.status || 
        (filters.status === "active" && product.isActive) || 
        (filters.status === "inactive" && !product.isActive);

      // Return true if all conditions are met
      return matchesSearch && matchesName && matchesBarcode && matchesCategoryId && 
            matchesUnit && matchesPrice && matchesDiscount && matchesStatus;

    })
    : [];

  return (

    <div className = "p-4 sm:p-6">
      <h1 className = "text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-purple-900 text-center">Product Management</h1>

      {/* Responsive search and filter controls */}
      <div className = "flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
        <input
          type = "text"
          placeholder = "Search..."
          value = { searchTerm }
          onChange = { ( e ) => setSearchTerm ( e.target.value ) }
          className = "px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 w-full sm:w-auto"
        />
        <button
          onClick = { ( ) => setShowFilterModal ( true ) }
          className = "px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <SlidersHorizontal size = { 16 } /> Options
        </button>
      </div>

      {/* Responsive table container */}
      <div className = "bg-white rounded-xl shadow-md overflow-hidden">
        { isFetching ? (
          <FetchLoader />
        ) : loading ? (
          <div className = "p-6 text-center">Loading product data...</div>
        ) : error ? (
          <div className = "p-6 text-center text-red-500">{ error }</div>
        ) : (
          <div className = "relative">
            <div className = "max-h-[70vh] overflow-y-auto overflow-x-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-purple-300/50 hover:[&::-webkit-scrollbar-thumb]:bg-purple-400/70">
              <table className = "w-full text-sm text-left">
                <thead className = "sticky top-0 z-10">
                  <tr className = "bg-purple-800 text-white shadow-sm">
                    <th className = "p-3 whitespace-nowrap rounded-tl-lg">ID</th>
                    <th className = "p-3 whitespace-nowrap">Name</th>
                    <th className = "p-3 whitespace-nowrap hidden md:table-cell">Barcode</th>
                    <th className = "p-3 whitespace-nowrap hidden sm:table-cell">Category</th>
                    <th className = "p-3 whitespace-nowrap hidden lg:table-cell">Unit</th>
                    <th className = "p-3 whitespace-nowrap">Price</th>
                    <th className = "p-3 whitespace-nowrap hidden sm:table-cell">Discount</th>
                    <th className = "p-3 whitespace-nowrap">Status</th>
                    <th className = "p-3 text-center whitespace-nowrap rounded-tr-lg">View</th>
                  </tr>
                </thead>
                <tbody>
                  { filteredData.length > 0 ? (
                    filteredData.map ( ( product ) => (
                      <tr key = { product.id } className = "border-t hover:bg-gray-50 transition duration-200 ease-in-out">
                        <td className = "p-3 font-medium">{ product.id }</td>
                        <td className = "p-3 font-semibold text-purple-900">{ product.name }</td>
                        <td className = "p-3 text-gray-700 hidden md:table-cell">{ product.barcode || "—" }</td>
                        <td className = "p-3 text-gray-700 hidden sm:table-cell">{ product.categoryId }</td>
                        <td className = "p-3 text-gray-700 hidden lg:table-cell">{ product.unit }</td>
                        <td className = "p-3 text-gray-700">Rs { product.price.toLocaleString() }</td>
                        <td className = "p-3 text-gray-700 hidden sm:table-cell">{ product.discount }%</td>
                        <td className = "p-3">
                          <span className = {`px-2 py-1 rounded-full text-xs font-medium ${product.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            { product.isActive ? "Active" : "Inactive" }
                          </span>
                        </td>
                        <td className = "p-3 text-center">
                          <button
                            onClick = { ( ) => setSelectedProduct ( product ) }
                            className = "text-purple-700 hover:text-purple-900 cursor-pointer transition"
                            aria-label = "View product details"
                          >
                            <Eye size = { 18 } />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan = "9" className = "p-3 text-center font-medium text-gray-500">No products found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      { selectedProduct && <ViewModal product = { selectedProduct } onClose = { ( ) => setSelectedProduct ( null ) } /> }
      { showFilterModal && (
        <FilterModal
          categories = { categories }
          units = { units }
          currentFilters = { filters }
          onClose = { ( ) => setShowFilterModal ( false ) }
          onApply = { setFilters }
        />
      )}
    </div>

  );

}

// Exporting the component
export default ProductPage;
