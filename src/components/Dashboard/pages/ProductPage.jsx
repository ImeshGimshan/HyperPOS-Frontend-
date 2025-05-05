
// Imports : ( React , useState ) , ( Eye , SlidersHorizontal ) , ( productData )
import React, { useState } from "react";

import { Eye, SlidersHorizontal } from "lucide-react";

import productData from "../data/productData";

// Function : ( ViewModal )
// Passing : ( product - The data props. , onClose - To close the filter modal. )
function ViewModal ( { product, onClose } ) {

  return (

    <div className = "fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

      <div className = "bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">

        <div className = "flex justify-between items-center mb-4">

          <div className = "w-full text-center">
            <h2 className = "text-2xl font-bold text-purple-900">Product Details</h2>
          </div>

          <button
            onClick = { onClose }
            className = "absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl cursor-pointer"
          >
            &times;
          </button>

        </div>
        
        { product.image && (

          <div className = "mb-6 flex justify-center">
            <img 
              src = { product.image } 
              alt = { product.name } 
              className = "h-40 object-contain rounded-md border border-gray-200"
              onError = { ( e ) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150?text=No+Image";
              } }
            />
          </div>

        ) }
        
        <div className = "space-y-4">

          {/* Basic Information */}
          <div className = "bg-purple-50 p-3 rounded-lg">

            <h3 className = "text-md font-semibold text-purple-800 mb-2 text-center">Basic Information</h3>

            <div className = "grid grid-cols-2 gap-3 text-sm">

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Product ID</span>
                <span className = "p-2 bg-white rounded-md">{ product.id }</span>
              </div>

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Barcode</span>
                <span className = "p-2 bg-white rounded-md truncate">{ product.barcode }</span>
              </div>

              <div className = "flex flex-col col-span-2">
                <span className = "font-medium text-gray-600">Name</span>
                <span className = "p-2 bg-white rounded-md">{ product.name }</span>
              </div>

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Category ID</span>
                <span className = "p-2 bg-white rounded-md">{ product.categoryId }</span>
              </div>

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Unit</span>
                <span className = "p-2 bg-white rounded-md">{ product.unit }</span>
              </div>

            </div>

          </div>
          
          {/* Description */}
          <div className = "bg-blue-50 p-3 rounded-lg">

            <h3 className = "text-md font-semibold text-blue-800 mb-2 text-center">Description</h3>

            <div className = "text-sm">

              <div className = "flex flex-col">
                <span className = "p-2 bg-white rounded-md whitespace-pre-wrap">{ product.description || "No description available" }</span>
              </div>

            </div>

          </div>
          
          {/* Pricing */}
          <div className = "bg-green-50 p-3 rounded-lg">

            <h3 className = "text-md font-semibold text-green-800 mb-2 text-center">Pricing</h3>

            <div className = "grid grid-cols-2 gap-3 text-sm">

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Price</span>
                <span className = "p-2 bg-white rounded-md">
                  Rs { product.price.toLocaleString ( ) }
                </span>
              </div>

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Cost</span>
                <span className = "p-2 bg-white rounded-md">
                  Rs { product.cost.toLocaleString ( ) }
                </span>
              </div>

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Discount</span>
                <span className = "p-2 bg-white rounded-md">
                  { product.discount }%
                </span>
              </div>

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Profit Margin</span>
                <span className = "p-2 bg-white rounded-md">
                  { Math.round ( ( ( product.price - product.cost ) / product.price ) * 100 ) }%
                </span>
              </div>

            </div>

          </div>
          
          {/* Inventory */}
          <div className = "bg-amber-50 p-3 rounded-lg">

            <h3 className = "text-md font-semibold text-amber-800 mb-2 text-center">Inventory</h3>

            <div className = "grid grid-cols-2 gap-3 text-sm">

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Quantity</span>
                <span className = "p-2 bg-white rounded-md">{ product.quantity }</span>
              </div>

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Status</span>
                <span className = { `p-2 bg-white rounded-md ${ product.isActive ? "text-green-600" : "text-red-600" }` }>
                  { product.isActive ? "Active" : "Inactive" }
                </span>
              </div>

              <div className = "flex flex-col col-span-2">
                <span className = "font-medium text-gray-600">Stock Value</span>
                <span className = "p-2 bg-white rounded-md">
                  Rs { ( product.quantity * product.cost ).toLocaleString ( ) }
                </span>
              </div>

            </div>

          </div>

        </div>
        
        <div className = "mt-6 flex justify-center">

          <button
            onClick = { onClose }
            className = "px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition duration-200 cursor-pointer"
          >
            Close
          </button>

        </div>

      </div>

    </div>

  );

}

