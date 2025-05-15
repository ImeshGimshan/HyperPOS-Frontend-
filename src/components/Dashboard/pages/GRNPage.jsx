
// Imports : ( useEffect , useState ) , ( Eye , SlidersHorizontal ) , ( grnData )
import { useState, useEffect } from "react";

import { Eye, SlidersHorizontal } from "lucide-react";

import { getGRNData } from "../data/grnData";


import FetchLoader from './FetchLoader';



// Function : ( ViewModal )
// Passing : ( grn - The data props. , onClose - To close the filter modal. )
function ViewModal ( { grn, onClose } ) {

  // Function to format date strings
  const formatDate = ( dateString ) => {
    if ( !dateString ) return "Not available";
    const date = new Date ( dateString );
    return date.toLocaleString ( );
  };

  return (

    <div className = "fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

      <div className = "bg-white rounded-2xl p-4 sm:p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">

        <div className = "flex justify-between items-center mb-4">

          <div className = "w-full text-center">
            <h2 className = "text-xl sm:text-2xl font-bold text-purple-900">GRN Details</h2>
          </div>

          <button
            onClick = { onClose }
            className = "absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-600 hover:text-gray-900 text-xl cursor-pointer"
          >
            &times;
          </button>

        </div>

        <div className = "space-y-4">

          {/* Basic Information */}
          <div className = "bg-purple-50 p-3 rounded-lg">

            <h3 className = "text-md font-semibold text-purple-800 mb-2 text-center">Basic Information</h3>

            <div className = "grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">GRN ID</span>
                <span className = "p-2 bg-white rounded-md">{ grn.id }</span>
              </div>

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Supplier ID</span>
                <span className = "p-2 bg-white rounded-md">{ grn.supplierId }</span>
              </div>

            </div>

          </div>

          {/* Financial Details */}
          <div className = "bg-green-50 p-3 rounded-lg">

            <h3 className = "text-md font-semibold text-green-800 mb-2 text-center">Financial Details</h3>

            <div className = "grid grid-cols-1 gap-3 text-sm">

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Total Amount</span>
                <span className = "p-2 bg-white rounded-md font-semibold text-green-700">
                  Rs { grn.total.toLocaleString ( ) }
                </span>
              </div>

            </div>

          </div>

          {/* Date Information */}
          <div className = "bg-amber-50 p-3 rounded-lg">

            <h3 className = "text-md font-semibold text-amber-800 mb-2 text-center">Date Information</h3>

            <div className = "grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Created At</span>
                <span className = "p-2 bg-white rounded-md">
                  { formatDate ( grn.createdAt ) }
                </span>
              </div>

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Updated At</span>
                <span className = "p-2 bg-white rounded-md">
                  { formatDate ( grn.updatedAt ) }
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
function FilterModal ( { onClose, onApply, supplierList, currentFilters } ) {

  // Using useState to store the values of the filters.
  const [ supplierId, setSupplierId ] = useState ( currentFilters.supplierId || "" );
  const [ minTotal, setMinTotal ] = useState ( currentFilters.minTotal || "" );
  const [ maxTotal, setMaxTotal ] = useState ( currentFilters.maxTotal || "" );
  const [ startDate, setStartDate ] = useState ( currentFilters.startDate || "" );
  const [ endDate, setEndDate ] = useState ( currentFilters.endDate || "" );

  // Arrow Function : ( handleApply )
  const handleApply = ( ) => {

    // Calling the onApply function to apply the filter.
    onApply ( {
      supplierId, 
      minTotal, 
      maxTotal, 
      startDate, 
      endDate
    } );
    // Calling the onClose function to close the modal.
    onClose ( );

  };

  // Arrow Function : ( handleReset )
  const handleReset = ( ) => {

    // Setting the values of the filters to empty.
    setSupplierId ( "" );
    setMinTotal ( "" );
    setMaxTotal ( "" );
    setStartDate ( "" );
    setEndDate ( "" );

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

          <h3 className = "text-md font-medium text-purple-700 mb-2">Basic Information</h3>

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

        {/* Amount Section */}
        <div className = "mb-4">

          <h3 className = "text-md font-medium text-purple-700 mb-2">Total Amount</h3>

          <div className = "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Min Total</label>
              <input 
                type = "number" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { minTotal } 
                onChange = { ( e ) => setMinTotal ( e.target.value ) } 
              />

            </div>

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Max Total</label>
              <input 
                type = "number" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { maxTotal } 
                onChange = { ( e ) => setMaxTotal ( e.target.value ) } 
              />

            </div>

          </div>

        </div>

        {/* Date Section */}
        <div className = "mb-4">

          <h3 className = "text-md font-medium text-purple-700 mb-2">Date Range</h3>

          <div className = "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

            <div className = "flex flex-col">
              <label className = "text-gray-600 mb-1">Start Date</label>
              <input 
                type = "date" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { startDate } 
                onChange = { ( e ) => setStartDate ( e.target.value ) } 
              />
            </div>

            <div className = "flex flex-col">
              <label className = "text-gray-600 mb-1">End Date</label>
              <input 
                type = "date" 
                className = "p-2 rounded-lg border border-gray-300" 
                value = { endDate } 
                onChange = { ( e ) => setEndDate ( e.target.value ) } 
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
  const [ selectedGRN, setSelectedGRN ] = useState ( null );
  const [ searchTerm, setSearchTerm ] = useState ( "" );
  const [ showFilterModal, setShowFilterModal ] = useState ( false );
  const [ filters, setFilters ] = useState ( {} );
  const [ grnData, setGRNData ] = useState ( [] );
  const [ loading, setLoading ] = useState ( true );
  const [ error, setError ] = useState ( null );
  const [ isFetching, setIsFetching ] = useState ( true );

  // Fetch GRN data from API when component mounts
  useEffect ( ( ) => {

    const fetchData = async ( ) => {

      try {

        setLoading ( true );
        setIsFetching ( true );
        const data = await getGRNData ( );

        if ( data ) {

          setGRNData ( data );

        } else {

          setError ( "No data returned from API" );

        }

      } catch ( err ) {

        setError ( "Failed to fetch GRN data" );
        console.error ( "Error fetching GRN data:", err );

      } finally {

        setLoading ( false );
        setTimeout(() => {
          setIsFetching ( false );
        }, 3000);

      }

    };

    fetchData ( );

  }, [] );

  const supplierList = [ ...new Set ( grnData.map ( ( g ) => g.supplierId ) ) ];

  // Function to format date for display in the table
  const formatDate = ( dateString ) => {
    if ( !dateString ) return "—";
    const date = new Date ( dateString );
    return date.toLocaleDateString ( );
  };

  // Filtering the data based on the search term and other filters
  const filteredData = grnData.filter ( ( g ) => {

    // Search across all fields
    const searchFields = [
      g.id.toString ( ),
      g.supplierId?.toString() || "",
      g.total?.toString() || ""
    ];

    const matchesSearch = searchFields.some ( field => 
      field.toLowerCase ( ).includes ( searchTerm.toLowerCase ( ) )
    );

    // Apply filters
    const matchesSupplier = !filters.supplierId || g.supplierId?.toString() === filters.supplierId;

    const matchesTotal = 
      ( !filters.minTotal || g.total >= +filters.minTotal ) && 
      ( !filters.maxTotal || g.total <= +filters.maxTotal );

    // Date filtering
    let matchesDate = true;
    if ( filters.startDate || filters.endDate ) {
      const grnDate = g.updatedAt ? new Date ( g.updatedAt ) : null;

      if ( !grnDate ) {
        matchesDate = false;
      } else {
        if ( filters.startDate ) {
          const startDate = new Date ( filters.startDate );
          startDate.setHours ( 0, 0, 0, 0 );
          if ( grnDate < startDate ) matchesDate = false;
        }

        if ( filters.endDate ) {
          const endDate = new Date ( filters.endDate );
          endDate.setHours ( 23, 59, 59, 999 );
          if ( grnDate > endDate ) matchesDate = false;
        }
      }
    }

    // Return true if all conditions are met
    return matchesSearch && matchesSupplier && matchesTotal && matchesDate;

  } );

  return (

    <div className = "p-4 sm:p-6">

      <h1 className = "text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-purple-900 text-center">Goods Received Notes</h1>

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
      <div className = "overflow-x-auto bg-white rounded-xl shadow-md">
        {isFetching ? (
          <FetchLoader />
        ) : loading ? (
          <div className = "p-6 text-center">Loading GRN data...</div>
        ) : error ? (
          <div className = "p-6 text-center text-red-500">{error}</div>
        ) : (
          <div className = "relative">
            <div className = "max-h-[70vh] overflow-y-auto overflow-x-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-purple-300/50 hover:[&::-webkit-scrollbar-thumb]:bg-purple-400/70">
              <table className = "w-full text-sm text-left">
                <thead className = "sticky top-0 z-10">
                  <tr className = "bg-purple-800 text-white shadow-sm">
                    <th className = "p-3 whitespace-nowrap rounded-tl-lg">GRN ID</th>
                    <th className = "p-3 whitespace-nowrap">Supplier ID</th>
                    <th className = "p-3 whitespace-nowrap">Total Amount</th>
                    <th className = "p-3 whitespace-nowrap hidden md:table-cell">Created At</th>
                    <th className = "p-3 whitespace-nowrap hidden lg:table-cell">Updated At</th>
                    <th className = "p-3 text-center whitespace-nowrap rounded-tr-lg">View</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map ( ( grn ) => (
                      <tr key = { grn.id } className = "border-t hover:bg-gray-50 transition duration-200 ease-in-out">
                        <td className = "p-3 font-medium">{ grn.id }</td>
                        <td className = "p-3">{ grn.supplierId || "—" }</td>
                        <td className = "p-3 font-semibold text-green-700">Rs { grn.total?.toLocaleString() || "—" }</td>
                        <td className = "p-3 hidden md:table-cell">{ formatDate(grn.createdAt) }</td>
                        <td className = "p-3 hidden lg:table-cell">{ formatDate(grn.updatedAt) }</td>
                        <td className = "p-3 text-center">
                          <button
                            onClick = { ( ) => setSelectedGRN ( grn ) }
                            className = "text-purple-700 hover:text-purple-900 cursor-pointer transition"
                            aria-label = "View GRN details"
                          >
                            <Eye size = { 18 } />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-3 text-center font-medium text-gray-500">No GRN records found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      { selectedGRN && <ViewModal grn = { selectedGRN } onClose = { ( ) => setSelectedGRN ( null ) } />}
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
export default GRNPage;
