
// Imports : ( React , useState ) , ( Eye , SlidersHorizontal ) , ( inventoryData )
import React, { useState } from "react";

import { Eye , SlidersHorizontal } from "lucide-react";

import inventoryData from "../data/inventoryData";

// Function : ( ViewModal )
// Passing : ( inventory - The data props. , onClose - To close the filter modal. )
function ViewModal ( { inventory , onClose } ) {

  return (

    <div className = "fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

      <div className = "bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">

        <div className = "flex justify-between items-center mb-4">

          <div className = "w-full text-center">
            <h2 className = "text-2xl font-bold text-purple-900">Inventory Details</h2>
          </div>

          <button
            onClick = { onClose }
            className = "absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl cursor-pointer"
          >
            &times;
          </button>

        </div>
        
        <div className = "space-y-4">

          {/* Basic Information */}
          <div className = "bg-purple-50 p-3 rounded-lg">

            <h3 className = "text-md font-semibold text-purple-800 mb-2 text-center">Basic Information</h3>
            
            <div className = "grid grid-cols-2 gap-3 text-sm">

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Inventory ID</span>
                <span className = "p-2 bg-white rounded-md">{ inventory.id }</span>
              </div>

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Supplier ID</span>
                <span className = "p-2 bg-white rounded-md">{ inventory.supplierId }</span>
              </div>

            </div>

          </div>
          
          {/* Financial Information */}
          <div className = "bg-green-50 p-3 rounded-lg">

            <h3 className = "text-md font-semibold text-green-800 mb-2 text-center">Financial Information</h3>

            <div className = "grid grid-cols-1 gap-3 text-sm">

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Total Value</span>
                <span className = "p-2 bg-white rounded-md font-semibold text-green-700">
                  Rs { inventory.total.toLocaleString ( ) }
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
// Passing : ( onClose - To close the filter modal. , onApply - To apply the filter. , supplierList - To show the supplier list. , currentFilters - To show the current filters. )
function FilterModal ( { onClose , onApply , supplierList , currentFilters } ) {

  // Using useState to store the values of the filters.
  const [ supplierId , setSupplierId ] = useState ( currentFilters.supplierId || "" );
  const [ minTotal , setMinTotal ] = useState ( currentFilters.minTotal || "" );
  const [ maxTotal , setMaxTotal ] = useState ( currentFilters.maxTotal || "" );

  // Arrow Function : ( handleApply )
  const handleApply = ( ) => {

    // Calling the onApply function to apply the filter.
    onApply ( { supplierId , minTotal , maxTotal } );
    // Calling the onClose function to close the modal.
    onClose ( );

  };

  // Arrow Function : ( handleReset )
  const handleReset = ( ) => {

    // Setting the values of the filters to empty.
    setSupplierId ( "" );
    setMinTotal ( "" );
    setMaxTotal ( "" );

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
        
        {/* Supplier Information */}
        <div className = "mb-4">

          <h3 className = "text-md font-medium text-purple-700 mb-2 text-center">Supplier Information</h3>

          <div className = "grid grid-cols-1 gap-4 text-sm">

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Supplier ID</label>
              <select
                value = { supplierId }
                onChange = { ( e ) => setSupplierId ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
              >
                <option value = "">All</option>
                { supplierList.map ( ( id ) => (
                  <option key = { id } value = { id }>{ id }</option>
                ) ) }
              </select>

            </div>

          </div>

        </div>
        
        {/* Financial Information */}
        <div className = "mb-4">

          <h3 className = "text-md font-medium text-purple-700 mb-2 text-center">Financial Information</h3>

          <div className = "grid grid-cols-2 gap-4 text-sm">

            <div className = "flex flex-col">
              <label className = "text-gray-600 mb-1">Min Total (Rs)</label>
              <input 
                type = "number" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { minTotal } 
                onChange = { ( e ) => setMinTotal ( e.target.value ) } 
              />
            </div>

            <div className = "flex flex-col">
              <label className = "text-gray-600 mb-1">Max Total (Rs)</label>
              <input 
                type = "number" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { maxTotal }
                onChange = { ( e ) => setMaxTotal ( e.target.value ) } 
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

// Function : ( InventoryPage )
function InventoryPage ( ) {

  // Using the useState to create a variable and then update it accordingly by the function.
  const [ selectedInventory , setSelectedInventory ] = useState ( null );
  const [ searchTerm , setSearchTerm ] = useState ( "" );
  const [ showFilterModal , setShowFilterModal ] = useState ( false );
  const [ filters , setFilters ] = useState ( { } );

  const supplierList = [ ...new Set ( inventoryData.map ( ( inventory ) => inventory.supplierId ) ) ];

  // Filtering the data based on the search term and other filters
  const filteredData = inventoryData.filter ( ( inventory ) => {

    // Search across all fields
    const searchFields = [
      inventory.id.toString ( ),
      inventory.supplierId.toString ( ),
      inventory.total.toString ( )
    ];
    
    const matchesSearch = searchFields.some ( field => 
      field.toLowerCase ( ).includes ( searchTerm.toLowerCase ( ) )
    );

    // Apply filters
    const matchesSupplier = !filters.supplierId || inventory.supplierId.toString ( ) === filters.supplierId;
    const matchesTotal = 
      ( !filters.minTotal || inventory.total >= +filters.minTotal ) && 
      ( !filters.maxTotal || inventory.total <= +filters.maxTotal );

    // Return true if all conditions are met
    return matchesSearch && matchesSupplier && matchesTotal;

  } );

  return (

    <div className = "p-6">

      <h1 className = "text-3xl font-bold mb-6 text-purple-900 text-center">Inventories</h1>

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

      </div>

      <div className = "overflow-x-auto bg-white rounded-xl shadow-md">

        <table className = "min-w-full text-sm text-left">

          <thead>
            <tr className = "bg-purple-800 text-white">
              <th className = "p-3">ID</th>
              <th className = "p-3">Supplier ID</th>
              <th className = "p-3">Total Value</th>
              <th className = "p-3 text-center">View</th>
            </tr>
          </thead>

          <tbody>
            { filteredData.map ( ( inventory ) => (

              <tr key = { inventory.id } className = "border-t hover:bg-gray-50 transition duration-200 ease-in-out">
                <td className = "p-3">{ inventory.id }</td>
                <td className = "p-3">{ inventory.supplierId }</td>
                <td className = "p-3">Rs { inventory.total.toLocaleString ( ) }</td>
                <td className = "p-3 text-center">
                  <button
                    onClick = { ( ) => setSelectedInventory ( inventory ) }
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

      { selectedInventory && <ViewModal inventory = { selectedInventory } onClose = { ( ) => setSelectedInventory ( null ) } /> }
      { showFilterModal && (

        <FilterModal
          supplierList = { supplierList }
          currentFilters = { filters }
          onClose = { ( ) => setShowFilterModal ( false ) }
          onApply = { setFilters }
        />

      ) }

    </div>

  );

}
    
// Exporting the component
export default InventoryPage;
