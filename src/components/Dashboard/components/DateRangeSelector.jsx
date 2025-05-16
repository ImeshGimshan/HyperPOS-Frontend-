
import { useState , useEffect } from "react";

import { Calendar } from "lucide-react";

function DateRangeSelector ( { onRangeChange , initialStartDate , initialEndDate } ) {

  const [ startDate , setStartDate ] = useState ( initialStartDate || "" );
  const [ endDate , setEndDate ] = useState ( initialEndDate || "" );
  const [ activePreset , setActivePreset ] = useState ( null );

  useEffect ( () => {
    
    if ( initialStartDate !== startDate || initialEndDate !== endDate ) {
      setActivePreset ( null );
    }
    
  } , [ initialStartDate , initialEndDate , startDate , endDate ] );

  // Function to handle date range change.
  const handleApply = () => {
    
    if ( startDate && endDate ) {

      const start = new Date ( startDate );
      const end = new Date ( endDate );
      
      if ( start > end ) {
        
        const temp = startDate;
        setStartDate ( endDate );
        setEndDate ( temp );
        onRangeChange ( { startDate : endDate , endDate : temp } );
        
      } else {
        
        onRangeChange ( { startDate , endDate } );
        
      }
      
    }
    
  };

  // Function to handle reset.
  const handleReset = () => {
    
    setStartDate ( "" );
    setEndDate ( "" );
    setActivePreset ( null );
    onRangeChange ( { startDate : "" , endDate : "" } );
    
  };

  // Function to set preset range.
  const setPresetRange = ( days , presetName ) => {
    
    const end = new Date ();
    const start = new Date ();
    start.setDate ( end.getDate () - days );
  
    const formattedEndDate = end.toISOString ().split ( 'T' )[ 0 ];
    const formattedStartDate = start.toISOString ().split ( 'T' )[ 0 ];
  
    setStartDate ( formattedStartDate );
    setEndDate ( formattedEndDate );
    setActivePreset ( presetName );
    onRangeChange ( { startDate : formattedStartDate , endDate : formattedEndDate } );
    
  };

  const setThisMonth = () => {
    
    const today = new Date ();
    const start = new Date ( today.getFullYear () , today.getMonth () , 1 );
  
    const formattedEndDate = today.toISOString ().split ( 'T' )[ 0 ];
    const formattedStartDate = start.toISOString ().split ( 'T' )[ 0 ];
  
    setStartDate ( formattedStartDate );
    setEndDate ( formattedEndDate );
    setActivePreset ( 'thisMonth' );
    onRangeChange ( { startDate : formattedStartDate , endDate : formattedEndDate } );
    
  };

  const setLastMonth = () => {
    
    const today = new Date ();
    const lastMonth = today.getMonth () - 1;
    const year = lastMonth < 0 ? today.getFullYear () - 1 : today.getFullYear ();
    const month = lastMonth < 0 ? 11 : lastMonth;
  
    const start = new Date ( year , month , 1 );
    const end = new Date ( year , month + 1 , 0 );
  
    const formattedEndDate = end.toISOString ().split ( 'T' )[ 0 ];
    const formattedStartDate = start.toISOString ().split ( 'T' )[ 0 ];
  
    setStartDate ( formattedStartDate );
    setEndDate ( formattedEndDate );
    setActivePreset ( 'lastMonth' );
    onRangeChange ( { startDate : formattedStartDate , endDate : formattedEndDate } );
    
  };

  return (

    <div className = "bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-3 sm:p-4 md:p-6 mb-3 sm:mb-4 md:mb-6 text-center border border-purple-500/20 relative overflow-hidden">

      <div className = "absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 via-transparent to-pink-500 opacity-70"></div>
      
      <h3 className = "text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3 md:mb-4 hyper-text-glow">Sales Period Analysis</h3>
    
      <div className = "flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
        
        {/* From date input. */}
        <div className = "w-full sm:w-auto">
          <label className = "block text-xs sm:text-sm text-gray-300 mb-1 text-left">From</label>
          <div className = "relative">
            <input 
              type = "date" 
              className = "w-full sm:w-auto p-1.5 sm:p-2 pl-7 sm:pl-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800/70 text-white border-purple-500/30 text-xs sm:text-sm" 
              value = { startDate }
              onChange = { ( e ) => {
                setStartDate ( e.target.value );
                setActivePreset ( null );
              } }
              max = { endDate || undefined }
            />
            <Calendar size = { 14 } className = "absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
          </div>
        </div>
      
        {/* To date input. */}
        <div className = "w-full sm:w-auto">
          <label className = "block text-xs sm:text-sm text-gray-300 mb-1 text-left">To</label>
          <div className = "relative">
            <input 
              type = "date" 
              className = "w-full sm:w-auto p-1.5 sm:p-2 pl-7 sm:pl-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800/70 text-white border-purple-500/30 text-xs sm:text-sm" 
              value = { endDate }
              onChange = { ( e ) => {
                setEndDate ( e.target.value );
                setActivePreset ( null );
              } }
              min = { startDate || undefined }
            />
            <Calendar size = { 14 } className = "absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
          </div>
        </div>
      
        {/* Action buttons. */}
        <div className = "flex gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
          <button 
            onClick = { handleApply }
            disabled = { !startDate || !endDate }
            className = { `flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition flex items-center justify-center gap-2 text-xs sm:text-sm
              ${ ( !startDate || !endDate ) 
                ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed' 
                : 'hyper-button hover:bg-purple-800/30' }` }
          >
            <span>Apply</span>
          </button>
        
          <button 
            onClick = { handleReset }
            className = "flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 hyper-button rounded-lg hover:bg-purple-800/30 transition flex items-center justify-center gap-2 text-xs sm:text-sm"
          >
            Reset
          </button>
        </div>
        
      </div>

      <div className = "flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 mt-2">
        
        <button 
          onClick = { () => setPresetRange ( 7 , 'last7Days' ) }
          className = { `px-2 sm:px-3 py-1 rounded-lg transition text-xs ${
            activePreset === 'last7Days' 
              ? 'bg-purple-500/30 text-white border border-purple-400/50 shadow-[0_0_10px_rgba(192,38,211,0.3)]' 
              : 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50'
          }` }
        >
          Last 7 Days
        </button>
      
        <button 
          onClick = { () => setPresetRange ( 30 , 'last30Days' ) }
          className = { `px-2 sm:px-3 py-1 rounded-lg transition text-xs ${
            activePreset === 'last30Days' 
              ? 'bg-purple-500/30 text-white border border-purple-400/50 shadow-[0_0_10px_rgba(192,38,211,0.3)]' 
              : 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50'
          }` }
        >
          Last 30 Days
        </button>
      
        <button 
          onClick = { setThisMonth }
          className = { `px-2 sm:px-3 py-1 rounded-lg transition text-xs ${
            activePreset === 'thisMonth' 
              ? 'bg-purple-500/30 text-white border border-purple-400/50 shadow-[0_0_10px_rgba(192,38,211,0.3)]' 
              : 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50'
          }` }
        >
          This Month
        </button>
      
        <button 
          onClick = { setLastMonth }
          className = { `px-2 sm:px-3 py-1 rounded-lg transition text-xs ${
            activePreset === 'lastMonth' 
              ? 'bg-purple-500/30 text-white border border-purple-400/50 shadow-[0_0_10px_rgba(192,38,211,0.3)]' 
              : 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50'
          }` }
        >
          Last Month
        </button>
      
        <button 
          onClick = { () => setPresetRange ( 90 , 'last90Days' ) }
          className = { `px-2 sm:px-3 py-1 rounded-lg transition text-xs ${
            activePreset === 'last90Days' 
              ? 'bg-purple-500/30 text-white border border-purple-400/50 shadow-[0_0_10px_rgba(192,38,211,0.3)]' 
              : 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50'
          }` }
        >
          Last 90 Days
        </button>
      
        <button 
          onClick = { () => setPresetRange ( 365 , 'lastYear' ) }
          className = { `px-2 sm:px-3 py-1 rounded-lg transition text-xs ${
            activePreset === 'lastYear' 
              ? 'bg-purple-500/30 text-white border border-purple-400/50 shadow-[0_0_10px_rgba(192,38,211,0.3)]' 
              : 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50'
          }` }
        >
          Last Year
        </button>
        
      </div>

      <div className = "absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500 via-transparent to-purple-600 opacity-70"></div>
      
    </div>

  );

}

export default DateRangeSelector;
