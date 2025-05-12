import React, { useState } from 'react';
import { MdDashboard, MdStorefront } from "react-icons/md";
import { IoCalculator, IoPersonAdd } from "react-icons/io5";
import { FaClipboardList, FaFileInvoiceDollar } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight, HiOutlineLogout } from "react-icons/hi";

function SideBar({ isExpanded: propIsExpanded, toggleSidebar: propToggleSidebar, org}) {
  
  const [localIsExpanded, setLocalExpandState] = useState(true);
  const isExpanded = propIsExpanded !== undefined ? propIsExpanded : localIsExpanded;
  
  const toggleSidebar = () => {
    if (propToggleSidebar) {
      propToggleSidebar();
    } else {
      setLocalExpandState(!localIsExpanded);
    }
  };
  
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <MdDashboard />,
    },
    {
      title: 'Calculator',
      icon: <IoCalculator />,
    },
    {
      title: 'Sales',
      icon: <FaClipboardList />,
    },
    {
      title: 'Customers',
      icon: <IoPersonAdd />,
    },
    {
      title: 'Invoices',
      icon: <FaFileInvoiceDollar />,
    },
    
    {
      title: 'Logout',
      icon: <HiOutlineLogout />,
      className: 'mt-auto text-red-300 hover:text-red-100' 
    }
  ];

  return (
    <div className={`bg-[#81679e] h-full flex flex-col ${isExpanded ? 'w-56' : 'w-20'} transition-all duration-300 md:absolute `}>
      {/*extra top padding between topbar and store section */}
      <div className="pt-4"></div>
      
      {/* Store Logo and Name*/}
      <div className={`px-4 py-5 border-b border-[#70317d] ${isExpanded ? 'flex items-center' : 'flex flex-col items-center'}`}>
        <div className="h-10 w-10 flex-shrink-0 bg-white rounded-full flex items-center justify-center">
          <MdStorefront className="text-[#70317d] text-2xl" />
        </div>
        {isExpanded && (
          <div className="ml-3 flex items-center">
            <h2 className="text-white font-bold text-lg">{org?.name}</h2>
          </div>
        )}
      </div>
      
      {/* Toggle Button */}
      <div className="p-3 flex justify-end">
        <button
          className="text-white p-1 rounded hover:bg-[#70317d]"
          onClick={toggleSidebar}
        >
          {isExpanded ? <HiChevronLeft /> : <HiChevronRight />}
        </button>
      </div>
      
      {/* Menu Items */}
      <div className="p-3 flex-1 flex flex-col">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center text-white p-3 hover:bg-[#70317d] rounded-md mb-2 cursor-pointer group relative ${item.className || ''}`}
          >
            <div className="text-xl">{item.icon}</div>
            {isExpanded ? (
              <span className="ml-3">{item.title}</span>
            ) : (
              
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap z-10">
                {item.title}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
