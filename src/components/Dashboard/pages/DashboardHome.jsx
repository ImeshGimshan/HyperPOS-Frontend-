
// Imports : ( useEffect , useState , useMemo ) , ( SummaryCard , SalesTrendChart , TopProductsChart , RecentInvoices , InventoryStatus , DateRangeSelector ) , ( invoiceData , productData , customerData , inventoryData ).
import { useState , useMemo , useEffect } from "react";

import SummaryCard from "../components/SummaryCard";
import SalesTrendChart from "../components/SalesTrendChart";
import TopProductsChart from "../components/TopProductsChart";
import RecentInvoices from "../components/RecentInvoices";
import InventoryStatus from "../components/InventoryStatus";
import DateRangeSelector from "../components/DateRangeSelector";

// Change this import to use the getInvoiceData function
import { getInvoiceData } from "../data/invoiceData";
import productData from "../data/productData";
import { getCustomerData } from "../data/customerData";
import inventoryData from "../data/inventoryData";

// Function : ( DashboardHome ).
function DashboardHome ( ) {

  // State for date range.
  const [ dateRange , setDateRange ] = useState ( { startDate: "" , endDate: "" } );
  // State for customer data.
  const [ customerData , setCustomerData ] = useState ( [ ] );
  // Add state for invoice data
  const [ invoiceData , setInvoiceData ] = useState ( [ ] );

  // Fetch customer data and invoice data when component mounts.
  useEffect ( ( ) => {
    
    const fetchCustomerData = async ( ) => {
    
      try {
      
        const data = await getCustomerData ( );
        setCustomerData ( data || [ ] );
      
      } catch ( error ) {
      
        console.error ( "Error fetching customer data:" , error );
        setCustomerData ( [ ] );
      
      }
    
    };
    
    const fetchInvoiceData = async ( ) => {
    
      try {
      
        const data = await getInvoiceData ( );
        setInvoiceData ( data || [ ] );
      
      } catch ( error ) {
      
        console.error ( "Error fetching invoice data:" , error );
        setInvoiceData ( [ ] );
      
      }
    
    };
    
    fetchCustomerData ( );
    fetchInvoiceData ( );
    
  } , [ ] );

  // Filtering the invoices based on the date range.
  const filteredInvoiceData = useMemo ( ( ) => {

    if ( !dateRange.startDate || !dateRange.endDate ) {
      return invoiceData; // Return all data if no date range is selected ( Default ).
    }
    
    const startDate = new Date ( dateRange.startDate ); // Initializing the start date.
    const endDate = new Date ( dateRange.endDate ); // Initializing the end date.
    endDate.setHours ( 23 , 59 , 59 , 999 ); // Setting the end date to the last second of the day.
    
    return invoiceData.filter ( inv => {
      // Update this to use the new invoice data structure
      const invoiceDate = new Date ( inv.updatedAt || inv.createdAt );
      return invoiceDate >= startDate && invoiceDate <= endDate;
    } );

  } , [ dateRange , invoiceData ] ); // Add invoiceData as a dependency

  // Calculating summary metrics based on filtered data.
  // Update this to use the new invoice data structure
  const totalSales = filteredInvoiceData.reduce ( ( sum , inv ) => sum + inv.total , 0 );
  const totalProducts = productData.length;
  const totalCustomers = customerData.length;
  const totalInventoryValue = inventoryData.reduce ( ( sum , inv ) => sum + inv.total , 0 );

  // Handling date range changes.
  const handleDateRangeChange = ( newRange ) => {

    setDateRange ( newRange );

  };

  return (

    <div className="p-6">
    
      { /* Date Range Selector */ }
      <DateRangeSelector 
        onRangeChange = { handleDateRangeChange }
        initialStartDate = { dateRange.startDate }
        initialEndDate = { dateRange.endDate }
      />
    
      { /* Summary Cards */ }
      <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <SummaryCard 
          title = "Total Sales" 
          value = { `Rs ${ totalSales.toLocaleString ( ) }` } 
          subtitle = { `From ${ filteredInvoiceData.length } invoices` } 
          borderColor = "border-purple-600" 
        />
      
        <SummaryCard 
          title = "Total Products" 
          value = { totalProducts }  
          subtitle = "In inventory" 
          borderColor = "border-blue-600" 
        />
      
        <SummaryCard 
          title = "Total Customers" 
          value = { totalCustomers } 
          subtitle = "Registered accounts" 
          borderColor = "border-green-600" 
        />
      
        <SummaryCard 
          title = "Inventory Value" 
          value = { `Rs ${ totalInventoryValue.toLocaleString ( ) }` } 
          subtitle = "Current stock value" 
          borderColor = "border-amber-600" 
        />
      </div>
    
      {/* Visualization Charts */}
      <div className = "mb-10">
        <div className = "bg-white rounded-xl shadow-md p-6 mb-10">
          <h2 className = "text-xl font-semibold text-purple-900 mb-4">Sales Trend</h2>
          <div className = "h-96">
            <SalesTrendChart invoiceData = { filteredInvoiceData } />
          </div>
        </div>
      
        <div className = "grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className = "bg-white rounded-xl shadow-md p-6">
            <h2 className = "text-xl font-semibold text-purple-900 mb-4">Top Products</h2>
            <div className = "h-96">
              <TopProductsChart invoiceData = { filteredInvoiceData } productData = { productData } />
            </div>
          </div>
        
          <div className = "bg-white rounded-xl shadow-md p-6">
            <h2 className = "text-xl font-semibold text-purple-900 mb-4">Inventory Status</h2>
            <div className = "h-96">
              <InventoryStatus productData = { productData } />
            </div>
          </div>
        </div>
      </div>
    
      <div className = "bg-white rounded-xl shadow-md p-6">
        <h2 className = "text-xl font-semibold text-purple-900 mb-4">Recent Invoices</h2>
        <RecentInvoices invoiceData = { filteredInvoiceData } />
      </div>
    </div>

  );

}
// Exporting the DashboardHome component.
export default DashboardHome;
