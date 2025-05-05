
// Imports : ( React , useState ) , ( Eye , SlidersHorizontal ) , ( grnData )
import React , { useState } from "react";

import { Eye , SlidersHorizontal } from "lucide-react";

import grnData from "../data/grnData";

// Function : ( ViewModal )
// Passing : ( grn - The data props. , onClose - To close the filter modal. )
function ViewModal ( { grn , onClose } ) {

  return (

    <div className = "fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

      <div className = "bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">

        <div className = "flex justify-between items-center mb-4">

          <div className = "w-full text-center">
            <h2 className = "text-2xl font-bold text-purple-900">GRN Details</h2>
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
                <span className = "font-medium text-gray-600">GRN ID</span>
                <span className = "p-2 bg-white rounded-md">{ grn.id }</span>
              </div>

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Inventory ID</span>
                <span className = "p-2 bg-white rounded-md">{ grn.inventoryId }</span>
              </div>

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Product ID</span>
                <span className = "p-2 bg-white rounded-md">{ grn.productId }</span>
              </div>

            </div>

          </div>
          
          {/* Quantity & Cost */}
          <div className = "bg-blue-50 p-3 rounded-lg">

            <h3 className = "text-md font-semibold text-blue-800 mb-2 text-center">Quantity & Cost</h3>

            <div className = "grid grid-cols-2 gap-3 text-sm">

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Quantity</span>
                <span className = "p-2 bg-white rounded-md">{grn.quantity}</span>
              </div>

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Unit Cost</span>
                <span className = "p-2 bg-white rounded-md">
                  Rs { grn.unitCost.toLocaleString ( ) }
                </span>
              </div>

            </div>

          </div>
          
          {/* Financial Details */}
          <div className = "bg-green-50 p-3 rounded-lg">

            <h3 className = "text-md font-semibold text-green-800 mb-2 text-center">Financial Details</h3>

            <div className = "grid grid-cols-2 gap-3 text-sm">

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Discount</span>
                <span className = "p-2 bg-white rounded-md">
                  { grn.discount }%
                </span>
              </div>

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Amount</span>
                <span className = "p-2 bg-white rounded-md">
                  Rs { grn.amount.toLocaleString ( ) }
                </span>
              </div>

              <div className = "flex flex-col col-span-2">
                <span className = "font-medium text-gray-600">Total After Discount</span>
                <span className = "p-2 bg-white rounded-md font-semibold text-green-700">
                  Rs { ( grn.amount * ( 1 - grn.discount / 100 ) ).toLocaleString ( ) }
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
// Passing : ( onClose - To close the filter modal. , onApply - To apply the filter. , inventoryList - To show the inventory list. , currentFilters - To show the current filters. )
function FilterModal ( { onClose , onApply , inventoryList , productList , currentFilters } ) {

  // Using useState to store the values of the filters.
  const [ inventoryId , setInventoryId ] = useState ( currentFilters.inventoryId || "" );
  const [ productId , setProductId ] = useState ( currentFilters.productId || "" );
  const [ minQuantity , setMinQuantity ] = useState ( currentFilters.minQuantity || "" );
  const [ maxQuantity , setMaxQuantity ] = useState ( currentFilters.maxQuantity || "" );
  const [ minUnitCost , setMinUnitCost ] = useState ( currentFilters.minUnitCost || "" );
  const [ maxUnitCost , setMaxUnitCost ] = useState ( currentFilters.maxUnitCost || "" );
  const [ minDiscount , setMinDiscount ] = useState ( currentFilters.minDiscount || "" );
  const [ maxDiscount , setMaxDiscount ] = useState ( currentFilters.maxDiscount || "" );
  const [ minAmount , setMinAmount ] = useState ( currentFilters.minAmount || "" );
  const [ maxAmount , setMaxAmount ] = useState ( currentFilters.maxAmount || "" );

  // Arrow Function : ( handleApply )
  const handleApply = ( ) => {

    // Calling the onApply function to apply the filter.
    onApply ( {

      inventoryId, 
      productId, 
      minQuantity, 
      maxQuantity, 
      minUnitCost, 
      maxUnitCost, 
      minDiscount, 
      maxDiscount, 
      minAmount, 
      maxAmount

    } );
    // Calling the onClose function to close the modal.
    onClose ( );

  };

  // Arrow Function : ( handleReset )
  const handleReset = ( ) => {

    // Setting the values of the filters to empty.
    setInventoryId ( "" );
    setProductId ( "" );
    setMinQuantity ( "" );
    setMaxQuantity ( "" );
    setMinUnitCost ( "" );
    setMaxUnitCost ( "" );
    setMinDiscount ( "" );
    setMaxDiscount ( "" );
    setMinAmount ( "" );
    setMaxAmount ( "" );

  };

  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">

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

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Inventory ID</label>
              <select
                value = { inventoryId }
                onChange = { ( e ) => setInventoryId ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
              >
                <option value = "">All</option>
                { inventoryList.map ( ( id ) => (
                  <option key = { id } value = { id }>{ id }</option>
                ) ) }
              </select>

            </div>

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Product ID</label>
              <select
                value = { productId }
                onChange = { ( e ) => setProductId ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
              >
                <option value = "">All</option>
                { productList.map ( ( id ) => (
                  <option key = { id } value = { id }>{ id }</option>
                ) ) }
              </select>

            </div>

          </div>

        </div>
        
        {/* Quantity Section */}
        <div className = "mb-4">

          <h3 className = "text-md font-medium text-purple-700 mb-2">Quantity</h3>

          <div className = "grid grid-cols-2 gap-4 text-sm">

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Quantity ( Min )</label>
              <input 
                type = "number" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { minQuantity } 
                onChange = { ( e ) => setMinQuantity ( e.target.value ) } 
              />

            </div>

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Quantity ( Max )</label>
              <input 
                type = "number" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { maxQuantity } 
                onChange = { ( e ) => setMaxQuantity ( e.target.value ) } 
              />

            </div>

          </div>

        </div>
        
        {/* Cost & Discount Section */}
        <div className = "mb-4">

          <h3 className = "text-md font-medium text-purple-700 mb-2">Cost & Discount</h3>

          <div className = "grid grid-cols-2 gap-4 text-sm">

            <div className = "flex flex-col">
              <label className = "text-gray-600 mb-1">Unit Cost ( Min )</label>
              <input 
                type = "number" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { minUnitCost } 
                onChange = { ( e ) => setMinUnitCost ( e.target.value )} 
              />
            </div>

            <div className = "flex flex-col">
              <label className = "text-gray-600 mb-1">Unit Cost ( Max )</label>
              <input 
                type = "number" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { maxUnitCost } 
                onChange = { ( e ) => setMaxUnitCost ( e.target.value ) } 
              />
            </div>

            <div className = "flex flex-col">
              <label className = "text-gray-600 mb-1">Discount ( Min )</label>
              <input 
                type = "number" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { minDiscount } 
                onChange = { ( e ) => setMinDiscount ( e.target.value ) } 
              />
            </div>

            <div className = "flex flex-col">
              <label className = "text-gray-600 mb-1">Discount ( Max )</label>
              <input 
                type = "number" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { maxDiscount } 
                onChange = { ( e ) => setMaxDiscount ( e.target.value ) } 
              />
            </div>

          </div>

        </div>
        
        {/* Amount Section */}
        <div className = "mb-4">

          <h3 className = "text-md font-medium text-purple-700 mb-2">Amount</h3>

          <div className = "grid grid-cols-2 gap-4 text-sm">

            <div className = "flex flex-col">
              <label className = "text-gray-600 mb-1">Amount ( Min )</label>
              <input 
                type = "number" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { minAmount } 
                onChange = { ( e ) => setMinAmount ( e.target.value ) } 
              />
            </div>

            <div className = "flex flex-col">
              <label className = "text-gray-600 mb-1">Amount ( Max )</label>
              <input 
                type = "number" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { maxAmount } 
                onChange = { ( e ) => setMaxAmount ( e.target.value ) } 
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


// Function : ( GRNPage )
function GRNPage ( ) {

  // Using the useState to create a variable and then update it accordingly by the function.
  const [ selectedGRN , setSelectedGRN ] = useState ( null );
  const [ searchTerm , setSearchTerm ] = useState ( "" );
  const [ showFilterModal , setShowFilterModal ] = useState ( false );
  const [ filters , setFilters ] = useState ( { } );

  const inventoryList = [ ...new Set ( grnData.map ( ( g ) => g.inventoryId ) ) ];
  const productList = [ ...new Set ( grnData.map ( ( g ) => g.productId ) ) ];

  // Filtering the data based on the search term and other filters
  const filteredData = grnData.filter ( ( g ) => {

    // Search across all fields
    const searchFields = [

      g.id.toString ( ),
      g.inventoryId.toString ( ),
      g.productId.toString ( ),
      g.quantity.toString ( ),
      g.unitCost.toString ( ),
      g.discount.toString ( ),
      g.amount.toString ( )

    ];
    
    const matchesSearch = searchFields.some ( field => 
      field.toLowerCase ( ).includes ( searchTerm.toLowerCase ( ) )
    );

    // Apply filters
    const matchesInventory = !filters.inventoryId || g.inventoryId.toString ( ) === filters.inventoryId;
    const matchesProduct = !filters.productId || g.productId.toString ( ) === filters.productId;
    
    const matchesQuantity = 
      ( !filters.minQuantity || g.quantity >= +filters.minQuantity ) && 
      ( !filters.maxQuantity || g.quantity <= +filters.maxQuantity );
    
    const matchesUnitCost = 
      ( !filters.minUnitCost || g.unitCost >= +filters.minUnitCost ) && 
      ( !filters.maxUnitCost || g.unitCost <= +filters.maxUnitCost );
    
    const matchesDiscount = 
      ( !filters.minDiscount || g.discount >= +filters.minDiscount ) && 
      ( !filters.maxDiscount || g.discount <= +filters.maxDiscount );
    
    const matchesAmount = 
      ( !filters.minAmount || g.amount >= +filters.minAmount ) && 
      ( !filters.maxAmount || g.amount <= +filters.maxAmount );

    // Return true if all conditions are met
    return matchesSearch && matchesInventory && matchesProduct && matchesQuantity && 
           matchesUnitCost && matchesDiscount && matchesAmount;

  } );

  return (

    <div className = "p-6">

      <h1 className = "text-3xl font-bold mb-6 text-purple-900 text-center">Goods Received Notes</h1>

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
              <th className = "p-3">GRN ID</th>
              <th className = "p-3">Inventory ID</th>
              <th className = "p-3">Product ID</th>
              <th className = "p-3">Quantity</th>
              <th className = "p-3">Unit Cost</th>
              <th className = "p-3">Discount</th>
              <th className = "p-3">Amount</th>
              <th className = "p-3 text-center">View</th>
            </tr>
          </thead>
          <tbody>
            { filteredData.map ( ( grn ) => (

              <tr key = { grn.id } className = "border-t hover:bg-gray-50 transition duration-200 ease-in-out">
                <td className = "p-3">{ grn.id }</td>
                <td className = "p-3">{ grn.inventoryId }</td>
                <td className = "p-3"> { grn.productId }</td>
                <td className = "p-3">{ grn.quantity }</td>
                <td className = "p-3">Rs { grn.unitCost.toLocaleString ( ) }</td>
                <td className = "p-3">{ grn.discount }%</td>
                <td className = "p-3">Rs { grn.amount.toLocaleString( ) }</td>
                <td className = "p-3 text-center">
                  <button
                    onClick = { ( ) => setSelectedGRN ( grn ) }
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

      { selectedGRN && <ViewModal grn = { selectedGRN } onClose = { ( ) => setSelectedGRN ( null ) } />}
      { showFilterModal && (

        <FilterModal
          inventoryList = { inventoryList }
          productList = { productList }
          currentFilters = { filters }
          onClose = { ( ) => setShowFilterModal ( false ) }
          onApply = { setFilters }
        />

      ) }

    </div>

  );

}

// Exporting the component
export default GRNPage;
