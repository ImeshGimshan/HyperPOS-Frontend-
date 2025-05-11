
import { useState , useEffect } from "react";

import SummaryCard from "../components/SummaryCard";
import SalesTrendChart from "../components/SalesTrendChart";
import TopProductsChart from "../components/TopProductsChart";
import RecentInvoices from "../components/RecentInvoices";
import InventoryStatus from "../components/InventoryStatus";
import DateRangeSelector from "../components/DateRangeSelector";
import PurchaseTrendChart from "../components/PurchaseTrendChart";
import TopSuppliersChart from "../components/TopSuppliersChart";
import SalesPurchasesComparisonChart from "../components/SalesPurchasesComparisonChart";
import UserActivity from "../components/UserActivity";
import RecentPurchases from "../components/RecentPurchases";

import { getInvoiceData } from "../data/invoiceData";
import { getProductData } from "../data/productData";
import { getCustomerData } from "../data/customerData";
import { getSaleData } from "../data/salesData";
import { getGRNData } from "../data/grnData";
import { getPurchaseData } from "../data/purchaseData";
import { getUserData } from "../data/userData";

// Function : ( DashboardHome ).
function DashboardHome ( ) {

  // State for date range.
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  // State for customer data.
  const [customerData, setCustomerData] = useState([]);
  // State for product data.
  const [productData, setProductData] = useState([]);
  // State for sale data.
  const [, setSaleData] = useState([]);
  // State for invoice data.
  const [invoiceData, setInvoiceData] = useState([]);
  // State for GRN data
  const [grnData, setGRNData] = useState([]);
  // State for purchase data
  const [, setPurchaseData] = useState([]);
  // State for user data
  const [userData, setUserData] = useState([]);
  // State for loading status
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data when component mounts.
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
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
        
        // Fetch GRN data
        const grnResponse = await getGRNData();
        setGRNData(grnResponse || []);
        
        // Fetch purchase data
        const purchaseResponse = await getPurchaseData();
        setPurchaseData(purchaseResponse || []);
        
        // Fetch user data
        const userResponse = await getUserData();
        setUserData(userResponse || []);
        
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on date range if provided
  const filteredInvoiceData = dateRange.startDate && dateRange.endDate
    ? invoiceData.filter(invoice => {
        const invoiceDate = new Date(invoice.createdAt || invoice.updatedAt);
        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);
        endDate.setHours(23, 59, 59); // Include the entire end day
        return invoiceDate >= startDate && invoiceDate <= endDate;
      })
    : invoiceData;

  const filteredGRNData = dateRange.startDate && dateRange.endDate
    ? grnData.filter(grn => {
        const grnDate = new Date(grn.createdAt || grn.updatedAt);
        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);
        endDate.setHours(23, 59, 59); // Include the entire end day
        return grnDate >= startDate && grnDate <= endDate;
      })
    : grnData;

  return (
    <div className="p-4 sm:p-6">
      {/* Date Range Selector */}
      <div className="mb-6">
        <DateRangeSelector 
          onRangeChange={(newRange) => setDateRange(newRange)}
          initialStartDate={dateRange.startDate}
          initialEndDate={dateRange.endDate}
        />
      </div>

      {/* Summary Cards - Responsive grid with stacking on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-10">
        <SummaryCard 
          title="Total Sales" 
          value={filteredInvoiceData.length > 0 ? `${filteredInvoiceData.reduce((sum, invoice) => sum + (invoice.total || 0), 0).toLocaleString()}` : "Loading..."} 
          subtitle="From invoices" 
          borderColor="border-purple-600" 
          isLoading={isLoading}
        />

        <SummaryCard 
          title="Total Purchases" 
          value={filteredGRNData.length > 0 ? `${filteredGRNData.reduce((sum, grn) => sum + (grn.total || 0), 0).toLocaleString()}` : "Loading..."} 
          subtitle="From GRNs" 
          borderColor="border-blue-600" 
          isLoading={isLoading}
        />

        <SummaryCard 
          title="Active Customers" 
          value={customerData.filter(c => c.isActive !== false).length > 0 ? customerData.filter(c => c.isActive !== false).length : "Loading..."} 
          subtitle="Registered accounts" 
          borderColor="border-green-600" 
          isLoading={isLoading}
        />

        <SummaryCard 
          title="Active Products" 
          value={productData.filter(p => p.isActive !== false).length > 0 ? productData.filter(p => p.isActive !== false).length : "Loading..."} 
          subtitle="In inventory" 
          borderColor="border-amber-600" 
          isLoading={isLoading}
        />
      </div>

      {/* Sales vs Purchases Comparison */}
      <div className="mb-6 sm:mb-10">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-purple-900 mb-3 sm:mb-4">Sales vs Purchases</h2>
          <div className="h-64 sm:h-80 md:h-96">
            <SalesPurchasesComparisonChart 
              invoiceData={filteredInvoiceData} 
              grnData={filteredGRNData} 
              isLoading={isLoading} 
            />
          </div>
        </div>
      </div>

      {/* Visualization Charts - Two rows of two charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-10">
        {/* Sales Trend */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-purple-900 mb-3 sm:mb-4">Sales Trend</h2>
          <div className="h-64 sm:h-80">
            <SalesTrendChart invoiceData={filteredInvoiceData} isLoading={isLoading} />
          </div>
        </div>
        
        {/* Purchase Trend */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-purple-900 mb-3 sm:mb-4">Purchase Trend</h2>
          <div className="h-64 sm:h-80">
            <PurchaseTrendChart grnData={filteredGRNData} isLoading={isLoading} />
          </div>
        </div>
        
        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-purple-900 mb-3 sm:mb-4">Top Products</h2>
          <div className="h-64 sm:h-80">
            <TopProductsChart invoiceData={filteredInvoiceData} productData={productData} isLoading={isLoading} />
          </div>
        </div>
        
        {/* Top Suppliers */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-purple-900 mb-3 sm:mb-4">Top Suppliers</h2>
          <div className="h-64 sm:h-80">
            <TopSuppliersChart grnData={filteredGRNData} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Second row of charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-10">
        {/* Inventory Status */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-purple-900 mb-3 sm:mb-4">Inventory Status</h2>
          <div className="h-64 sm:h-80">
            <InventoryStatus productData={productData} isLoading={isLoading} />
          </div>
        </div>
        
        {/* User Activity */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-purple-900 mb-3 sm:mb-4">User Activity</h2>
          <div className="h-64 sm:h-80">
            <UserActivity userData={userData} invoiceData={filteredInvoiceData} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Recent Transactions Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Sales Table */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-purple-900 mb-3 sm:mb-4">Recent Sales</h2>
          <div className="overflow-x-auto">
            <RecentInvoices invoiceData={filteredInvoiceData} isLoading={isLoading} />
          </div>
        </div>
        
        {/* Recent Purchases Table */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-purple-900 mb-3 sm:mb-4">Recent Purchases</h2>
          <div className="overflow-x-auto">
            <RecentPurchases grnData={filteredGRNData} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );

}

// Exporting the DashboardHome component.
export default DashboardHome;
