
import { useState , useEffect , useCallback } from "react";

import { Link , useLocation , useNavigate } from "react-router-dom";

import { 
  Home, 
  FileText, 
  Users, 
  ShoppingCart, 
  Package, 
  BarChart2, 
  Building,
  UserPlus,
  Truck,
  ChevronRight
} from "lucide-react";

import ParticleBackground from "../../ui/ParticleBackground";

function Sidebar ( { onCloseMobile , isMobileOpen } ) {

  const location = useLocation ( );
  const navigate = useNavigate ( );
  const user = JSON.parse ( localStorage?.getItem ( "user" ) ) || { username : "Admin" };
  
  const [ expandedCategory , setExpandedCategory ] = useState ( null );

  const dashboardItem = {
    title : "Dashboard",
    icon : <Home size = { 20 } />,
    path : "/dashboard",
    exact : true
  };

  // Group menu items by category.
  const menuCategories = useCallback ( () => ( {
    "Documents" : [
      {
        title : "GRNs",
        icon : <FileText size = { 20 } />,
        path : "/dashboard/grn"
      },
      {
        title : "Invoices",
        icon : <FileText size = { 20 } />,
        path : "/dashboard/invoices"
      },
      {
        title : "GRN Return",
        icon : <FileText size = { 20 } />,
        path : "/dashboard/grnreturn"
      }
    ],
    "People" : [
      {
        title : "Users",
        icon : <Users size = { 20 } />,
        path : "/dashboard/users"
      },
      {
        title : "Customers",
        icon : <Users size = { 20 } />,
        path : "/dashboard/customers"
      },
      {
        title : "Add Customer",
        icon : <UserPlus size = { 20 } />,
        path : "/dashboard/customerregister"
      }
    ],
    "Inventory" : [
      {
        title : "Products",
        icon : <Package size = { 20 } />,
        path : "/dashboard/products"
      },
      {
        title : "Add Product",
        icon : <Package size = { 20 } />,
        path : "/dashboard/addproduct"
      }
    ],
    "Transactions" : [
      {
        title : "Sales",
        icon : <BarChart2 size = { 20 } />,
        path : "/dashboard/sales"
      },
      {
        title : "Purchase",
        icon : <ShoppingCart size = { 20 } />,
        path : "/dashboard/purchase"
      },
      {
        title : "Invoice Return",
        icon : <FileText size = { 20 } />,
        path : "/dashboard/invoicereturn"
      }
    ],
    "Business" : [
      {
        title : "Add Supplier",
        icon : <Truck size = { 20 } />,
        path : "/dashboard/supplierregister"
      },
      {
        title : "Organizations",
        icon : <Building size = { 20 } />,
        path : "/dashboard/organization"
      }
    ]
  } ) , [] );

  // Toggle category expansion.
  const toggleCategory = ( category ) => {
    if ( expandedCategory === category ) {
      setExpandedCategory ( null );
    } else {
      setExpandedCategory ( category );
    }
  };

  // Defining isActive as a memoized function to avoid recreating it on every render.
  const isActive = useCallback ( ( path , exact = false ) => {
    if ( exact ) {
      return location.pathname === path;
    }
    return location.pathname.startsWith ( path );
  } , [ location.pathname ] );

  // Check if any menu item in a category is active.
  const isCategoryActive = useCallback ( ( categoryItems ) => {
    return categoryItems.some ( item => isActive ( item.path , item.exact ) );
  } , [ isActive ] );

  // Handle navigation with proper timing.
  const handleNavigation = ( path , e ) => {
    e.preventDefault ( );
    
    navigate ( path );
    
    setTimeout ( () => {
      onCloseMobile ( );
    } , 150 );
  };

  useEffect ( () => {
    
    const categories = menuCategories ( );
    for ( const [ category , items ] of Object.entries ( categories ) ) {
      if ( isCategoryActive ( items ) ) {
        setExpandedCategory ( category );
        break;
      }
    }
    
  } , [ isCategoryActive , menuCategories ] );

  return (
    <div className = { `fixed lg:relative h-screen inset-y-0 left-0 flex flex-col overflow-hidden hyper-bg z-30
      ${ isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0' }
      transition-all duration-300 w-64 sm:w-72` } 
         style = { {
           background : "linear-gradient( 180deg , #0f0326 0% , #1a0a40 50% , #3b0764 100% )",
         } }>
      
      {/* Particle background */}
      <ParticleBackground count = { 20 } />
      
      {/* Scanline effect */}
      <div className = "hyper-scanline"></div>
      
      {/* Navigation menu */}
      <nav className = "flex-1 overflow-y-auto py-4 relative z-10 hyper-scrollbar">
        <ul className = "space-y-2 px-3">
          
          {/* Dashboard item. */}
          <li className = "hyper-menu-item mb-2">
            <Link
              to = { dashboardItem.path }
              className = { `flex items-center px-4 py-3 rounded-md transition-all duration-300 ${
                isActive ( dashboardItem.path , dashboardItem.exact )
                  ? "text-white hyper-menu-active"
                  : "text-purple-200 hover:text-white"
              }` }
              onClick = { ( e ) => handleNavigation ( dashboardItem.path , e ) }
            >
              <span className = { `mr-3 ${ isActive ( dashboardItem.path , dashboardItem.exact ) ? "text-pink-300 hyper-icon" : "text-purple-300" }` }>
                { dashboardItem.icon }
              </span>
              <span className = { isActive ( dashboardItem.path , dashboardItem.exact ) ? "hyper-text" : "" }>
                { dashboardItem.title }
              </span>
            </Link>
          </li>
          
          {/* Divider. */}
          <li className = "border-t border-purple-800/30 my-2"></li>
          
          {/* Collapsible categories. */}
          { Object.entries ( menuCategories ( ) ).map ( ( [ category , items ] ) => (
            <li key = { category } className = "mb-2">
              
              {/* Category headers.*/}
              <div 
                className = { `flex items-center justify-between px-3 py-2 text-xs uppercase font-semibold tracking-wider cursor-pointer ${
                  isCategoryActive ( items ) ? 'text-pink-300' : 'text-gray-400'
                } hover:text-pink-300 transition-colors` }
                onClick = { ( ) => toggleCategory ( category ) }
              >
                <span>{ category }</span>
                <ChevronRight 
                  size = { 14 } 
                  className = { `transform transition-transform duration-200 ${
                    expandedCategory === category ? 'rotate-90' : ''
                  }` } 
                />
              </div>
              
              {/* Menu items. */}
              <ul className = { `mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                expandedCategory === category ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }` }>
                { items.map ( ( item , idx ) => (
                  <li key = { idx } className = "hyper-menu-item pl-2">
                    <Link
                      to = { item.path }
                      className = { `flex items-center px-4 py-3 rounded-md transition-all duration-300 ${
                        isActive ( item.path , item.exact )
                          ? "text-white hyper-menu-active"
                          : "text-purple-200 hover:text-white"
                      }` }
                      onClick = { ( e ) => handleNavigation ( item.path , e ) }
                    >
                      <span className = { `mr-3 ${ isActive ( item.path , item.exact ) ? "text-pink-300 hyper-icon" : "text-purple-300" }` }>
                        { item.icon }
                      </span>
                      <span className = { isActive ( item.path , item.exact ) ? "hyper-text" : "" }>
                        { item.title }
                      </span>
                    </Link>
                  </li>
                ) ) }
              </ul>
              
            </li>
          ) ) }
          
        </ul>
      </nav>
      
      {/* Welcome Message. */}
      <div className = "p-4 mt-auto border-t border-purple-800/30 relative z-10">
        <div className = "text-center hyper-text">
          Welcome, <span className = "text-pink-300">{ user.username }</span>
        </div>
      </div>
      
      <div className = "hyper-glow-bottom"></div>
      
    </div>
  );
}

export default Sidebar;
