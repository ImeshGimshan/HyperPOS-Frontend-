
// Imports : ( NavLink )
import { NavLink } from "react-router-dom";

// Creating the array of navigation items ( to - The destination. , label - The display text. ).
const navItems = [

  { to : "/dashboard" , label : "Dashboard" },
  { to : "/dashboard/grn" , label : "GRN" },
  { to : "/dashboard/invoices" , label : "Invoices" },
  { to : "/dashboard/users" , label : "Users" },
  { to : "/dashboard/customers" , label : "Customers" },
  { to : "/dashboard/products" , label : "Products" },
  { to : "/dashboard/sales" , label : "Sales" },
  { to : "/dashboard/purchases" , label : "Purchases" },

];

// Function : ( Siderbar )
function Sidebar ( ) {

  return (

    <aside className = "w-64 bg-purple-900 text-white p-4 space-y-4">
      <h1 className = "text-2xl font-bold">HyperPOS</h1>
      <nav className = "flex flex-col gap-2">
        { /* Creating a NavLink component to each link with a key , to and end */ }
        { navItems.map ( ( item ) => (
          <NavLink
            key = { item.to }
            to = { item.to } 
            end = { item.to === "/dashboard" }
            className = { ( { isActive } ) =>
              `block px-3 py-2 rounded-md 
              ${ isActive ? "bg-purple-700" : "hover:bg-purple-800" }`
            }
          >
            { item.label }
          </NavLink>
        ) ) }
      </nav>
    </aside>

  );

}

// Exporting the component.
export default Sidebar;
