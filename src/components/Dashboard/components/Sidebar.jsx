
// Imports : ( NavLink )
import { NavLink } from "react-router-dom";
import { X } from "lucide-react"; // Import X icon for close button

// Creating the array of navigation items ( to - The destination. , label - The display text. ).
const navItems = [

  { to: "/dashboard", label: "Dashboard" },
  { to: "/dashboard/grn", label: "GRN" },
  { to: "/dashboard/invoices", label: "Invoices" },
  { to: "/dashboard/users", label: "Users" },
  { to: "/dashboard/customers", label: "Customers" },
  { to: "/dashboard/products", label: "Products" },
  { to: "/dashboard/sales", label: "Sales" },
  { to: "/dashboard/purchases", label: "Purchases" },

];

// Function : ( Sidebar )
function Sidebar ( { onCloseMobile } ) { // Add onCloseMobile prop

  return (

    <aside className = "flex flex-col h-full bg-purple-900 text-white">
      <div className = "flex items-center justify-between p-4 border-b border-purple-800">
        <h1 className = "text-2xl font-bold">HyperPOS</h1>
        {/* Close button - only visible on mobile */}
        <button 
          className = "text-white p-1 lg:hidden focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
          onClick = { onCloseMobile }
          aria-label = "Close sidebar"
        >
          <X size = { 24 } />
        </button>
      </div>
    
      <nav className = "flex-1 overflow-y-auto py-4 space-y-1 px-3">
        { /* Creating a NavLink component to each link with a key, to and end */ }
        { navItems.map ( ( item ) => (
          <NavLink
            key = { item.to }
            to = { item.to } 
            end = { item.to === "/dashboard" }
            className = { ( { isActive } ) =>
              `block px-3 py-2.5 rounded-md transition-colors duration-200 
              ${ isActive ? "bg-purple-700" : "hover:bg-purple-800" }`
            }
            onClick = { ( ) => {
              // Close sidebar on mobile when clicking a navigation item
              if ( onCloseMobile ) onCloseMobile ( );
            } }
          >
            { item.label }
          </NavLink>
        ) ) }
      </nav>
    
      <div className = "p-4 border-t border-purple-800 text-xs text-center text-purple-300">
        HyperPOS Dashboard v1.0
      </div>
    </aside>

  );

}

// Exporting the component.
export default Sidebar;
