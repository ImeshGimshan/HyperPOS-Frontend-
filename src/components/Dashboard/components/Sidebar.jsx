// Imports : ( NavLink )
import { Link , useLocation } from "react-router-dom";

import React from "react";

import { 
  Home, 
  FileText, 
  Users, 
  ShoppingCart, 
  Package, 
  BarChart2, 
  Building,
  RotateCcw,
  UserPlus,
  Truck
} from "lucide-react";

import ParticleBackground from "../../ui/ParticleBackground";
import GlowingLogo from "../../ui/GlowingLogo";

// Function : ( Sidebar )
function Sidebar ( { onCloseMobile } ) {

  const location = useLocation ( );

  const menuItems = [

    {
      title : "Dashboard",
      icon : <Home size = { 20 } />,
      path : "/dashboard",
      exact : true
    },

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
      title : "Products",
      icon : <Package size = { 20 } />,
      path : "/dashboard/products"
    },

    {
      title : "Sales",
      icon : <BarChart2 size = { 20 } />,
      path : "/dashboard/sales"
    },

    {
      title : "Purchases",
      icon : <ShoppingCart size = { 20 } />,
      path : "/dashboard/purchases"
    },

    {
      title : "GRN Return",
      icon : <RotateCcw size = { 20 } />,
      path : "/dashboard/grnreturn"
    },

    {
      title : "Purchase",
      icon : <Truck size = { 20 } />,
      path : "/dashboard/purchase"
    },

    {
      title : "Add Customer",
      icon : <UserPlus size = { 20 } />,
      path : "/dashboard/customerregister"
    },

    {
      title : "Add Product",
      icon : <Package size = { 20 } />,
      path : "/dashboard/addproduct"
    },

    {
      title : "Add Supplier",
      icon : <Truck size = { 20 } />,
      path : "/dashboard/supplierregister"
    },

    {
      title : "Organizations",
      icon : <Building size = { 20 } />,
      path : "/dashboard/organizations"
    }

  ];

  const isActive = ( path , exact = false ) => {

    if ( exact ) {
      return location.pathname === path;
    }
    return location.pathname.startsWith ( path );

  };

  React.useEffect(() => {
    if (!document.getElementById('cyberpunk-sidebar-style')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'cyberpunk-sidebar-style';
      styleEl.textContent = `
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.3; }
          94% { opacity: 1; }
          96% { opacity: 0.5; }
          97% { opacity: 1; }
        }
      
        .cyberpunk-scanline {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, 
            transparent 0%, 
            rgba(255, 255, 255, 0.05) 50%, 
            transparent 100%);
          animation: scanline 8s linear infinite;
          pointer-events: none;
          z-index: 2;
        }
      
        .cyberpunk-menu-item {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
      
        .cyberpunk-menu-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.2), 
            transparent);
          transition: all 0.5s ease;
        }
      
        .cyberpunk-menu-item:hover::before {
          left: 100%;
        }
      
        .cyberpunk-active {
          animation: flicker 4s infinite;
        }
      `;
      document.head.appendChild(styleEl);
    }
  }, []);

  return (

    <div className = "h-full flex flex-col relative overflow-hidden" 
        style = { {
          background : "linear-gradient(180deg, #0f0326 0%, #1a0a40 50%, #3b0764 100%)",
        } }>
    
      <div className = "cyberpunk-scanline"></div>
    
      <ParticleBackground count = { 20 } />
    
      <div className = "absolute inset-0 overflow-hidden opacity-20 z-0">

        { [ ...Array ( 15 ) ].map ( ( _ , i ) => (
          <div 
            key = { i }
            className = "absolute h-[1px] w-full"
            style = { {
              top : `${ i * 7 }%`,
              left : 0,
              background : i % 2 === 0 ? '#f0abfc' : '#c026d3',
              boxShadow : i % 2 === 0 
                ? '0 0 10px 1px #f0abfc, 0 0 20px 1px #f0abfc' 
                : '0 0 10px 1px #c026d3, 0 0 20px 1px #c026d3',
              opacity : 0.6
            } }
          ></div>
        ) ) }

      </div>
    
      <div className = "p-4 border-b border-purple-800/30 relative z-10">

        <div className = "flex items-center">

          <div className = "relative mr-3">
            <GlowingLogo 
              src = "./HyperPOS.svg" 
              alt = "HyperPOS Logo" 
              width = { 40 } 
              glowColor = "rgba(192, 38, 211, 0.8)"
              hoverGlowColor = "rgba(244, 114, 182, 0.9)"
              className = "logo-glow"
            />
          </div>
      
          <div className = "flex flex-col">

            <h1 className = "text-xl font-bold text-white"
                style = { {
                  textShadow : "0 0 5px rgba(244, 114, 182, 0.8)",
                  letterSpacing : "1px"
                } }>
              HyperPOS
            </h1>
            <div className = "w-full h-[2px] mt-1"
                style = { {
                  background : 'linear-gradient(90deg, #f472b6, transparent)',
                  boxShadow : '0 0 10px #f472b6'
                } }>
            </div>

          </div>

        </div>

      </div>

      <nav className = "flex-1 overflow-y-auto py-4 relative z-10">
        <ul className = "space-y-2 px-3">
          { menuItems.map ( ( item , index ) => (
            <li key = { index } className = "cyberpunk-menu-item">
              <Link
                to = { item.path }
                className = {`flex items-center px-4 py-3 rounded-md transition-all duration-300 ${
                  isActive ( item.path , item.exact )
                    ? "text-white cyberpunk-active"
                    : "text-purple-200 hover:text-white"
                }`}
                style = { {
                  background : isActive ( item.path , item.exact )
                    ? 'rgba(192, 38, 211, 0.3)' 
                    : 'transparent',
                  border : isActive ( item.path , item.exact )
                    ? '1px solid rgba(244, 114, 182, 0.5)'
                    : '1px solid transparent',
                  boxShadow : isActive ( item.path , item.exact )
                    ? '0 0 10px rgba(192, 38, 211, 0.5), inset 0 0 5px rgba(244, 114, 182, 0.3)'
                    : 'none'
                }}
                onClick = { onCloseMobile }
              >
                <span className = {`mr-3 ${isActive ( item.path , item.exact ) ? "text-pink-300" : "text-purple-300"}`}
                    style = { {
                      filter : isActive ( item.path , item.exact ) ? "drop-shadow(0 0 3px rgba(244, 114, 182, 0.8))" : "none"
                    } }>
                  { item.icon }
                </span>
                <span style = { {
                  textShadow : isActive ( item.path , item.exact ) ? "0 0 5px rgba(244, 114, 182, 0.8)" : "none",
                  letterSpacing : "0.5px"
                } }>
                  { item.title }
                </span>
              
                { isActive ( item.path , item.exact ) && (
                  <div className = "absolute left-0 top-1/2 transform -translate-y-1/2 w-[3px] h-2/3"
                      style = { {
                        background : '#f472b6',
                        boxShadow : '0 0 8px #f472b6, 0 0 15px #f472b6'
                      } }>
                  </div>
                ) }
              </Link>
            </li>
          ) ) }
        </ul>
      </nav>
    
      <div className = "absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style = { {
            background : "radial-gradient(ellipse at bottom, rgba(192, 38, 211, 0.3) 0%, transparent 70%)",
            filter : "blur(20px)"
          } }>
      </div>
    </div>

  );

}

// Exporting the component.
export default Sidebar;
