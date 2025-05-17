import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut, Clock, Home } from "lucide-react";
import { APILogout } from "../../../API/APILogin";

import ParticleBackground from "../../UI/ParticleBackground"; 
import GlowingLogo from "../../UI/GlowingLogo";
import HyperPOSButton from "../../UI/HyperPOSButton";

function Topbar({ org }) {
  // Using useState to store the current date n' time and to set to the current moment.
  const [time, setTime] = useState(new Date());
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);
  // Add state for logout modal
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const user = JSON.parse(localStorage?.getItem("user")) || { username: "User" };

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      if (timeDropdownOpen) {
        setTimeDropdownOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [timeDropdownOpen]);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = time.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  const handleLogout = async () => {
    // Show the modal instead of the default confirm
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    await APILogout();
    window.location.href = "/";
  };

  // Time button for small screens.
  const handleTimeButtonClick = (e) => {
    e.stopPropagation();
    setTimeDropdownOpen(!timeDropdownOpen);
  };

  return (
    <header className="h-14 sm:h-16 shadow flex items-center justify-between px-2 sm:px-4 md:px-6 text-xs sm:text-sm text-gray-100 relative hyper-bg-horizontal border-b border-purple-800/30">
      
      {/* Particle effect. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ParticleBackground 
          count={6} 
          color="#f472b6" 
          opacity={0.1} 
          glowColor="rgba(192, 38, 211, 0.5)"
        />
      </div>
    
      {/* Scanline effect. */}
      <div className="hyper-scanlines"></div>
    
      {/* Horizontal accent line. */}
      <div className="hyper-line-bottom"></div>
    
      {/* Left section. */}
      <div className="flex items-center relative z-10">
        {/* Logo and App Name. */}
        <Link to="/basescreen" className="flex items-center">
          {/* Logo. */}
          <div className="relative mr-2 sm:mr-3">
            <GlowingLogo 
              src="./HyperPOS.svg" 
              alt="HyperPOS Logo" 
              width={32} 
              glowColor="rgba(192, 38, 211, 0.8)"
              hoverGlowColor="rgba(244, 114, 182, 0.9)"
              className="logo-glow"
            />
          </div>
        
          {/* HyperPOS text. */}
          <div className="flex flex-col">
            <h1 className="text-base sm:text-xl font-bold text-white hyper-text-glow">
              HyperPOS
            </h1>
            <div className="hyper-line-accent mt-0.5 sm:mt-1"></div>
          </div>
        </Link>
        
        {/* Store name */}
        {org && (
          <div className="ml-4 pl-4 border-l border-purple-500/30">
            <span className="text-sm text-gray-300">Store:</span>
            <span className="ml-1 text-pink-300 font-medium">{org.name}</span>
          </div>
        )}
      </div>

      {/* Center section. */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
        
        {/* Large screens: side by side. */}
        <div className="hidden md:flex items-center space-x-3">
          <span className="font-mono tracking-widest text-xs hyper-time">
            {formattedTime}
          </span>
          <div className="h-4 w-px bg-purple-500/50"></div>
          <span className="font-mono tracking-widest text-xs hyper-time">
            {formattedDate}
          </span>
        </div>
        
        {/* Medium screens: stacked. */}
        <div className="hidden sm:flex md:hidden flex-col items-center">
          <span className="font-mono tracking-widest text-xs hyper-time">
            {formattedTime}
          </span>
          <span className="font-mono tracking-widest text-[10px] text-gray-300 mt-0.5">
            {formattedDate}
          </span>
        </div>
        
        {/* Small screens: clock icon with dropdown. */}
        <div className="sm:hidden relative">
          <button 
            onClick={handleTimeButtonClick}
            className="hyper-button p-1.5 rounded-full"
          >
            <Clock size={16} className="hyper-icon" />
          </button>
          
          {/* Dropdown for clock.*/}
          {timeDropdownOpen && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-hyper-dark/90 backdrop-blur-sm border border-purple-500/30 rounded-lg px-3 py-2 shadow-lg z-30 min-w-[120px]">
              <div className="flex flex-col items-center">
                <span className="font-mono tracking-widest text-xs hyper-time">
                  {formattedTime}
                </span>
                <div className="h-px w-full bg-purple-500/30 my-1.5"></div>
                <span className="font-mono tracking-widest text-[10px] text-gray-300">
                  {formattedDate}
                </span>
              </div>
              
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-hyper-dark/90 border-t border-l border-purple-500/30 rotate-45"></div>
            </div>
          )}
        </div>
      </div>

      {/* Right section. */}
      <div className="flex items-center space-x-2 sm:space-x-4 relative z-10">
        {/* User info */}
        <div className="hidden sm:block text-right">
          <div className="text-xs text-gray-300">Welcome,</div>
          <div className="text-sm text-pink-300 font-medium">{user.username}</div>
        </div>
        
        {/* Home button */}
        <Link to="/basescreen">
          <HyperPOSButton
            variant="primary"
            className="p-1 px-2 sm:p-1 sm:px-3 text-xs sm:text-sm"
          >
            <Home size={14} className="hyper-icon" />
            <span className="hidden sm:inline ml-1">Home</span>
          </HyperPOSButton>
        </Link>
        
        {/* Logout button */}
        <HyperPOSButton
          variant="secondary"
          onClick={handleLogout}
          className="p-1 px-2 sm:p-1 sm:px-3 text-xs sm:text-sm"
        >
          <LogOut size={14} className="hyper-icon" />
          <span className="hidden sm:inline ml-1">Logout</span>
        </HyperPOSButton>
      </div>
      
      {/* Cyberpunk Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          
          {/* Backdrop with blur effect */}
          <div 
            className="absolute inset-0 hyper-modal-backdrop"
            onClick={() => setShowLogoutModal(false)}
          ></div>
          
          {/* Modal container */}
          <div className="relative hyper-modal-container rounded-lg w-80 sm:w-96 overflow-hidden hyper-modal-appear">
            
            {/* Glowing border effect */}
            <div className="absolute inset-0 border-2 border-pink-500/30 rounded-lg pointer-events-none"></div>
            
            {/* Scanlines effect */}
            <div className="absolute inset-0 hyper-scanlines opacity-20 pointer-events-none"></div>
            
            {/* Header */}
            <div className="hyper-modal-header p-3 border-b border-purple-500/30">
              <h3 className="text-lg font-bold text-white hyper-text-glow flex items-center justify-center">
                <LogOut size={18} className="mr-2 text-pink-400" />
                Logout
              </h3>
              <div className="hyper-line-accent mt-1 w-full"></div>
            </div>
            
            {/* Content */}
            <div className="p-4 text-gray-200">
              <p className="mb-4 font-mono text-sm">
                Are you sure you want to log out of HyperPOS?
              </p>
              
              {/* Animated terminal-like text */}
              <div className="hyper-modal-terminal font-mono text-xs p-2 rounded mb-4">
                <p className="hyper-typing-effect-2 hyper-terminal-text">
                  User authentication token will be revoked.
                </p>
              </div>
            </div>
            
            {/* Footer with buttons */}
            <div className="p-3 border-t border-purple-500/30 flex justify-end space-x-3 bg-black/30">
              <HyperPOSButton
                variant="secondary"
                onClick={() => setShowLogoutModal(false)}
                className="text-xs"
              >
                Cancel
              </HyperPOSButton>
              
              <button
                onClick={confirmLogout}
                className="hyper-button-danger px-3 py-1.5 rounded text-xs relative overflow-hidden"
              >
                Confirm Logout
              </button>
            </div>
            
            {/* Corner accents */}
            <div className="hyper-modal-corner hyper-modal-corner-tl"></div>
            <div className="hyper-modal-corner hyper-modal-corner-tr"></div>
            <div className="hyper-modal-corner hyper-modal-corner-bl"></div>
            <div className="hyper-modal-corner hyper-modal-corner-br"></div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Topbar;