// Function : ( FilterModal )
// Passing : ( onClose - To close the filter modal. , onApply - To apply the filter. , categoryList - To show the category list. , currentFilters - To show the current filters. )
function FilterModal ( { onClose, onApply, categoryList, currentFilters } ) {

  // Using useState to store the values of the filters.
  const [ name, setName ] = useState ( currentFilters.name || "" );
  const [ barcode, setBarcode ] = useState ( currentFilters.barcode || "" );
  const [ categoryId, setCategoryId ] = useState ( currentFilters.categoryId || "" );
  const [ unit, setUnit ] = useState ( currentFilters.unit || "" );
  const [ minPrice, setMinPrice ] = useState ( currentFilters.minPrice || "" );
  const [ maxPrice, setMaxPrice ] = useState ( currentFilters.maxPrice || "" );
  const [ minCost, setMinCost ] = useState ( currentFilters.minCost || "" );
  const [ maxCost, setMaxCost ] = useState ( currentFilters.maxCost || "" );
  const [ minDiscount, setMinDiscount ] = useState ( currentFilters.minDiscount || "" );
  const [ maxDiscount, setMaxDiscount ] = useState ( currentFilters.maxDiscount || "" );
  const [ minQuantity, setMinQuantity ] = useState ( currentFilters.minQuantity || "" );
  const [ maxQuantity, setMaxQuantity ] = useState ( currentFilters.maxQuantity || "" );
  const [ isActive, setIsActive ] = useState ( currentFilters.isActive || "" );

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
      minCost, 
      maxCost, 
      minDiscount, 
      maxDiscount, 
      minQuantity, 
      maxQuantity, 
      isActive 
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
    setMinCost ( "" );
    setMaxCost ( "" );
    setMinDiscount ( "" );
    setMaxDiscount ( "" );
    setMinQuantity ( "" );
    setMaxQuantity ( "" );
    setIsActive ( "" );

  };

  return (

    <div className = "fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className = "bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">

        <button
          onClick = { onClose }
          className = "absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl cursor-pointer"
        >
          &times;
        </button>
        
        <h2 className = "text-xl font-semibold text-purple-900 mb-4 text-center">Advanced Filters</h2>
        
        {/* Basic Information Section */}
        <div className = "mb-4">

          <h3 className = "text-md font-medium text-purple-700 mb-2">Basic Information</h3>

          <div className = "grid grid-cols-2 gap-4 text-sm">

            <div className = "flex flex-col col-span-2">

              <label className = "text-gray-600 mb-1">Product Name</label>
              <input
                type = "text"
                value = { name }
                onChange = { ( e ) => setName ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
                placeholder = "Filter by product name"
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

              <label className = "text-gray-600 mb-1">Status</label>
              <select
                value = { isActive }
                onChange = { ( e ) => setIsActive ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
              >
                <option value = "">All</option>
                <option value = "true">Active</option>
                <option value = "false">Inactive</option>
              </select>

            </div>
            
            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Category ID</label>
              <select
                value = { categoryId }
                onChange = { ( e ) => setCategoryId ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
              >
                <option value = "">All</option>
                { categoryList.map ( ( c ) => (
                  <option key = { c } value = { c }>{ c }</option>
                ) ) }
              </select>

            </div>
            
            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Unit</label>
              <input
                type = "text"
                value = { unit }
                onChange = { ( e ) => setUnit ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
                placeholder = "Filter by unit"
              />

            </div>

          </div>

        </div>
        
        {/* Price Section */}
        <div className = "mb-4">

          <h3 className = "text-md font-medium text-purple-700 mb-2">Price & Cost</h3>

          <div className = "grid grid-cols-2 gap-4 text-sm">

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Min Price (Rs)</label>
              <input 
                type = "number" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { minPrice } 
                onChange = { ( e ) => setMinPrice ( e.target.value ) } 
              />

            </div>

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Max Price (Rs)</label>
              <input 
                type = "number" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { maxPrice }
                onChange = { ( e ) => setMaxPrice ( e.target.value ) } 
              />

            </div>
            
            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Min Cost (Rs)</label>
              <input 
                type = "number" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { minCost } 
                onChange = { ( e ) => setMinCost ( e.target.value ) } 
              />

            </div>

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Max Cost (Rs)</label>
              <input 
                type = "number" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { maxCost }
                onChange = { ( e ) => setMaxCost ( e.target.value ) } 
              />

            </div>

          </div>

        </div>
        
        {/* Inventory Section */}
        <div className = "mb-4">

          <h3 className = "text-md font-medium text-purple-700 mb-2">Inventory & Discount</h3>

          <div className = "grid grid-cols-2 gap-4 text-sm">

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Min Discount (%)</label>
              <input 
                type = "number" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { minDiscount } 
                onChange = { ( e ) => setMinDiscount ( e.target.value ) } 
              />

            </div>

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Max Discount (%)</label>
              <input 
                type = "number" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { maxDiscount }
                onChange = { ( e ) => setMaxDiscount ( e.target.value ) } 
              />

            </div>
            
            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Min Quantity</label>
              <input 
                type = "number" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { minQuantity } 
                onChange = { ( e ) => setMinQuantity ( e.target.value ) } 
              />

            </div>

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Max Quantity</label>
              <input 
                type = "number" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { maxQuantity }
                onChange = { ( e ) => setMaxQuantity ( e.target.value ) } 
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
  const [ filters, setFilters ] = useState ( { } );
  const [ isFiltering, setIsFiltering ] = useState ( false );

  // Get unique category IDs for the filter dropdown
  const categoryList = [ ...new Set ( productData.map ( ( product ) => product.categoryId ) ) ];

  // Log the product data to verify it's loaded correctly
  console.log ( "Product Data:", productData );
  console.log ( "Current Filters:", filters );

  // Filtering the data based on the search term and other filters
  const filteredData = productData.filter ( ( product ) => {

    try {

      // Search across all fields
      const searchFields = [
        product.id.toString ( ),
        product.barcode || "",
        product.name || "",
        product.categoryId?.toString ( ) || "",
        product.unit || "",
        product.description || "",
        product.price?.toString ( ) || "",
        product.cost?.toString ( ) || "",
        product.discount?.toString ( ) || "",
        product.quantity?.toString ( ) || ""
      ];
      
      const matchesSearch = searchTerm === "" || searchFields.some ( field => 
        field && field.toLowerCase ( ).includes ( searchTerm.toLowerCase ( ) )
      );

      // If we're not actively filtering, just apply the search
      if ( !isFiltering && Object.keys ( filters ).length === 0 ) {
        return matchesSearch;
      }

      // Apply filters
      const matchesName = !filters.name || 
        ( product.name && product.name.toLowerCase ( ).includes ( filters.name.toLowerCase ( ) ) );
      
      const matchesBarcode = !filters.barcode || 
        ( product.barcode && product.barcode.includes ( filters.barcode ) );
      
      const matchesCategoryId = !filters.categoryId || 
        product.categoryId?.toString ( ) === filters.categoryId;
      
      const matchesUnit = !filters.unit || 
        ( product.unit && product.unit.includes ( filters.unit ) );
      
      const matchesStatus = filters.isActive === "" || 
        product.isActive?.toString ( ) === filters.isActive;
      
      const matchesPrice = 
        ( !filters.minPrice || product.price >= +filters.minPrice ) && 
        ( !filters.maxPrice || product.price <= +filters.maxPrice );
      
      const matchesCost = 
        ( !filters.minCost || product.cost >= +filters.minCost ) && 
        ( !filters.maxCost || product.cost <= +filters.maxCost );
      
      const matchesDiscount = 
        ( !filters.minDiscount || product.discount >= +filters.minDiscount ) && 
        ( !filters.maxDiscount || product.discount <= +filters.maxDiscount );
      
      const matchesQuantity = 
        ( !filters.minQuantity || product.quantity >= +filters.minQuantity ) && 
        ( !filters.maxQuantity || product.quantity <= +filters.maxQuantity );

      // Return true if all conditions are met
      return matchesSearch && matchesName && matchesBarcode && matchesCategoryId && 
             matchesUnit && matchesStatus && matchesPrice && matchesCost && 
             matchesDiscount && matchesQuantity;

    } catch ( error ) {
      console.error ( "Error filtering product:", error, product );
      return false;
    }

  } );

  console.log ( "Filtered Data:", filteredData );

  // Function to handle applying filters
  const handleApplyFilters = ( newFilters ) => {
    setIsFiltering ( true );
    setFilters ( newFilters );
  };

  // Function to clear all filters
  const clearFilters = ( ) => {
    setIsFiltering ( false );
    setFilters ( { } );
  };

  return (

    <div className = "p-6">

      <h1 className = "text-3xl font-bold mb-6 text-purple-900 text-center">Products</h1>

      <div className = "flex flex-wrap justify-center gap-4 mb-6">

        <input
          type = "text"
          placeholder = "Search..."
          value = { searchTerm }
          onChange = { ( e ) => setSearchTerm ( e.target.value ) }
          className = "px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick = { ( ) => setShowFilterModal ( true ) }
          className = "px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition flex items-center gap-2 cursor-pointer"
        >
          <SlidersHorizontal size = { 16 } /> Options
        </button>
        { isFiltering && (
          <button
            onClick = { clearFilters }
            className = "px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition cursor-pointer"
          >
            Clear Filters
          </button>
        ) }

      </div>

      { filteredData.length === 0 ? (

        <div className = "bg-white rounded-xl shadow-md p-8 text-center">
          <p className = "text-gray-500">No products found matching your criteria.</p>
          { isFiltering && (
            <button 
              onClick = { clearFilters }
              className = "mt-4 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition cursor-pointer"
            >
              Clear Filters
            </button>
          ) }
        </div>

      ) : (

        <div className = "overflow-x-auto bg-white rounded-xl shadow-md">

          <table className = "min-w-full text-sm text-left">

            <thead>
              <tr className = "bg-purple-800 text-white">
                <th className = "p-3">ID</th>
                <th className = "p-3">Barcode</th>
                <th className = "p-3">Name</th>
                <th className = "p-3">Category ID</th>
                <th className = "p-3">Unit</th>
                <th className = "p-3">Price</th>
                <th className = "p-3">Cost</th>
                <th className = "p-3">Discount</th>
                <th className = "p-3">Quantity</th>
                <th className = "p-3">Status</th>
                <th className = "p-3 text-center">View</th>
              </tr>
            </thead>

            <tbody>
              { filteredData.map ( ( product ) => (

                <tr key = { product.id } className = "border-t hover:bg-gray-50 transition duration-200 ease-in-out">
                  <td className = "p-3">{ product.id }</td>
                  <td className = "p-3">{ product.barcode }</td>
                  <td className = "p-3">{ product.name }</td>
                  <td className = "p-3">{ product.categoryId }</td>
                  <td className = "p-3">{ product.unit }</td>
                  <td className = "p-3">Rs { product.price.toLocaleString ( ) }</td>
                  <td className = "p-3">Rs { product.cost.toLocaleString ( ) }</td>
                  <td className = "p-3">{ product.discount }%</td>
                  <td className = "p-3">{ product.quantity }</td>
                  <td className = "p-3">
                    <span className = { `${ product.isActive ? "text-green-600" : "text-red-600" }` }>
                      { product.isActive ? "Active" : "Inactive" }
                    </span>
                  </td>
                  <td className = "p-3 text-center">
                    <button
                      onClick = { ( ) => setSelectedProduct ( product ) }
                      className = "text-purple-700 hover:text-purple-900 cursor-pointer transition"
                    >
                      <Eye size = { 18 } />
                    </button>
                  </td>
                </tr>

              ) ) }
            </tbody>

          </table>

        </div>

      ) }

      { selectedProduct && <ViewModal product = { selectedProduct } onClose = { ( ) => setSelectedProduct ( null ) } /> }
      { showFilterModal && (

        <FilterModal
          categoryList = { categoryList }
          currentFilters = { filters }
          onClose = { ( ) => setShowFilterModal ( false ) }
          onApply = { handleApplyFilters }
        />

      ) }

    </div>

  );

}

export default ProductPage;
