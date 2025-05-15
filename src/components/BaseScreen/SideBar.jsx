import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdStorefront } from "react-icons/md";
import { IoCalculator, IoPersonAdd } from "react-icons/io5";
import { FaExchangeAlt } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight, HiOutlineLogout } from "react-icons/hi";
import { APILogout } from "../../API/APILogin";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { BsArrowRightSquareFill } from "react-icons/bs";

function SideBar({ isExpanded: propIsExpanded, toggleSidebar: propToggleSidebar, org}) {
  const location = useLocation();
  const [localIsExpanded, setLocalExpandState] = useState(true);
  const isExpanded = propIsExpanded !== undefined ? propIsExpanded : localIsExpanded;
  
  const toggleSidebar = () => {
    if (propToggleSidebar) {
      propToggleSidebar();
    } else {
      setLocalExpandState(!localIsExpanded);
    }
  };

  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      await APILogout();
      window.location.href = "/";
    }
  };
  
  const menuItems = [
    {
      title: 'Cashier',
      icon: <IoCalculator />,
      path: '/basescreen/cashier'
    },
    {
      title: 'Invoice Return',
      icon: <FaExchangeAlt />,
      path: '/basescreen/invoice-return'
    },
    {
      title: 'Customer Registration',
      icon: <IoPersonAdd />,
      path: '/basescreen/customer-registration'
    },
    {
      title: 'Logout',
      icon: <HiOutlineLogout />,
      className: 'mt-auto text-red-300 hover:text-red-100',
      action: handleLogout
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`bg-[#81679e] h-[calc(100vh-3.5rem)] flex flex-col ${isExpanded ? 'w-56' : 'w-20'} transition-all duration-300 md:relative`}>
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
      <div className="p-3 flex justify-end items-center">
        <button
          className="text-white rounded hover:bg-[#70317d] items-center flex"
          onClick={toggleSidebar}
        >
          {isExpanded ? <BsArrowLeftSquareFill size={24}/> : <BsArrowRightSquareFill size={24}/>}
        </button>
      </div>
      
      {/* Menu Items */}
      <div className="p-3 flex-1 flex flex-col">
        {menuItems.map((item, index) => (
          item.action ? (
            <div
              key={index}
              className={`flex items-center text-white border-2   p-3 hover:bg-[#70317d] rounded-md mb-2 cursor-pointer group relative ${item.className || ''}`}
              onClick={item.action}
            >
              <div className="text-xl border-2 ">{item.icon}</div>
              {isExpanded ? (
                <span className="ml-3">{item.title}</span>
              ) : (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap z-10">
                  {item.title}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center text-white p-3 rounded-md mb-2 cursor-pointer group relative ${item.className || ''} ${
                isActive(item.path) ? 'bg-[#70317d]' : 'hover:bg-[#70317d]'
              }`}
            >
              <div className="text-xl">{item.icon}</div>
              {isExpanded ? (
                <span className="ml-3">{item.title}</span>
              ) : (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap z-10">
                  {item.title}
                </div>
              )}
            </Link>
          )
        ))}
      </div>
    </div>
  );
}

export default SideBar;
