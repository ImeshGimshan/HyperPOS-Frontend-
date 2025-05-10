
// Imports : ( useEffect , useState , useMemo ) , ( SummaryCard , SalesTrendChart , TopProductsChart , RecentInvoices , InventoryStatus , DateRangeSelector ) , ( invoiceData , productData , userData ).
import { useState , useEffect } from "react";

import SummaryCard from "../components/SummaryCard";
import SalesTrendChart from "../components/SalesTrendChart";
import TopProductsChart from "../components/TopProductsChart";
import RecentInvoices from "../components/RecentInvoices";
import InventoryStatus from "../components/InventoryStatus";
import DateRangeSelector from "../components/DateRangeSelector";

import { getInvoiceData } from "../data/invoiceData";
import { getProductData } from "../data/productData";
import { getCustomerData } from "../data/customerData";
import { getSaleData } from "../data/salesData";

// Function : ( DashboardHome ).
function DashboardHome() {

  // State for date range.
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  // State for customer data.
  const [customerData, setCustomerData] = useState([]);
  // State for product data.
  const [productData, setProductData] = useState([]);
  // State for sale data.
  const [saleData, setSaleData] = useState([]);
  // State for invoice data.
  const [invoiceData, setInvoiceData] = useState([]);

  // Fetch data when component mounts.
  useEffect(() => {
  
    const fetchData = async () => {
    
      try {
      
        // Fetch customer data
        const customerResponse = await getCustomerData();
        setCustomerData(customerResponse || []);
      
        // Fetch product data
        const productResponse = await getProductData();
        setProductData(productResponse || []);
      
        // Fetch sale data
        const saleResponse = await getSaleData();
        setSaleData(saleResponse || []);
      
        // Fetch invoice data
        const invoiceResponse = await getInvoiceData();
        setInvoiceData(invoiceResponse || []);
      
      } catch (error) {
      
        console.error("Error fetching dashboard data:", error);
      
      }
    
    };
  
    fetchData();
  
  }, []);

  return (

    <div className="p-6">
      {/* Date Range Selector */}
      <DateRangeSelector 
        onRangeChange={(newRange) => setDateRange(newRange)}
        initialStartDate={dateRange.startDate}
        initialEndDate={dateRange.endDate}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <SummaryCard 
          title="Total Sales" 
          value={saleData.length > 0 ? `${saleData.reduce((sum, sale) => sum + sale.total, 0).toLocaleString()}` : "Loading..."} 
          subtitle="From sales" 
          borderColor="border-purple-600" 
        />
  
        <SummaryCard 
          title="Total Products" 
          value={productData.length > 0 ? productData.length : "Loading..."}  
          subtitle="In inventory" 
          borderColor="border-blue-600" 
        />
  
        <SummaryCard 
          title="Total Customers" 
          value={customerData.length > 0 ? customerData.length : "Loading..."} 
          subtitle="Registered accounts" 
          borderColor="border-green-600" 
        />
  
        <SummaryCard 
          title="Inventory Value" 
          value={productData.length > 0 ? `${productData.reduce((sum, product) => sum + (product.price * product.stock), 0).toLocaleString()}` : "Loading..."} 
          subtitle="Current stock value" 
          borderColor="border-amber-600" 
        />
      </div>

      {/* Visualization Charts */}
      <div className="mb-10">
        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">Sales Trend</h2>
          <div className="h-96">
            <SalesTrendChart invoiceData={invoiceData} />
          </div>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-purple-900 mb-4">Top Products</h2>
            <div className="h-96">
              <TopProductsChart invoiceData={invoiceData} productData={productData} />
            </div>
          </div>
    
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-purple-900 mb-4">Inventory Status</h2>
            <div className="h-96">
              <InventoryStatus productData={productData} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-purple-900 mb-4">Recent Sales</h2>
        <RecentInvoices invoiceData={invoiceData} />
      </div>
    </div>

  );

}

// Exporting the DashboardHome component.
export default DashboardHome;
