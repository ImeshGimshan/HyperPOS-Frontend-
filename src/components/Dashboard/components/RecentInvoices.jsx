
// Imports : ( React ).
import React from "react";

// Function : ( RecentInvoices ).
function RecentInvoices ( { invoiceData } ) {

  // Get the 5 most recent invoices.
  const recentInvoices = [ ...invoiceData ]
    .sort ( ( a , b ) => new Date ( b.invoice.date ) - new Date ( a.invoice.date ) )
    .slice ( 0 , 5 );

  return (

    <div className = "overflow-x-auto">
      <table className = "min-w-full text-sm">
        <thead>
          <tr className = "bg-gray-100">
            <th className = "p-3 text-left font-semibold">Invoice ID</th>
            <th className = "p-3 text-left font-semibold">Customer ID</th>
            <th className = "p-3 text-left font-semibold">Date</th>
            <th className = "p-3 text-left font-semibold">Items</th>
            <th className = "p-3 text-right font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody>
          { recentInvoices.map ( ( invoice ) => (

            <tr key = { invoice.invoice.id } className = "border-t hover:bg-gray-50 transition duration-150">
              <td className = "p-3">{ invoice.invoice.id }</td>
              <td className = "p-3">{ invoice.invoice.customerId }</td>
              <td className = "p-3">{ new Date ( invoice.invoice.date ).toLocaleDateString ( ) }</td>
              <td className = "p-3">{ invoice.items.length }</td>
              <td className = "p-3 text-right font-medium text-green-600">
                Rs { invoice.invoice.total.toLocaleString ( ) }
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
