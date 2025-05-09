
// Function : ( RecentInvoices ).
function RecentInvoices ( { invoiceData } ) {

  // Get the 5 most recent invoices.
  const recentInvoices = [ ...invoiceData ]
    .filter ( invoice => invoice && (invoice.updatedAt || invoice.createdAt) )
    .sort ( ( a , b ) => {
      const dateA = new Date ( a.updatedAt || a.createdAt );
      const dateB = new Date ( b.updatedAt || b.createdAt );
      return dateB - dateA;
    } )
    .slice ( 0 , 5 );

  // Function to format date
  const formatDate = ( dateString ) => {
    if ( !dateString ) return "—";
    return new Date ( dateString ).toLocaleDateString ( );
  };

  return (

    <div className = "overflow-x-auto">
      <table className = "min-w-full text-sm">
        <thead>
          <tr className = "bg-gray-100">
            <th className = "p-3 text-left font-semibold">Invoice ID</th>
            <th className = "p-3 text-left font-semibold">Customer ID</th>
            <th className = "p-3 text-left font-semibold">Date</th>
            <th className = "p-3 text-left font-semibold">Payment Method</th>
            <th className = "p-3 text-right font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody>
          { recentInvoices.map ( ( invoice ) => (

            <tr key = { invoice.id } className = "border-t hover:bg-gray-50 transition duration-150">
              <td className = "p-3">{ invoice.id }</td>
              <td className = "p-3">{ invoice.customerId }</td>
              <td className = "p-3">{ formatDate ( invoice.updatedAt || invoice.createdAt ) }</td>
              <td className = "p-3">{ invoice.paymentMethod }</td>
              <td className = "p-3 text-right font-medium text-green-600">
                Rs { invoice.total.toLocaleString ( ) }
              </td>
            </tr>

          ) ) }
          { recentInvoices.length === 0 && (

            <tr>
              <td colSpan = "5" className="p-4 text-center text-gray-500">No invoices found</td>
            </tr>

          ) }
        </tbody>
      </table>
    </div>

  );

}

// Exporting the RecentInvoices component.
export default RecentInvoices;
