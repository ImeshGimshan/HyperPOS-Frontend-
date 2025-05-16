
import { useState , useEffect } from "react";

import SummaryCard from "../components/SummaryCard";
import SalesTrendChart from "../components/SalesTrendChart";
import TopProductsChart from "../components/TopProductsChart";
import RecentInvoices from "../components/RecentInvoices";
import DateRangeSelector from "../components/DateRangeSelector";
import PurchaseTrendChart from "../components/PurchaseTrendChart";
import TopSuppliersChart from "../components/TopSuppliersChart";
import SalesPurchasesComparisonChart from "../components/SalesPurchasesComparisonChart";
import UserActivity from "../components/UserActivity";
import RecentPurchases from "../components/RecentPurchases";
import ParticleBackground from "../../UI/ParticleBackground";
import RevenueGrowthChart from "../components/RevenueGrowthChart";

import { getInvoiceData } from "../data/invoiceData";
import { getProductData } from "../data/productData";
import { getCustomerData } from "../data/customerData";
import { getSaleData } from "../data/salesData";
import { getGRNData } from "../data/grnData";
import { getPurchaseData } from "../data/purchaseData";
import { getUserData } from "../data/userData";

import HyperPOSLoader from "../../UI/HyperPOSLoader";

function DashboardHome ( ) {

  // useStates for filtering data..
  const [ dateRange , setDateRange ] = useState ( { startDate : "" , endDate : "" } );
  const [ customerData , setCustomerData ] = useState ( [] );
  const [ productData , setProductData ] = useState ( [] );
  const [ , setSaleData ] = useState ( [] );
  const [ invoiceData , setInvoiceData ] = useState ( [] );
  const [ grnData , setGRNData ] = useState ( [] );
  const [ , setPurchaseData ] = useState ( [] );
  const [ userData , setUserData ] = useState ( [] );
  const [ isLoading , setIsLoading ] = useState ( true );

  useEffect ( () => {
    
    const fetchData = async ( ) => {
      
      try {
        
        setIsLoading ( true );
        
        // Fetching the data.
        const customerResponse = await getCustomerData ();
        setCustomerData ( customerResponse || [] );
        
        const productResponse = await getProductData ();
        setProductData ( productResponse || [] );
        
        const saleResponse = await getSaleData ();
        setSaleData ( saleResponse || [] );
        
        const invoiceResponse = await getInvoiceData ();
        setInvoiceData ( invoiceResponse || [] );

        const grnResponse = await getGRNData ();
        setGRNData ( grnResponse || [] );
        
        const purchaseResponse = await getPurchaseData ();
        setPurchaseData ( purchaseResponse || [] );
        
        const userResponse = await getUserData ();
        setUserData ( userResponse || [] );
        
      } catch ( error ) {
        
        console.error ( "Error fetching dashboard data:" , error );
        
      } finally {
        
        setIsLoading ( false );
        
      }
    };

    fetchData ();
    
  } , [] );

  // Filtering data based on the date range.
  const filteredInvoiceData = dateRange.startDate && dateRange.endDate
    ? invoiceData.filter ( invoice => {

        const invoiceDate = new Date ( invoice.createdAt || invoice.updatedAt );
        const startDate = new Date ( dateRange.startDate );
        const endDate = new Date ( dateRange.endDate );
        endDate.setHours ( 23 , 59 , 59 );
        return invoiceDate >= startDate && invoiceDate <= endDate;

      } )
    : invoiceData;

  const filteredGRNData = dateRange.startDate && dateRange.endDate
    ? grnData.filter ( grn => {

        const grnDate = new Date ( grn.createdAt || grn.updatedAt );
        const startDate = new Date ( dateRange.startDate );
        const endDate = new Date ( dateRange.endDate );
        endDate.setHours ( 23 , 59 , 59 );
        return grnDate >= startDate && grnDate <= endDate;

      } )
    : grnData;

  return (

    <div className = "p-2 sm:p-4 md:p-6 relative">
      
      {/* Background particle effect. */}
      <div className = "absolute inset-0 pointer-events-none">
        <ParticleBackground 
          count = { 20 } 
          color = "#f472b6" 
          opacity = { 0.05 } 
          glowColor = "rgba( 192, 38, 211, 0.3 )"
        />
      </div>
      
      {/* Date Range Selector. */}
      <div className = "mb-4 sm:mb-6 relative z-10">
        <DateRangeSelector 
          onRangeChange = { ( newRange ) => setDateRange ( newRange ) }
          initialStartDate = { dateRange.startDate }
          initialEndDate = { dateRange.endDate }
        />
      </div>

      { isLoading ? (
        <div className = "flex items-center justify-center min-h-[60vh] backdrop-blur-sm bg-hyper-dark/30 rounded-xl border border-purple-500/20 p-4 sm:p-8">
          <HyperPOSLoader 
            size = "lg" 
            text = "Syncing HyperPOS data..." 
          />
        </div>
      ) : (
        <>
          {/* Summary Cards. */}
          <div className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-10 relative z-10">
            
            <SummaryCard 
              title = "Total Sales" 
              value = { filteredInvoiceData.length > 0 ? `${ filteredInvoiceData.reduce ( ( sum , invoice ) => sum + ( invoice.total || 0 ) , 0 ).toLocaleString () }` : "Loading..." } 
              subtitle = "From invoices" 
              borderColor = "border-purple-600" 
              isLoading = { isLoading }
            />

            <SummaryCard 
              title = "Total Purchases" 
              value = { filteredGRNData.length > 0 ? `${ filteredGRNData.reduce ( ( sum , grn ) => sum + ( grn.total || 0 ) , 0 ).toLocaleString () }` : "Loading..." } 
              subtitle = "From GRNs" 
              borderColor = "border-blue-600" 
              isLoading = { isLoading }
            />

            <SummaryCard 
              title = "Active Customers" 
              value = { customerData.filter ( c => c.isActive !== false ).length > 0 ? customerData.filter ( c => c.isActive !== false ).length : "Loading..." } 
              subtitle = "Registered accounts" 
              borderColor = "border-green-600" 
              isLoading = { isLoading }
            />

            <SummaryCard 
              title = "Active Products" 
              value = { productData.filter ( p => p.isActive !== false ).length > 0 ? productData.filter ( p => p.isActive !== false ).length : "Loading..." } 
              subtitle = "In inventory" 
              borderColor = "border-amber-600" 
              isLoading = { isLoading }
            />
            
          </div>

          {/* Sales vs Purchases Chart. */}
          <div className = "mb-4 sm:mb-6 md:mb-10 relative z-10">
            
            <div className = "bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-10 border border-purple-500/20">
              
              <h2 className = "text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3 md:mb-4" style = { { textShadow : "0 0 5px rgba( 192, 38, 211, 0.7 )" } }>Sales vs Purchases</h2>
              
              <div className = "h-48 sm:h-64 md:h-80 lg:h-96">
                <SalesPurchasesComparisonChart 
                  invoiceData = { filteredInvoiceData } 
                  grnData = { filteredGRNData } 
                  isLoading = { isLoading } 
                />
              </div>
              
            </div>
            
          </div>

          {/* Visualizations. */}
          <div className = "grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-10 relative z-10">
            
            {/* Sales Trend Chart. */}
            <div className = "bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-3 sm:p-4 md:p-6 border border-purple-500/20">
              
              <h2 className = "text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3 md:mb-4" style = { { textShadow : "0 0 5px rgba( 192, 38, 211, 0.7 )" } }>Sales Trend</h2>
              
              <div className = "h-48 sm:h-64 md:h-80">
                <SalesTrendChart invoiceData = { filteredInvoiceData } isLoading = { isLoading } />
              </div>
              
            </div>
            
            {/* Purchase Trend Chart. */}
            <div className = "bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-3 sm:p-4 md:p-6 border border-purple-500/20">
              
              <h2 className = "text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3 md:mb-4" style = { { textShadow : "0 0 5px rgba( 192, 38, 211, 0.7 )" } }>Purchase Trend</h2>
              
              <div className = "h-48 sm:h-64 md:h-80">
                <PurchaseTrendChart grnData = { filteredGRNData } isLoading = { isLoading } />
              </div>
              
            </div>
            
            {/* Top Products Chart. */}
            <div className = "bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-3 sm:p-4 md:p-6 border border-purple-500/20">
              
              <h2 className = "text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3 md:mb-4" style = { { textShadow : "0 0 5px rgba( 192, 38, 211, 0.7 )" } }>Top Products</h2>
              
              <div className = "h-48 sm:h-64 md:h-80">
                <TopProductsChart invoiceData = { filteredInvoiceData } productData = { productData } isLoading = { isLoading } />
              </div>
              
            </div>
            
            {/* Top Suppliers Chart. */}
            <div className = "bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-3 sm:p-4 md:p-6 border border-purple-500/20">
              
              <h2 className = "text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3 md:mb-4" style = { { textShadow : "0 0 5px rgba( 192, 38, 211, 0.7 )" } }>Top Suppliers</h2>
              
              <div className = "h-48 sm:h-64 md:h-80">
                <TopSuppliersChart grnData = { filteredGRNData } isLoading = { isLoading } />
              </div>
              
            </div>
            
          </div>

          {/* User Activity. */}
          <div className = "mb-4 sm:mb-6 md:mb-10 relative z-10">
            
            <div className = "bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-3 sm:p-4 md:p-6 border border-purple-500/20 mx-auto max-w-4xl">
              
              <h2 className = "text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3 md:mb-4 text-center" style = { { textShadow : "0 0 5px rgba( 192, 38, 211, 0.7 )" } }>User Activity</h2>
              
              <div className = "h-48 sm:h-64 md:h-80">
                <UserActivity userData = { userData } invoiceData = { filteredInvoiceData } isLoading = { isLoading } />
              </div>
              
            </div>
            
          </div>

          <div className = "grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 relative z-10">
            
            {/* Recent Sales Table. */}
            <div className = "bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-3 sm:p-4 md:p-6 border border-purple-500/20">
              
              <h2 className = "text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3 md:mb-4" style = { { textShadow : "0 0 5px rgba( 192, 38, 211, 0.7 )" } }>Recent Sales</h2>
              
              <div className = "overflow-x-auto">
                <RecentInvoices invoiceData = { filteredInvoiceData } isLoading = { isLoading } />
              </div>
              
            </div>
            
            {/* Recent Purchases Table. */}
            <div className = "bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-3 sm:p-4 md:p-6 border border-purple-500/20">
              
              <h2 className = "text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3 md:mb-4" style = { { textShadow : "0 0 5px rgba( 192, 38, 211, 0.7 )" } }>Recent Purchases</h2>
              
              <div className = "overflow-x-auto">
                <RecentPurchases grnData = { filteredGRNData } isLoading = { isLoading } />
              </div>
              
            </div>
            
          </div>

          {/* Revenue Growth Chart. */}
          <div className = "mt-10 sm:mb-6 md:mb-10 relative z-10">
            
            <div className = "bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-3 sm:p-4 md:p-6 border border-purple-500/20">
              
              <h2 className = "text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3 md:mb-4" style = { { textShadow : "0 0 5px rgba( 192, 38, 211, 0.7 )" } }>Revenue Growth</h2>
              
              <div className = "h-48 sm:h-64 md:h-80 lg:h-96">
                <RevenueGrowthChart 
                  invoiceData = { filteredInvoiceData } 
                  isLoading = { isLoading } 
                />
              </div>
              
            </div>
            
          </div>
        </>
      )}
    </div>

  );

}

export default DashboardHome;
