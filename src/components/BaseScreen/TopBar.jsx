import React, { useState, useEffect } from "react";
import { FcAlarmClock, FcCalendar } from "react-icons/fc";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
import { APILogout } from "../../API/APILogin";

function TopBar({ toggleSidebar, toggleSliderOpen }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const user = JSON.parse(localStorage?.getItem("user")) || null;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const logout = async () => {
    await APILogout();
    window.location.href = "/";
  };

  const formattedDate = currentDateTime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = currentDateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest(".profile-menu-container")) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <div className="w-full bg-[#70317d] py-1 px-4 shadow-md h-14">
      <div className="flex items-center justify-between h-full">
        {/* Logo, Brand Name,Menu Toggle */}
        <div className="flex items-center space-x-3">
          {/*menu toggle button */}
          <button
            onClick={toggleSliderOpen}
            className="mr-2 text-white p-1 rounded-md hover:bg-[#5d2a68] transition-colors duration-200 lg:hidden"
            aria-label="Toggle sidebar menu"
          >
            <HiMenuAlt2 size={22} />
          </button>

          <div className="h-10 w-10">
            <img
              src="hyprps 1.png"
              alt="HyperPOS Logo"
              className="h-full w-auto object-contain"
            />
          </div>
          <h1 className="text-white text-lg font-bold">HyperPOS</h1>
        </div>

        <div className="hidden md:block">
          {/* space for additional content */}
        </div>

        {/* User Profile, Date and Time */}
        <div className="flex items-center space-x-4">
          {/* User Profile */}
          <div className="relative profile-menu-container">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2 text-white hover:bg-[#5d2a68] rounded-md px-2 py-1"
            >
              <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#70317d] text-sm font-bold">
                  {user?.username[0]}
                </span>
              </div>
              <span className="hidden sm:inline-block text-sm">
                {user?.username}
              </span>
              <IoMdArrowDropdown />
            </button>

            {/* Profile Dropdown Menu*/}
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg py-3 px-4 z-10">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-[#70317d] rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">
                      {user?.username[0]}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{user?.username}</div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <button
                    className=" bg-[#70317d]  flex items-center justify-center mr-3 text-white py-1 px-2 rounded-l"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Date and Time */}
          <div className="flex items-center space-x-5 text-white pr-3">
            {/* Hide date on small screens */}
            <div className="hidden sm:flex items-center space-x-1">
              <FcCalendar className="text-lg bg-white rounded-full p-0.5" />
              <span className="text-xs md:text-sm">{formattedDate}</span>
            </div>

            <div className="flex items-center space-x-1">
              <FcAlarmClock className="text-lg bg-white rounded-full p-0.5" />
              <span className="text-xs md:text-sm">{formattedTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
