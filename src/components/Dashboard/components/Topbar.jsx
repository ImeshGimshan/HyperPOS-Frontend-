// Imports  : ( useState , useEffect ) , ( Calendar ) , ( 'react-calendar/dist/Calendar.css' - styling )
import { useState, useEffect } from "react";
import { LogOut, Menu } from "lucide-react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { APILogout } from "../../../API/APILogin";

// Function : ( Topbar )
function Topbar({ onMenuToggle }) {
  // Add onMenuToggle prop

  // Using useState to store the current date n' time and to set to the current moment.
  const [time, setTime] = useState(new Date());
  // Using the useState to track whether the calendar is visible or not.
  const [showCalendar, setShowCalendar] = useState(false);
  const user = JSON.parse(localStorage?.getItem("user")) || "Admin";

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      await APILogout();
      window.location.href = "/";
    }
  };

  return (
    <header className="h-16 bg-purple-900 shadow grid grid-cols-3 items-center px-4 sm:px-6 text-sm text-gray-100">
      {/* Left section */}
      <div className="flex items-center">
        {/* Hamburger menu button - only visible on mobile/tablet */}
        <button
          type="button"
          className="text-white p-2 rounded-md lg:hidden focus:outline-none focus:ring-2 focus:ring-purple-400"
          onClick={onMenuToggle}
          aria-label="Toggle sidebar menu"
        >
          <Menu size={24} />
        </button>
        <div className="ml-2 lg:ml-0">Welcome, {user.username}</div>
      </div>

      {/* Center section - time and calendar */}
      <div className="flex justify-center items-center gap-2 sm:gap-4">
        <span className="font-mono tracking-widest text-xs sm:text-sm">
          {formattedTime}
        </span>
        <div className="relative">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="p-1 px-2 bg-purple-100 text-purple-900 rounded hover:bg-purple-200"
            aria-label="Toggle calendar"
          >
            📅
          </button>
          {showCalendar && (
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white text-purple-900 rounded-xl shadow-lg z-50 p-2 sm:p-4">
              <div className="max-w-[280px] sm:max-w-none overflow-x-auto">
                <Calendar
                  value={time}
                  onChange={() => {}}
                  selectRange={false}
                  showNeighboringMonth={true}
                  prev2Label={null}
                  next2Label={null}
                  className="text-sm sm:text-base"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right section - logout button */}
      <div className="flex justify-end">
        <button
          onClick={() => handleLogout()}
          className="p-1 px-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 border border-transparent hover:border-purple-400"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

// Exporting the component.
export default Topbar;
