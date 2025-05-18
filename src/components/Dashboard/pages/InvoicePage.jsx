// Imports : ( useEffect , useState ) , ( Eye , SlidersHorizontal ) , ( invoiceData )
import { useState, useEffect } from "react";

import { Eye, SlidersHorizontal } from "lucide-react";

import { getInvoiceData } from "../data/invoiceData";


import FetchLoader from './FetchLoader';


// Function : ( ViewModal )
// Passing : ( invoice - The data props. , onClose - To close the filter modal. )
function ViewModal ( { invoice, onClose } ) {

  // Function to format date strings
  const formatDate = ( dateString ) => {
    if ( !dateString ) return "Not available";
    const date = new Date ( dateString );
    return date.toLocaleString ( );
  };

  return (

    <div className = "fixed inset-0 top-14 sm:top-16 bg-black/70 backdrop-blur-sm flex justify-center items-center z-40 p-4">

      <div className = "bg-hyper-dark/90 rounded-xl p-4 sm:p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto border border-purple-500/30">

        <div className = "flex justify-between items-center mb-4 border-b border-purple-500/30 pb-3">
          <div className = "w-full text-center">
            <h2 className = "text-xl sm:text-2xl font-bold text-white hyper-text-glow">Invoice Details</h2>
          </div>
          <button
            onClick = { onClose }
            className = "absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white text-xl cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Basic Information */}
        <div className = "space-y-4">
          <div className = "bg-purple-900/30 p-3 rounded-lg border border-purple-500/30">
            <h3 className = "text-md font-semibold text-purple-300 mb-2 text-center">Basic Information</h3>
            <div className = "grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className = "flex flex-col">
                <span className = "font-medium text-gray-400">Invoice ID</span>
                <span className = "p-2 bg-hyper-dark/50 rounded-md text-white">{ invoice.id }</span>
              </div>
              <div className = "flex flex-col">
                <span className = "font-medium text-gray-400">Customer ID</span>
                <span className = "p-2 bg-hyper-dark/50 rounded-md text-white">{ invoice.customerId }</span>
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <div className = "bg-green-900/30 p-3 rounded-lg border border-green-500/30">
            <h3 className = "text-md font-semibold text-green-300 mb-2 text-center">Financial Details</h3>
            <div className = "grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className = "flex flex-col">
                <span className = "font-medium text-gray-400">Total Amount</span>
                <span className = "p-2 bg-hyper-dark/50 rounded-md font-semibold text-green-300">
                  Rs { invoice.total.toLocaleString() }
                </span>
              </div>
              <div className = "flex flex-col">
                <span className = "font-medium text-gray-400">Payment Method</span>
                <span className = "p-2 bg-hyper-dark/50 rounded-md text-white">{ invoice.paymentMethod }</span>
              </div>
            </div>
          </div>

          {/* Date Information */}
          <div className = "bg-amber-900/30 p-3 rounded-lg border border-amber-500/30">
            <h3 className = "text-md font-semibold text-amber-300 mb-2 text-center">Date Information</h3>
            <div className = "grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className = "flex flex-col">
                <span className = "font-medium text-gray-400">Created At</span>
                <span className = "p-2 bg-hyper-dark/50 rounded-md text-white">
                  { formatDate(invoice.createdAt) }
                </span>
              </div>
              <div className = "flex flex-col">
                <span className = "font-medium text-gray-400">Updated At</span>
                <span className = "p-2 bg-hyper-dark/50 rounded-md text-white">
                  { formatDate(invoice.updatedAt) }
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className = "mt-6 flex justify-center border-t border-purple-500/30 pt-4">
          <button
            onClick = { onClose }
            className = "px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition duration-200 cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>

    </div>

  );

}

