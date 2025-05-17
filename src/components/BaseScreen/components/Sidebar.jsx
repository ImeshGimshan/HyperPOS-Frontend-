import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  Calculator, 
  RefreshCw, 
  UserPlus, 
  LogOut,
  ChevronRight,
  Store
} from "lucide-react";
import { APILogout } from "../../../API/APILogin";
import ParticleBackground from "../../UI/ParticleBackground";

function Sidebar({ isMobileOpen, onCloseMobile, org }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage?.getItem("user")) || { username: "User" };
  
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Main menu item
  const mainMenuItem = {
    title: "Home",
    icon: <Home size={20} />,
    path: "/basescreen",
    exact: true
  };

  // Group menu items by category
  const menuCategories = useCallback(() => ({
    "Operations": [
      {
        title: "Cashier",
        icon: <Calculator size={20} />,
        path: "/basescreen/cashier"
      },
      {
        title: "Invoice Return",
        icon: <RefreshCw size={20} />,
        path: "/basescreen/invoice-return"
      },
      {
        title: "Customer Registration",
        icon: <UserPlus size={20} />,
        path: "/basescreen/customer-registration"
      }
    ]
  }), []);

  // Toggle category expansion
  const toggleCategory = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  // Check if a path is active
  const isActive = useCallback((path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  // Check if any menu item in a category is active
  const isCategoryActive = useCallback((categoryItems) => {
    return categoryItems.some(item => isActive(item.path, item.exact));
  }, [isActive]);

  // Handle navigation with proper timing
  const handleNavigation = (path, e) => {
    e.preventDefault();
    
    navigate(path);
    
    setTimeout(() => {
      if (onCloseMobile) {
        onCloseMobile();
      }
    }, 150);
  };

  // Handle logout
  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      await APILogout();
      window.location.href = "/";
    }
  };

  // Set expanded category based on active path
  useEffect(() => {
    const categories = menuCategories();
    for (const [category, items] of Object.entries(categories)) {
      if (isCategoryActive(items)) {
        setExpandedCategory(category);
        break;
      }
    }
  }, [isCategoryActive, menuCategories]);

  return (
    <div className={`fixed lg:relative h-screen inset-y-0 left-0 flex flex-col overflow-hidden hyper-bg z-30
      ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      transition-all duration-300 w-64 sm:w-72`} 
      style={{
        background: "linear-gradient(180deg, #0f0326 0%, #1a0a40 50%, #3b0764 100%)",
      }}>
      
      {/* Particle background */}
      <ParticleBackground count={20} />
      
      {/* Scanline effect */}
      <div className="hyper-scanline"></div>
      
      {/* Store Logo and Name */}
      <div className="px-4 py-5 border-b border-purple-800/30 flex items-center">
        <div className="h-10 w-10 flex-shrink-0 bg-white rounded-full flex items-center justify-center">
          <Store className="text-[#70317d] text-2xl" />
        </div>
        <div className="ml-3 flex items-center">
          <h2 className="text-white font-bold text-lg">{org?.name || "Store"}</h2>
        </div>
      </div>
      
      {/* Navigation menu */}
      <nav className="flex-1 overflow-y-auto py-4 relative z-10 hyper-scrollbar">
        <ul className="space-y-2 px-3">
          
          {/* Main menu item */}
          <li className="hyper-menu-item mb-2">
            <Link
              to={mainMenuItem.path}
              className={`flex items-center px-4 py-3 rounded-md transition-all duration-300 ${
                isActive(mainMenuItem.path, mainMenuItem.exact)
                  ? "text-white hyper-menu-active"
                  : "text-purple-200 hover:text-white"
              }`}
              onClick={(e) => handleNavigation(mainMenuItem.path, e)}
            >
              <span className={`mr-3 ${isActive(mainMenuItem.path, mainMenuItem.exact) ? "text-pink-300 hyper-icon" : "text-purple-300"}`}>
                {mainMenuItem.icon}
              </span>
              <span className={isActive(mainMenuItem.path, mainMenuItem.exact) ? "hyper-text" : ""}>
                {mainMenuItem.title}
              </span>
            </Link>
          </li>
          
          {/* Divider */}
          <li className="border-t border-purple-800/30 my-2"></li>
          
          {/* Collapsible categories */}
          {Object.entries(menuCategories()).map(([category, items]) => (
            <li key={category} className="mb-2">
              
              {/* Category headers */}
              <div 
                className={`flex items-center justify-between px-3 py-2 text-xs uppercase font-semibold tracking-wider cursor-pointer ${
                  isCategoryActive(items) ? 'text-pink-300' : 'text-gray-400'
                } hover:text-pink-300 transition-colors`}
                onClick={() => toggleCategory(category)}
              >
                <span>{category}</span>
                <ChevronRight 
                  size={14} 
                  className={`transform transition-transform duration-200 ${
                    expandedCategory === category ? 'rotate-90' : ''
                  }`} 
                />
              </div>
              
              {/* Menu items */}
              <ul className={`mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                expandedCategory === category ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                {items.map((item, idx) => (
                  <li key={idx} className="hyper-menu-item pl-2">
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-md transition-all duration-300 ${
                        isActive(item.path, item.exact)
                          ? "text-white hyper-menu-active"
                          : "text-purple-200 hover:text-white"
                      }`}
                      onClick={(e) => handleNavigation(item.path, e)}
                    >
                      <span className={`mr-3 ${isActive(item.path, item.exact) ? "text-pink-300 hyper-icon" : "text-purple-300"}`}>
                        {item.icon}
                      </span>
                      <span className={isActive(item.path, item.exact) ? "hyper-text" : ""}>
                        {item.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          
          {/* Logout item */}
          <li className="hyper-menu-item mt-auto">
            <div
              className="flex items-center px-4 py-3 rounded-md transition-all duration-300 text-red-300 hover:text-red-100 cursor-pointer"
              onClick={handleLogout}
            >
              <span className="mr-3 text-red-300">
                <LogOut size={20} />
              </span>
              <span>Logout</span>
            </div>
          </li>
        </ul>
      </nav>
      
      {/* Welcome Message */}
      <div className="p-4 mt-auto border-t border-purple-800/30 relative z-10">
        <div className="text-center hyper-text">
          Welcome, <span className="text-pink-300">{user.username}</span>
        </div>
      </div>
      
      <div className="hyper-glow-bottom"></div>
    </div>
  );
}

export default Sidebar;