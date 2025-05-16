
import React from 'react';

function RecentPurchases ( { grnData } ) {

  const recentPurchases = React.useMemo ( () => {
    
    try {
      
      const validGrnData = Array.isArray ( grnData ) ? [ ...grnData ] : [];
      
      return validGrnData
        // Filter out entries without valid dates.
        .filter ( grn => {
          if ( !grn ) return false;
          const dateString = grn.updatedAt || grn.createdAt;
          if ( !dateString ) return false;
          
          const date = new Date ( dateString );
          return !isNaN ( date.getTime () );
        } )
        // Sort by date (most recent first).
        .sort ( ( a , b ) => {
          const dateA = new Date ( a.updatedAt || a.createdAt );
          const dateB = new Date ( b.updatedAt || b.createdAt );
          return dateB - dateA;
        } )
        .slice ( 0 , 5 ); // Number of recent purchases.
        
    } catch ( error ) {
      
      console.error ( "Error processing GRN data:" , error );
      return [];
      
    }
    
  } , [ grnData ] );

  const formatDate = ( dateString ) => {
    
    if ( !dateString ) return "—";
    
    try {
      
      const date = new Date ( dateString );

      if ( isNaN ( date.getTime () ) ) return "—";
      
      return date.toLocaleDateString ( 'en-GB' , {
        day : '2-digit',
        month : '2-digit',
        year : 'numeric'
      } );
      
    } catch ( error ) {
      
      console.error ( "Error formatting date:" , error );
      return "—";
      
    }
    
  };

  const formatCurrency = ( amount ) => {
    
    if ( amount === null || amount === undefined || isNaN ( Number ( amount ) ) ) return "—";
    
    try {
      
      const numAmount = Number ( amount );
      return numAmount.toLocaleString ( 'en-US' , {
        minimumFractionDigits : 2,
        maximumFractionDigits : 2
      } );
      
    } catch ( error ) {
      
      console.error ( "Error formatting currency:" , error );
      return "—";
      
    }
    
  };

  return (
    <div className = "relative w-full">
      <div className = "overflow-x-auto rounded-lg border border-purple-500/20 bg-gray-900/30 backdrop-blur-sm">
        <table className = "min-w-full text-xs sm:text-sm">
          <thead>
            <tr className = "border-b border-purple-500/30">
              <th className = "p-2 sm:p-3 text-left font-semibold text-gray-300">GRN ID</th>
              <th className = "p-2 sm:p-3 text-left font-semibold text-gray-300">Supplier ID</th>
              <th className = "p-2 sm:p-3 text-left font-semibold text-gray-300 hidden sm:table-cell">Date</th>
              <th className = "p-2 sm:p-3 text-right font-semibold text-gray-300">Amount</th>
            </tr>
          </thead>
          <tbody>
            { recentPurchases.length > 0 ? (
              recentPurchases.map ( ( grn ) => (
                <tr 
                  key = { grn.id || Math.random ().toString ( 36 ).substr ( 2 , 9 ) } 
                  className = "border-t border-purple-500/10 hover:bg-purple-500/10 transition duration-150"
                >
                  <td className = "p-2 sm:p-3 text-white">{ grn.id || "—" }</td>
                  <td className = "p-2 sm:p-3 text-gray-300">{ grn.supplierId || "—" }</td>
                  <td className = "p-2 sm:p-3 text-gray-300 hidden sm:table-cell">
                    { formatDate ( grn.createdAt || grn.updatedAt ) }
                  </td>
                  <td className = "p-2 sm:p-3 text-right font-medium text-pink-400">
                    Rs { formatCurrency ( grn.total ) }
                  </td>
                </tr>
              ) )
            ) : (
              <tr>
                <td colSpan = "4" className = "p-3 sm:p-4 text-center text-gray-400">
                  No purchases found
                </td>
              </tr>
            ) }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentPurchases;
