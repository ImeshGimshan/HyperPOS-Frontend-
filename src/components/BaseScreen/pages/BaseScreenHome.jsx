import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Calculator, RefreshCw, UserPlus, ChevronRight, 
  DollarSign, ShoppingBag, FileText, AlertCircle, Eye
} from "lucide-react";
import ParticleBackground from "../../UI/ParticleBackground";
import { getSaleData } from "../../Dashboard/data/salesData";
import { getProductData } from "../../Dashboard/data/productData";
import { getInvoiceData } from "../../Dashboard/data/invoiceData";

function BaseScreenHome() {
  // States for data
  const [salesData, setSalesData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [, setInvoiceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    todaySales: 0,
    transactionCount: 0,
    openInvoices: 0,
    lowStockItems: 0
  });
  const [selectedSale, setSelectedSale] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all required data
        const sales = await getSaleData();
        const products = await getProductData();
        const invoices = await getInvoiceData();
        
        setSalesData(sales || []);
        setProductData(products || []);
        setInvoiceData(invoices || []);
        
        // Calculate stats
        calculateStats(sales, products, invoices);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Calculate statistics from the fetched data
  const calculateStats = (sales, products, invoices) => {
    // Get today's date at midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Filter sales for today
    const todaySales = sales?.filter(sale => {
      const saleDate = new Date(sale.invoice?.createdAt || sale.invoice?.updatedAt);
      saleDate.setHours(0, 0, 0, 0);
      return saleDate.getTime() === today.getTime();
    }) || [];
    
    // Calculate total sales amount for today
    const todaySalesTotal = todaySales.reduce((total, sale) => {
      return total + (sale.invoice?.total || 0);
    }, 0);
    
    // Count open invoices (assuming unpaid or pending status)
    const openInvoicesCount = invoices?.filter(invoice => 
      invoice.status === 'PENDING' || invoice.status === 'UNPAID'
    ).length || 0;
    
    // Count low stock items (assuming a threshold of 10)
    const lowStockThreshold = 10;
    const lowStockCount = products?.filter(product => 
      (product.quantity || 0) < lowStockThreshold
    ).length || 0;
    
    // Update stats state
    setStats({
      todaySales: todaySalesTotal,
      transactionCount: todaySales.length,
      openInvoices: openInvoicesCount,
      lowStockItems: lowStockCount
    });
  };

  // Function to format date for display in the table
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // View Modal for sale details
  const ViewModal = ({ sale, onClose }) => {
    // Function to format date strings
    const formatDateTime = (dateString) => {
      if (!dateString) return "Not available";
      const date = new Date(dateString);
      return date.toLocaleString();
    };

    return (
      <div className="fixed inset-0 top-14 sm:top-16 bg-black/70 backdrop-blur-sm flex justify-center items-center z-40 p-4 sm:p-8">
        <div className="bg-hyper-dark/90 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative border border-purple-500/30">
          {/* Header */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-purple-500/30">
            <div className="w-full text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white hyper-text-glow">Sale Details</h2>
            </div>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white text-xl cursor-pointer"
            >
              &times;
            </button>
          </div>

          {/* Container with padding to create space for scrollbar */}
          <div className="px-2">
            {/* Scrollable content area with purple-themed scrollbar */}
            <div className="max-h-[60vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-purple-900/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-purple-500/50 hover:[&::-webkit-scrollbar-thumb]:bg-purple-400/70 p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-5">
                {/* Invoice Information */}
                                <div className="bg-purple-900/30 p-3 sm:p-4 rounded-xl border border-purple-500/30">
                  <h3 className="text-md font-semibold text-purple-300 mb-2 sm:mb-3 text-center">Invoice Information</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-400">Invoice ID</span>
                      <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">{sale.invoice.id}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-400">Customer ID</span>
                      <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">{sale.invoice.customerId}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-400">Payment Method</span>
                      <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">{sale.invoice.paymentMethod}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-400">Date</span>
                      <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">{formatDateTime(sale.invoice.updatedAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                <div className="bg-green-900/30 p-3 sm:p-4 rounded-xl border border-green-500/30">
                  <h3 className="text-md font-semibold text-green-300 mb-2 sm:mb-3 text-center">Financial Information</h3>
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-400">Total Value</span>
                      <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm font-semibold text-green-400">
                        Rs {sale.invoice.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items Information */}
                <div className="bg-blue-900/30 p-3 sm:p-4 rounded-xl border border-blue-500/30">
                  <h3 className="text-md font-semibold text-blue-300 mb-2 sm:mb-3 text-center">Items ({sale.items.length})</h3>
                  <div className="space-y-3">
                    {sale.items.map((item) => (
                      <div key={item.id} className="bg-hyper-dark/50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-blue-500/20">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-blue-300">Item #{item.id}</span>
                          <span className="text-xs px-2 py-1 bg-blue-900/50 text-blue-300 rounded-full border border-blue-500/30">
                            Product #{item.productId}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-gray-400">Quantity:</span> 
                            <span className="ml-auto text-white">{item.quantity}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-gray-400">Unit Price:</span> 
                            <span className="ml-auto text-white">Rs {item.unitPrice.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-gray-400">Discount:</span> 
                            <span className="ml-auto text-white">{item.discount}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-gray-400">Amount:</span> 
                            <span className="ml-auto font-semibold text-green-400">Rs {item.amount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-purple-500/30">
            <div className="flex justify-center">
              <button
                onClick={onClose}
                className="px-4 sm:px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition duration-200 cursor-pointer shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main navigation cards
  const mainNavCards = [
    {
      title: "Cashier",
      description: "Process sales and generate invoices for customers",
      icon: <Calculator size={28} />,
      path: "/basescreen/cashier",
      color: "from-purple-600/20 to-pink-600/20",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-400"
    },
    {
      title: "Invoice Return",
      description: "Process returns and refunds for customer invoices",
      icon: <RefreshCw size={28} />,
      path: "/basescreen/invoice-return",
      color: "from-pink-600/20 to-red-600/20",
      borderColor: "border-pink-500/30",
      iconColor: "text-pink-400"
    },
    {
      title: "Customer Registration",
      description: "Register new customers in the system",
      icon: <UserPlus size={28} />,
      path: "/basescreen/customer-registration",
      color: "from-blue-600/20 to-purple-600/20",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-400"
    }
  ];

  return (
    <div className="p-2 sm:p-4 md:p-6 relative">
      {/* Background particle effect */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticleBackground 
          count={20} 
          color="#f472b6" 
          opacity={0.05} 
          glowColor="rgba(192, 38, 211, 0.3)"
        />
      </div>
      
      {/* Stats Cards */}
      <div className="mb-6 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-green-500/30">
            <div className="flex items-center mb-1">
              <DollarSign size={16} className="mr-2 text-green-400" />
              <span className="text-gray-300 text-sm">Today's Sales</span>
            </div>
            <div className="text-xl font-bold text-white">
              {isLoading ? (
                <div className="h-6 w-24 bg-white/20 animate-pulse rounded"></div>
              ) : (
                `$${stats.todaySales.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
              )}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30">
            <div className="flex items-center mb-1">
              <ShoppingBag size={16} className="mr-2 text-blue-400" />
              <span className="text-gray-300 text-sm">Transactions</span>
            </div>
            <div className="text-xl font-bold text-white">
              {isLoading ? (
                <div className="h-6 w-16 bg-white/20 animate-pulse rounded"></div>
              ) : (
                stats.transactionCount
              )}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-amber-500/30">
            <div className="flex items-center mb-1">
              <FileText size={16} className="mr-2 text-amber-400" />
              <span className="text-gray-300 text-sm">Open Invoices</span>
            </div>
            <div className="text-xl font-bold text-white">
              {isLoading ? (
                <div className="h-6 w-16 bg-white/20 animate-pulse rounded"></div>
              ) : (
                stats.openInvoices
              )}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-red-500/30">
            <div className="flex items-center mb-1">
              <AlertCircle size={16} className="mr-2 text-red-400" />
              <span className="text-gray-300 text-sm">Low Stock Items</span>
            </div>
            <div className="text-xl font-bold text-white">
              {isLoading ? (
                <div className="h-6 w-16 bg-white/20 animate-pulse rounded"></div>
              ) : (
                stats.lowStockItems
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Navigation Cards */}
      <div className="mb-6 relative z-10">
        <h2 className="text-lg font-semibold text-white mb-3" style={{ textShadow: "0 0 5px rgba(192, 38, 211, 0.7)" }}>
          Point of Sale
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mainNavCards.map((card, index) => (
            <Link 
              key={index}
              to={card.path}
              className={`bg-gradient-to-br ${card.color} backdrop-blur-sm rounded-xl p-5 border ${card.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              <div className={`${card.iconColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {card.icon}
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-pink-200 transition-colors">
                {card.title}
              </h3>
              
              <p className="text-gray-300 text-sm mb-4">
                {card.description}
              </p>
              
              <div className="flex items-center text-pink-300 text-sm font-medium mt-auto group-hover:translate-x-1 transition-transform duration-300">
                <span>Open</span>
                <ChevronRight size={16} className="ml-1" />
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/0 via-pink-500/50 to-purple-500/0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Recent Transactions Table */}
      <div className="mb-6 relative z-10">
        <h2 className="text-lg font-semibold text-white mb-3" style={{ textShadow: "0 0 5px rgba(192, 38, 211, 0.7)" }}>
          Recent Transactions
        </h2>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-purple-500/20">
          {isLoading ? (
            // Loading skeleton
            <div className="p-4">
              <div className="animate-pulse space-y-4">
                <div className="h-10 bg-white/10 rounded"></div>
                <div className="h-10 bg-white/10 rounded"></div>
                <div className="h-10 bg-white/10 rounded"></div>
                <div className="h-10 bg-white/10 rounded"></div>
                <div className="h-10 bg-white/10 rounded"></div>
              </div>
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-purple-900/70 text-white shadow-sm">
                  <th className="p-3 whitespace-nowrap rounded-tl-lg">Invoice ID</th>
                  <th className="p-3 whitespace-nowrap">Customer ID</th>
                  <th className="p-3 whitespace-nowrap">Total</th>
                  <th className="p-3 whitespace-nowrap hidden sm:table-cell">Payment</th>
                  <th className="p-3 whitespace-nowrap hidden md:table-cell">Date</th>
                  <th className="p-3 text-center whitespace-nowrap rounded-tr-lg">View</th>
                </tr>
              </thead>
              <tbody>
                {salesData && salesData.length > 0 ? (
                  salesData.slice(0, 5).map((sale) => (
                    <tr key={sale.invoice.id} className="border-t border-purple-500/20 text-white hover:bg-white/5 transition duration-200 ease-in-out">
                      <td className="p-3 font-medium">{sale.invoice.id}</td>
                      <td className="p-3">{sale.invoice.customerId}</td>
                      <td className="p-3 font-semibold text-green-400">Rs {sale.invoice.total.toLocaleString()}</td>
                      <td className="p-3 hidden sm:table-cell">{sale.invoice.paymentMethod}</td>
                      <td className="p-3 hidden md:table-cell">{formatDate(sale.invoice.updatedAt)}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setSelectedSale(sale)}
                          className="text-purple-400 hover:text-purple-300 cursor-pointer transition"
                          aria-label="View sale details"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  // If no sales, still show 5 empty rows to maintain consistent height
                  Array(5).fill(0).map((_, index) => (
                    <tr key={index} className="border-t border-purple-500/20 text-white">
                      <td colSpan="6" className="p-3 text-center font-medium text-gray-400">
                        {index === 2 ? "No sales found" : "\u00A0"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
      {/* Low Stock Items Table */}
      <div className="mb-6 relative z-10">
        <h2 className="text-lg font-semibold text-white mb-3" style={{ textShadow: "0 0 5px rgba(192, 38, 211, 0.7)" }}>
          Low Stock Items
        </h2>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-red-500/20">
          {isLoading ? (
            // Loading skeleton
            <div className="p-4">
              <div className="animate-pulse space-y-4">
                <div className="h-10 bg-white/10 rounded"></div>
                <div className="h-10 bg-white/10 rounded"></div>
                <div className="h-10 bg-white/10 rounded"></div>
              </div>
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-red-900/70 text-white shadow-sm">
                  <th className="p-3 whitespace-nowrap rounded-tl-lg">Product ID</th>
                  <th className="p-3 whitespace-nowrap">Name</th>
                  <th className="p-3 whitespace-nowrap">Current Stock</th>
                  <th className="p-3 whitespace-nowrap hidden sm:table-cell">Price</th>
                  <th className="p-3 text-center whitespace-nowrap rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {productData && productData.filter(product => (product.quantity || 0) < 10).length > 0 ? (
                  productData
                    .filter(product => (product.quantity || 0) < 10) // Filter low stock items
                    .slice(0, 5) // Show exactly 5 items
                    .map((product) => (
                      <tr key={product.id} className="border-t border-red-500/20 text-white hover:bg-white/5 transition duration-200 ease-in-out">
                        <td className="p-3 font-medium">{product.id}</td>
                        <td className="p-3">{product.name}</td>
                        <td className="p-3 font-semibold text-red-400">{product.quantity || 0}</td>
                        <td className="p-3 hidden sm:table-cell">Rs {(product.price || 0).toLocaleString()}</td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-1 bg-red-900/50 text-red-300 rounded-full text-xs border border-red-500/30">
                            Low Stock
                          </span>
                        </td>
                      </tr>
                    ))
                ) : (
                  // If no low stock items, still show 5 empty rows to maintain consistent height
                  Array(5).fill(0).map((_, index) => (
                    <tr key={index} className="border-t border-red-500/20 text-white">
                      <td colSpan="5" className="p-3 text-center font-medium text-gray-400">
                        {index === 2 ? "No low stock items found" : "\u00A0"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-center text-xs text-gray-400 mt-8 relative z-10">
        <p>HyperPOS &copy; {new Date().getFullYear()} | All Rights Reserved</p>
        <p className="mt-1">Version 1.0.0</p>
      </div>
      
      {/* View Modal */}
      {selectedSale && <ViewModal sale={selectedSale} onClose={() => setSelectedSale(null)} />}
    </div>
  );
}

export default BaseScreenHome;


