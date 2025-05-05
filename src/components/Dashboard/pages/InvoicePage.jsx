
// Imports : ( React , useState ) , ( Eye , SlidersHorizontal ) , ( invoiceData )
import React, { useState } from "react";

import { Eye, SlidersHorizontal } from "lucide-react";

import invoiceData from "../data/invoiceData";

// Function : ( ViewModal )
// Passing : ( invoice - The data props. , onClose - To close the filter modal. )
function ViewModal ( { invoice, onClose } ) {

  return (

    <div className = "fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

      <div className = "bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto">

        <div className = "flex justify-between items-center mb-4">

          <div className = "w-full text-center">
            <h2 className = "text-2xl font-bold text-purple-900">Invoice Details</h2>
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
                <span className = "font-medium text-gray-600">Invoice ID</span>
                <span className = "p-2 bg-white rounded-md">{ invoice.invoice.id }</span>
              </div>

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Customer ID</span>
                <span className = "p-2 bg-white rounded-md">{ invoice.invoice.customerId }</span>
              </div>

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Date</span>
                <span className = "p-2 bg-white rounded-md">
                  { new Date ( invoice.invoice.date ).toLocaleDateString ( ) }
                </span>
              </div>

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Items Count</span>
                <span className = "p-2 bg-white rounded-md">{ invoice.items.length }</span>
              </div>

            </div>

          </div>
          
          {/* Financial Summary */}
          <div className = "bg-green-50 p-3 rounded-lg">

            <h3 className = "text-md font-semibold text-green-800 mb-2 text-center">Financial Summary</h3>

            <div className = "flex justify-center mb-3">

              <div className = "flex flex-col items-center">
                <span className = "font-medium text-gray-600">Total Value</span>
                <span className = "p-2 px-6 bg-white text-green-800 rounded-md text-lg font-semibold">
                  Rs { invoice.invoice.total.toLocaleString ( ) }
                </span>
              </div>

            </div>
            
            <div className = "grid grid-cols-2 gap-3 text-sm">

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Average Item Price</span>
                <span className = "p-2 bg-white rounded-md">
                  Rs { ( invoice.invoice.total / invoice.items.length ).toLocaleString ( undefined, { maximumFractionDigits: 2 } ) }
                </span>
              </div>

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Cost of Goods</span>
                <span className = "p-2 bg-white rounded-md">
                  Rs { invoice.items.reduce ( ( sum, item ) => sum + ( item.costPrice * item.quantity ), 0 ).toLocaleString ( ) }
                </span>
              </div>

              <div className = "flex flex-col col-span-2">
                <span className = "font-medium text-gray-600">Gross Profit</span>
                <span className = "p-2 bg-white rounded-md font-semibold text-green-700">
                  Rs { ( invoice.invoice.total - invoice.items.reduce ( ( sum, item ) => sum + ( item.costPrice * item.quantity ), 0 ) ).toLocaleString ( ) }
                </span>
              </div>

            </div>

          </div>
          
          {/* Items Section */}
          <div className = "bg-amber-50 p-3 rounded-lg">

            <h3 className = "text-md font-semibold text-amber-800 mb-2 text-center">Invoice Items</h3>

            <div className = "grid grid-cols-1 md:grid-cols-2 gap-3">

              { invoice.items.map ( ( item ) => (

                <div key = { item.id } className = "bg-white rounded-lg p-3 border border-amber-200 hover:shadow-md transition">

                  <div className = "flex justify-between items-start mb-2">
                    <span className = "font-medium text-purple-700">Item #{ item.id }</span>
                    <span className = "bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      Product ID: { item.productId }
                    </span>
                  </div>

                  <div className = "grid grid-cols-2 gap-2 text-sm">

                    <div>
                      <span className = "text-gray-500">Quantity:</span>
                      <span className = "ml-1 font-medium">{ item.quantity }</span>
                    </div>

                    <div>
                      <span className = "text-gray-500">Unit Price:</span>
                      <span className = "ml-1 font-medium">Rs { item.unitPrice }</span>
                    </div>

                    <div>
                      <span className = "text-gray-500">Discount:</span>
                      <span className = "ml-1 font-medium">{ item.discount }%</span>
                    </div>

                    <div>
                      <span className = "text-gray-500">Cost Price:</span>
                      <span className = "ml-1 font-medium">Rs { item.costPrice }</span>
                    </div>

                    <div className = "col-span-2">
                      <span className = "text-gray-500">Amount:</span>
                      <span className = "ml-1 font-medium text-green-600">Rs { item.amount.toLocaleString ( ) }</span>
                    </div>

                  </div>

                </div>

              ) ) }

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
// Passing : ( onClose - To close the filter modal. , onApply - To apply the filter. , customerList - To show the customer list. , currentFilters - To show the current filters. )
function FilterModal ( { onClose, onApply, customerList, currentFilters } ) {

  // Using useState to store the values of the filters.
  const [ customerId, setCustomerId ] = useState ( currentFilters.customerId || "" );
  const [ fromDate, setFromDate ] = useState ( currentFilters.fromDate || "" );
  const [ toDate, setToDate ] = useState ( currentFilters.toDate || "" );
  const [ minItems, setMinItems ] = useState ( currentFilters.minItems || "" );
  const [ maxItems, setMaxItems ] = useState ( currentFilters.maxItems || "" );
  const [ minValue, setMinValue ] = useState ( currentFilters.minValue || "" );
  const [ maxValue, setMaxValue ] = useState ( currentFilters.maxValue || "" );

  // Arrow Function : ( handleApply )
  const handleApply = ( ) => {

    // Calling the onApply function to apply the filter.
    onApply ( { 
      customerId, 
      fromDate, 
      toDate, 
      minItems, 
      maxItems, 
      minValue, 
      maxValue 
    } );
    // Calling the onClose function to close the modal.
    onClose ( );

  };

  // Arrow Function : ( handleReset )
  const handleReset = ( ) => {

    // Setting the values of the filters to empty.
    setCustomerId ( "" );
    setFromDate ( "" );
    setToDate ( "" );
    setMinItems ( "" );
    setMaxItems ( "" );
    setMinValue ( "" );
    setMaxValue ( "" );

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
        
        {/* Customer Section */}
        <div className = "mb-4">

          <h3 className = "text-md font-medium text-purple-700 mb-2">Customer Information</h3>

          <div className = "grid grid-cols-1 gap-4 text-sm">

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Customer ID</label>
              <select
                value = { customerId }
                onChange = { ( e ) => setCustomerId ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
              >
                <option value = "">All</option>
                { customerList.map ( ( c ) => (
                  <option key = { c } value = { c }>{ c }</option>
                ) ) }
              </select>

            </div>

          </div>

        </div>
        
        {/* Date Range Section */}
        <div className = "mb-4">

          <h3 className = "text-md font-medium text-purple-700 mb-2">Date Range</h3>

          <div className = "grid grid-cols-2 gap-4 text-sm">

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">From Date</label>
              <input 
                type = "date" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { fromDate } 
                onChange = { ( e ) => setFromDate ( e.target.value ) } 
              />

            </div>

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">To Date</label>
              <input
                type = "date"
                className = "p-2 rounded-lg border border-gray-300"
                value = { toDate }
                onChange = { ( e ) => setToDate ( e.target.value ) }
              />

            </div>

          </div>

        </div>
        
        {/* Items Section */}
        <div className = "mb-4">

          <h3 className = "text-md font-medium text-purple-700 mb-2">Items Count</h3>

          <div className = "grid grid-cols-2 gap-4 text-sm">

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Items (Min)</label>
              <input
                type = "number"
                className = "p-2 rounded-lg border border-gray-300"
                value = { minItems }
                onChange = { ( e ) => setMinItems ( e.target.value ) }
              />

            </div>

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Items (Max)</label>
              <input
                type = "number"
                className = "p-2 rounded-lg border border-gray-300"
                value = { maxItems }
                onChange = { ( e ) => setMaxItems ( e.target.value ) }
              />

            </div>

          </div>

        </div>
        
        {/* Value Section */}
        <div className = "mb-4">

          <h3 className = "text-md font-medium text-purple-700 mb-2">Invoice Value</h3>

          <div className = "grid grid-cols-2 gap-4 text-sm">

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Value (Min)</label>
              <input
                type = "number"
                className = "p-2 rounded-lg border border-gray-300"
                value = { minValue }
                onChange = { ( e ) => setMinValue ( e.target.value ) }
              />

            </div>

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Value (Max)</label>
              <input
                type = "number"
                className = "p-2 rounded-lg border border-gray-300"
                value = { maxValue }
                onChange = { ( e ) => setMaxValue ( e.target.value ) }
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

// Function : ( InvoicePage )
function InvoicePage ( ) {

  // Using the useState to create a variable and then update it accordingly by the function.
  const [ selectedInvoice, setSelectedInvoice ] = useState ( null );
  const [ searchTerm, setSearchTerm ] = useState ( "" );
  const [ showFilterModal, setShowFilterModal ] = useState ( false );
  const [ filters, setFilters ] = useState ( { } );

  const customerList = [ ...new Set ( invoiceData.map ( ( inv ) => inv.invoice.customerId ) ) ];

  // Filtering the data based on the search term, customer ID, date, items, and value.
  const filteredData = invoiceData.filter ( ( inv ) => {

    // Search across all fields
    const searchFields = [
      inv.invoice.id.toString ( ),
      inv.invoice.customerId.toString ( ),
      inv.invoice.date,
      inv.invoice.total.toString ( ),
      inv.items.length.toString ( )
    ];
    
    const matchesSearch = searchFields.some ( field => 
      field.toLowerCase ( ).includes ( searchTerm.toLowerCase ( ) )
    );

    // Apply filters
    const matchesCustomer = !filters.customerId || inv.invoice.customerId.toString ( ) === filters.customerId;
    
    const invDate = new Date ( inv.invoice.date );
    const fromDateObj = filters.fromDate ? new Date ( filters.fromDate ) : null;
    const toDateObj = filters.toDate ? new Date ( filters.toDate ) : null;
    
    const matchesDate = 
      ( !fromDateObj || invDate >= fromDateObj ) && 
      ( !toDateObj || invDate <= toDateObj );
    
    const matchesItems = 
      ( !filters.minItems || inv.items.length >= +filters.minItems ) && 
      ( !filters.maxItems || inv.items.length <= +filters.maxItems );
    
    const matchesValue = 
      ( !filters.minValue || inv.invoice.total >= +filters.minValue ) && 
      ( !filters.maxValue || inv.invoice.total <= +filters.maxValue );

    // Return true if all conditions are met
    return matchesSearch && matchesCustomer && matchesDate && matchesItems && matchesValue;

  } );

  return (

    <div className = "p-6">

      <h1 className = "text-3xl font-bold mb-6 text-purple-900 text-center">Invoices</h1>

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

      {/* Outputting the data in the table. */}
      <div className = "overflow-x-auto bg-white rounded-xl shadow-md">

        <table className = "min-w-full text-sm text-left">

          <thead>
            <tr className = "bg-purple-800 text-white">
              <th className = "p-3">Invoice ID</th>
              <th className = "p-3">Customer ID</th>
              <th className = "p-3">Date</th>
              <th className = "p-3">Items</th>
              <th className = "p-3">Total Value</th>
              <th className = "p-3 text-center">View</th>
            </tr>
          </thead>

          <tbody>
            {/* Mapping the filtered data to the table. */}
            { filteredData.map ( ( invoice ) => (

              <tr key = { invoice.invoice.id } className = "border-t hover:bg-gray-50 transition duration-200 ease-in-out">
                <td className = "p-3">{ invoice.invoice.id }</td>
                <td className = "p-3">{ invoice.invoice.customerId }</td>
                <td className = "p-3">{ new Date ( invoice.invoice.date ).toLocaleDateString ( ) }</td>
                <td className = "p-3">{ invoice.items.length }</td>
                <td className = "p-3">Rs { invoice.invoice.total.toLocaleString ( ) }</td>
                <td className = "p-3 text-center">
                  <button
                    onClick = { ( ) => setSelectedInvoice ( invoice ) }
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

      { selectedInvoice && <ViewModal invoice = { selectedInvoice } onClose = { ( ) => setSelectedInvoice ( null ) } /> }
      { showFilterModal && (

        <FilterModal
          customerList = { customerList }
          currentFilters = { filters }
          onClose = { ( ) => setShowFilterModal ( false ) }
          onApply = { setFilters }
        />

      ) }

    </div>

  );

}

// Exporting the component
export default InvoicePage;
