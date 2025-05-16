
import React from 'react';

function RecentInvoices ( { invoiceData } ) {

  const recentInvoices = React.useMemo ( () => {
    
    try {
      
      const validInvoiceData = Array.isArray ( invoiceData ) ? [ ...invoiceData ] : [];
      
      return validInvoiceData
        // Filter out entries without valid dates.
        .filter ( invoice => {
          if ( !invoice ) return false;
          const dateString = invoice.updatedAt || invoice.createdAt;
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

        .slice ( 0 , 5 ); // Number of recent invoices.
        
    } catch ( error ) {
      
      console.error ( "Error processing invoice data:" , error );
      return [];
      
    }
    
  } , [ invoiceData ] );

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
      <div className = "overflow-x-auto rounded-lg border border-pink-500/20 bg-gray-900/30 backdrop-blur-sm">
        <table className = "min-w-full text-xs sm:text-sm">
          <thead>
            <tr className = "border-b border-pink-500/30">
              <th className = "p-2 sm:p-3 text-left font-semibold text-gray-300">Invoice ID</th>
              <th className = "p-2 sm:p-3 text-left font-semibold text-gray-300">Customer</th>
              <th className = "p-2 sm:p-3 text-left font-semibold text-gray-300 hidden sm:table-cell">Date</th>
              <th className = "p-2 sm:p-3 text-left font-semibold text-gray-300 hidden md:table-cell">Payment Method</th>
              <th className = "p-2 sm:p-3 text-right font-semibold text-gray-300">Amount</th>
            </tr>
          </thead>
          <tbody>
            { recentInvoices.length > 0 ? (
              recentInvoices.map ( ( invoice ) => (
                <tr 
                  key = { invoice.id || Math.random ().toString ( 36 ).substr ( 2 , 9 ) } 
                  className = "border-t border-pink-500/10 hover:bg-pink-500/10 transition duration-150"
                >
                  <td className = "p-2 sm:p-3 text-white">{ invoice.id || "—" }</td>
                  <td className = "p-2 sm:p-3 text-gray-300">{ invoice.customerId || "—" }</td>
                  <td className = "p-2 sm:p-3 text-gray-300 hidden sm:table-cell">
                    { formatDate ( invoice.createdAt || invoice.updatedAt ) }
                  </td>
                  <td className = "p-2 sm:p-3 text-gray-300 hidden md:table-cell">
                    { invoice.paymentMethod || "—" }
                  </td>
                  <td className = "p-2 sm:p-3 text-right font-medium text-pink-400">
                    Rs { formatCurrency ( invoice.total ) }
                  </td>
                </tr>
              ) )
            ) : (
              <tr>
                <td colSpan = "5" className = "p-3 sm:p-4 text-center text-gray-400">
                  No invoices found
                </td>
              </tr>
            ) }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentInvoices;