// Function : ( FilterModal )
// Passing : ( onClose - To close the filter modal. , onApply - To apply the filter. , currentFilters - To show the current filters. )
function FilterModal ( { onClose, onApply, currentFilters, customerList, paymentMethods } ) {

  // Using useState to store the values of the filters.
  const [ customerId, setCustomerId ] = useState ( currentFilters.customerId || "" );
  const [ paymentMethod, setPaymentMethod ] = useState ( currentFilters.paymentMethod || "" ); 
  const [ minTotal, setMinTotal ] = useState ( currentFilters.minTotal || "" );
  const [ maxTotal, setMaxTotal ] = useState ( currentFilters.maxTotal || "" );
  const [ startDate, setStartDate ] = useState ( currentFilters.startDate || "" );
  const [ endDate, setEndDate ] = useState ( currentFilters.endDate || "" );

  // Arrow Function : ( handle handle )
  const handleApply = ( ) => {

    // Calling the onApply function to apply the filter.
    onApply ( { customerId, paymentMethod, minTotal, maxTotal, startDate, endDate } );
    // Calling the onClose function to close the modal.
    onClose ( );

  };

  // Arrow Function : ( handleReset )
  const handleReset = ( ) => {

    // Setting the values of the filters to empty.
    setCustomerId ( "" );
    setPaymentMethod ( "" );
    setMinTotal ( "" );
    setMaxTotal ( "" );
    setStartDate ( "" );
    setEndDate ( "" )
  };

  return (

    <div className = "fixed inset-0 top-14 sm:top-16 bg-black/70 backdrop-blur-sm flex justify-center items-center z-40">

      <div className = "bg-hyper-dark/90 rounded-xl p-4 sm:p-6 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto m-4 border border-purple-500/30">

        <button
          onClick = { onClose }
          className = "absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white text-xl cursor-pointer"
        >
          &times;
        </button>

        <h2 className = "text-xl font-semibold text-white hyper-text-glow mb-4 text-center">Advanced Filters</h2>

        {/* Basic Information Section */}
        <div className = "mb-4">
          <h3 className = "text-md font-medium text-purple-300 mb-2 text-center">Basic Information</h3>
          <div className = "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className = "flex flex-col">
              <label className = "text-gray-400 mb-1">Customer ID</label>
              <select
                value = { customerId }
                onChange = { ( e ) => setCustomerId ( e.target.value ) }
                className = "p-2 rounded-lg border bg-black text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50"
              >
                <option value = "">All</option>
                { customerList.map ( ( id ) => (
                  <option key = { id } value = { id }>{ id }</option>
                ) ) }
              </select>
            </div>
            <div className = "flex flex-col">
              <label className = "text-gray-400 mb-1">Payment Method</label>
              <select
                value = { paymentMethod }
                onChange = { ( e ) => setPaymentMethod ( e.target.value ) }
                className = "p-2 rounded-lg border bg-black text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50"
              >
                <option value = "">All</option>
                { paymentMethods.map ( ( method ) => (
                  <option key = { method } value = { method }>{ method }</option>
                ) ) }
              </select>
            </div>
          </div>
        </div>

        {/* Financial Details Section */}
      <div className = "mb-4">
          <h3 className = "text-md font-medium text-purple-300 mb-2 text-center">Financial Details</h3>
          <div className = "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className = "flex flex-col">
              <label className = "text-gray-400 mb-1">Min Total</label>
              <input
                type = "number"
                value = { minTotal }
                onChange = { ( e ) => setMinTotal ( e.target.value ) }
                className = "p-2 rounded-lg border bg-trasparent text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50"
                placeholder = "Minimum amount"
              />
            </div>
            <div className = "flex flex-col">
              <label className = "text-gray-400 mb-1">Max Total</label>
              <input
                type = "number"
                value = { maxTotal }
                onChange = { ( e ) => setMaxTotal ( e.target.value ) }
                className = "p-2 rounded-lg border bg-trasparent text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50"
                placeholder = "Maximum amount"
              />
            </div>
          </div>
        </div>

        {/* Date Range Section */}
        <div className = "mb-4">
          <h3 className = "text-md font-medium text-purple-300 mb-2 text-center">Date Range</h3>
          <div className = "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className = "flex flex-col">
              <label className = "text-gray-400 mb-1">Start Date</label>
              <input
                type = "date"
                value = { startDate }
                onChange = { ( e ) => setStartDate ( e.target.value ) }
                className = "p-2 rounded-lg border bg-trasparent text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50"
              />
            </div>
            <div className = "flex flex-col">
              <label className = "text-gray-400 mb-1">End Date</label>
              <input
                type = "date"
                value = { endDate }
                onChange = { ( e ) => setEndDate ( e.target.value ) }
                className = "p-2 rounded-lg border bg-trasparent text-white border-purple-500/30 focus:outline-none focus:border-pink-500/50"
              />
            </div>
          </div>
        </div>

        <div className = "flex justify-center gap-4 mt-6 border-t border-purple-500/30 pt-4">
          <button onClick = { handleReset } className = "px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 cursor-pointer transition-colors">Reset</button>
          <button onClick = { handleApply } className = "px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 cursor-pointer transition-colors">Apply</button>
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
  const [ filters, setFilters ] = useState ( {} );
  const [ invoiceData, setInvoiceData ] = useState ( [] );
  const [ loading, setLoading ] = useState ( true );
  const [ error, setError ] = useState ( null );
  // Add isFetching state
  const [ isFetching, setIsFetching ] = useState ( true );

  // Fetch invoice data from API when component mounts
  useEffect ( ( ) => {

    const fetchData = async ( ) => {

      try {

        setLoading ( true );
        setIsFetching ( true ); // Set isFetching to true
        const data = await getInvoiceData ( );

        if ( data ) {

          setInvoiceData ( data );

        } else {

          setError ( "No data returned from API" );

        }

      } catch ( err ) {

        setError ( "Failed to fetch invoice data" )
        console.error ( "Error fetching invoice data:", err );

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

  // Extract unique customer IDs and payment methods for filters
  const customerList = [ ...new Set ( invoiceData.map ( invoice => invoice.customerId ) ) ];
  const paymentMethods = [ ...new Set ( invoiceData.map ( invoice => invoice.paymentMethod ) ) ];

  // Function to format date for display in the table
  const formatDate = ( dateString ) => {
    if ( !dateString ) return "—";
    const date = new Date ( dateString );
    return date.toLocaleDateString ( );
  };

  // Filtering the data based on the search term and other filters
  const filteredData = invoiceData.filter ( ( invoice ) => {

    // Search across all fields
    const searchFields = [
      invoice.id.toString ( ),
      invoice.customerId.toString ( ),
      invoice.total.toString ( ),
      invoice.paymentMethod || ""
    ];

    const matchesSearch = searchFields.some ( field => 
      field.toLowerCase ( ).includes ( searchTerm.toLowerCase ( ) )
    );

    // Apply filters
    const matchesCustomer = !filters.customerId || invoice.customerId.toString() === filters.customerId;
    const matchesPaymentMethod = !filters.paymentMethod || invoice.paymentMethod === filters.paymentMethod;

    const matchesTotal = 
      ( !filters.minTotal || invoice.total >= +filters.minTotal ) && 
      ( !filters.maxTotal || invoice.total <= +filters.maxTotal );

    // Date filtering
    let matchesDate = true;
    if (filters.startDate || filters.endDate) {
      const invoiceDate = invoice.updatedAt ? new Date(invoice.updatedAt) : null;

      if (!invoiceDate) {
        matchesDate = false;
      } else {
        if (filters.startDate) {
          const startDate = new Date(filters.startDate);
          startDate.setHours(0, 0, 0, 0);
          if (invoiceDate < startDate) matchesDate = false;
        }

        if (filters.endDate) {
          const endDate = new Date(filters.endDate);
          endDate.setHours(23, 59, 59, 999);
          if (invoiceDate > endDate) matchesDate = false;
        }
      }
    }

    // Return true if all conditions are met
    return matchesSearch && matchesCustomer && matchesPaymentMethod && matchesTotal && matchesDate;

  } );

  return (

    <div className = "p-4 sm:p-6">

      <h1 className = "text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white hyper-text-glow text-center">Invoice Management</h1>

      {/* Responsive search and filter controls */}
      <div className = "flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
        <input
          type = "text"
          placeholder = "Search invoices..."
          value = { searchTerm }
          onChange = { ( e ) => setSearchTerm ( e.target.value ) }
          className = "px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 w-full sm:w-auto bg-hyper-dark/50 text-white border-purple-500/30"
        />
        <button
          onClick = { ( ) => setShowFilterModal ( true ) }
          className = "px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <SlidersHorizontal size = { 16 } /> Options
        </button>
      </div>

      {/* Responsive table container */}
      <div className = "bg-hyper-dark/30 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-purple-500/20">
        { isFetching ? (
          <FetchLoader />
        ) : loading ? (
          <div className = "p-6 text-center text-white">Loading invoice data...</div>
        ) : error ? (
          <div className = "p-6 text-center text-red-400">{ error }</div>
        ) : (
          <div className = "relative">
            <div className = "max-h-[70vh] overflow-y-auto overflow-x-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-purple-500/50 hover:[&::-webkit-scrollbar-thumb]:bg-purple-400/70">
              <table className = "w-full text-sm text-left">
                <thead className = "sticky top-0 z-10">
                  <tr className = "bg-purple-900/70 text-white shadow-sm">
                    <th className = "p-3 whitespace-nowrap rounded-tl-lg">Invoice ID</th>
                    <th className = "p-3 whitespace-nowrap">Customer ID</th>
                    <th className = "p-3 whitespace-nowrap">Total</th>
                    <th className = "p-3 whitespace-nowrap hidden sm:table-cell">Payment</th>
                    <th className = "p-3 whitespace-nowrap hidden md:table-cell">Date</th>
                    <th className = "p-3 text-center whitespace-nowrap rounded-tr-lg">View</th>
                  </tr>
                </thead>
                <tbody>
                  { filteredData.length > 0 ? (
                    filteredData.map ( ( invoice ) => (
                      <tr key = { invoice.id } className = "border-t border-purple-500/20 text-white hover:bg-white/5 transition duration-200 ease-in-out">
                        <td className = "p-3 font-medium">{ invoice.id }</td>
                        <td className = "p-3">{ invoice.customerId }</td>
                        <td className = "p-3 font-semibold text-green-300">Rs { invoice.total.toLocaleString() }</td>
                        <td className = "p-3 hidden sm:table-cell">{ invoice.paymentMethod || "—"}</td>
                        <td className = "p-3 hidden md:table-cell">{ formatDate ( invoice.updatedAt ) }</td>
                        <td className = "p-3 text-center">
                          <button
                            onClick = { ( ) => setSelectedInvoice ( invoice ) }
                            className = "text-purple-400 hover:text-purple-300 cursor-pointer transition"
                            aria-label = "View invoice details"
                          >
                            <Eye size = { 18 } />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan = "6" className = "p-3 text-center font-medium text-gray-400">No invoices found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      { selectedInvoice && <ViewModal invoice = { selectedInvoice } onClose = { ( ) => setSelectedInvoice ( null ) } /> }
      { showFilterModal && (
        <FilterModal
          customerList = { customerList }
          paymentMethods = { paymentMethods }
          currentFilters = { filters }
          onClose = { ( ) => setShowFilterModal ( false ) }
          onApply = { setFilters }
        />
      )}
    </div>

  );

}

// Exporting the component
export default InvoicePage;
