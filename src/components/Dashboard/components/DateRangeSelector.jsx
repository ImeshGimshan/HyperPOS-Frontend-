
// Imports : ( React , useState , useEffect ).
import React , { useState , useEffect } from "react";

// Function : ( DateRangeSelector )
function DateRangeSelector ( { onRangeChange , initialStartDate , initialEndDate } ) {

  // Create state variables for start and end dates.
  const [ startDate , setStartDate ] = useState ( initialStartDate || "" );
  const [ endDate , setEndDate ] = useState ( initialEndDate || "" );
  const [ activePreset , setActivePreset ] = useState ( null );

  useEffect ( ( ) => {

    // Reset active preset when dates are changed manually.
    if ( initialStartDate !== startDate || initialEndDate !== endDate ) {
      setActivePreset ( null );
    }

  } , [ initialStartDate , initialEndDate , startDate , endDate ] );

  // Function to handle date range change.
  const handleApply = ( ) => {

    if ( startDate && endDate ) {
      onRangeChange ( { startDate , endDate } );
    }

  };

  // Function to handle reset.
  const handleReset = ( ) => {

    setStartDate ( "" );
    setEndDate ( "" );
    setActivePreset ( null );
    onRangeChange ( { startDate: "" , endDate: "" } );

  };

  // Function to set preset range.
  const setPresetRange = ( days , presetName ) => {

    const end = new Date ( );
    const start = new Date ( );
    start.setDate ( end.getDate ( ) - days );
  
    const formattedEndDate = end.toISOString ( ).split ( 'T' ) [ 0 ];
    const formattedStartDate = start.toISOString ( ).split ( 'T' ) [ 0 ];
  
    setStartDate ( formattedStartDate );
    setEndDate ( formattedEndDate );
    setActivePreset ( presetName );
    onRangeChange ( { startDate: formattedStartDate , endDate: formattedEndDate } );

  };

  // Function to set today's date.
  const setThisMonth = ( ) => {

    const today = new Date ( );
    const start = new Date ( today.getFullYear ( ) , today.getMonth ( ) , 1 );
  
    const formattedEndDate = today.toISOString ( ).split ( 'T' ) [ 0 ];
    const formattedStartDate = start.toISOString ( ).split ( 'T' ) [ 0 ];
  
    setStartDate ( formattedStartDate );
    setEndDate ( formattedEndDate );
    setActivePreset ( 'thisMonth' );
    onRangeChange ( { startDate: formattedStartDate , endDate: formattedEndDate } );

  };

  // Function to set last month's date.
  const setLastMonth = ( ) => {

    const today = new Date ( );
    const lastMonth = today.getMonth ( ) - 1;
    const year = lastMonth < 0 ? today.getFullYear ( ) - 1 : today.getFullYear ( );
    const month = lastMonth < 0 ? 11 : lastMonth;
  
    const start = new Date ( year , month , 1 );
    const end = new Date ( year , month + 1 , 0 );
  
    const formattedEndDate = end.toISOString ( ).split ( 'T' ) [ 0 ];
    const formattedStartDate = start.toISOString ( ).split ( 'T' ) [ 0 ];
  
    setStartDate ( formattedStartDate );
    setEndDate ( formattedEndDate );
    setActivePreset ( 'lastMonth' );
    onRangeChange ( { startDate: formattedStartDate , endDate: formattedEndDate } );

  };

  return (

    <div className = "bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6 text-center">
      <h3 className = "text-lg sm:text-xl font-semibold text-purple-900 mb-3 sm:mb-4">Sales Period Analysis</h3>
    
      { /*Input field to set the start date.*/ }
      <div className = "flex flex-col sm:flex-row flex-wrap justify-center items-center sm:items-end gap-3 sm:gap-4 mb-4">
        <div className = "w-full sm:w-auto">
          <label className = "block text-sm text-gray-600 mb-1">From</label>
          <input 
            type = "date" 
            className = "w-full sm:w-auto p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" 
            value = { startDate }
            onChange = { ( e ) => {

              setStartDate ( e.target.value );
              setActivePreset ( null );

            } }
          />
        </div>
      
        { /*Input field to set the end date.*/ }
        <div className = "w-full sm:w-auto">
          <label className = "block text-sm text-gray-600 mb-1">To</label>
          <input 
            type = "date" 
            className = "w-full sm:w-auto p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" 
            value = { endDate }
            onChange = { ( e ) => {

              setEndDate ( e.target.value );
              setActivePreset ( null );

            } }
          />
        </div>
      
        { /*Button to apply the selected date range.*/ }
        <button 
          onClick = { handleApply }
          className = "w-full sm:w-auto px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
        >
          Apply
        </button>
      
        { /*Button to reset the date range.*/ }
        <button 
          onClick = { handleReset }
          className = "w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          Reset
        </button>
      </div>
    
      { /*Button to set today's date.*/ }
      <div className = "flex flex-wrap justify-center gap-2 sm:gap-3 mt-2 overflow-x-auto">
        <button 
          onClick = { ( ) => setPresetRange ( 7 , 'last7Days' ) }
          className = { `px-3 sm:px-4 py-2 rounded-lg transition text-xs sm:text-sm ${
            activePreset === 'last7Days' 
              ? 'bg-purple-100 text-purple-800 border border-purple-300' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }` }
        >
          Last 7 Days
        </button>
      
        { /*Button to set last month's date.*/ }
        <button 
          onClick = { ( ) => setPresetRange ( 30 , 'last30Days' ) }
          className = { `px-3 sm:px-4 py-2 rounded-lg transition text-xs sm:text-sm ${
            activePreset === 'last30Days' 
              ? 'bg-purple-100 text-purple-800 border border-purple-300' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }` }
        >
          Last 30 Days
        </button>
      
        { /*Button to set this month's date.*/ }
        <button 
          onClick = { setThisMonth }
          className = { `px-3 sm:px-4 py-2 rounded-lg transition text-xs sm:text-sm ${
            activePreset === 'thisMonth' 
              ? 'bg-purple-100 text-purple-800 border border-purple-300' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }` }
        >
          This Month
        </button>
      
        { /*Button to set last month's date.*/ }
        <button 
          onClick = { setLastMonth }
          className = { `px-3 sm:px-4 py-2 rounded-lg transition text-xs sm:text-sm ${
            activePreset === 'lastMonth' 
              ? 'bg-purple-100 text-purple-800 border border-purple-300' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }` }
        >
          Last Month
        </button>
      
        { /*Button to set last 90 days' date.*/ }
        <button 
          onClick = { ( ) => setPresetRange ( 90 , 'last90Days' ) }
          className = { `px-3 sm:px-4 py-2 rounded-lg transition text-xs sm:text-sm ${
            activePreset === 'last90Days' 
              ? 'bg-purple-100 text-purple-800 border border-purple-300' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }` }
        >
          Last 90 Days
        </button>
      
        { /*Button to set last year's date.*/ }
        <button 
          onClick = { ( ) => setPresetRange ( 365 , 'lastYear' ) }
          className = { `px-3 sm:px-4 py-2 rounded-lg transition text-xs sm:text-sm ${
            activePreset === 'lastYear' 
              ? 'bg-purple-100 text-purple-800 border border-purple-300' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }` }
        >
          Last Year
        </button>
      </div>
    </div>

  );

}

// Exporting the DateRangeSelector component.
export default DateRangeSelector;
