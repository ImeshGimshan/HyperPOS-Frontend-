
import { useState , useEffect } from "react";

import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Loader from "../../ui/Loader";

function DashboardLayout ( ) {

  const [ loading , setLoading ] = useState ( true );
  const [ sidebarOpen , setSidebarOpen ] = useState ( false );

  useEffect ( ( ) => {
    
    const timer = setTimeout ( () => {
      setLoading ( false );
    } , 2950 ); // Change loading time here.

    return () => clearTimeout ( timer );
    
  } , [] );

  // Toggle Sidebar.
  const toggleSidebar = ( ) => {
    setSidebarOpen ( !sidebarOpen );
  };

  // Close Sidebar.
  const closeSidebar = ( ) => {
    setSidebarOpen ( false );
  };

  if ( loading ) {
    return <Loader />;
  }

  return (
    
    <div className = "flex flex-col h-screen overflow-hidden relative">
      
      {/* Background gradient. */}
      <div className = "absolute inset-0 z-0" style = { { 
        background : "linear-gradient( 135deg , rgba( 126 , 34 , 206 , 0.8 ) 0% , rgba( 236 , 72 , 153 , 0.8 ) 100% )",
        opacity : 0.2
      } }></div>
      
      {/* Base background. */}
      <div className = "absolute inset-0 z-0 hyper-bg" style = { { opacity : 0.95 } }></div>
      
      {/* Scanline effect. */}
      <div className = "hyper-scanline"></div>
      
      {/* Topbar. */}
      <Topbar onMenuToggle = { toggleSidebar } />
      
      {/* Main content. */}
      <div className = "flex flex-1 overflow-hidden">
        
        {/* Mobile sidebar. */}
        { sidebarOpen && (
          <div
            className = "fixed inset-0 bg-black/70 z-20 lg:hidden backdrop-blur-sm"
            onClick = { closeSidebar }
            aria-hidden = "true"
          />
        ) }

        {/* Sidebar. */}
        <Sidebar onCloseMobile = { closeSidebar } isMobileOpen = { sidebarOpen } />

        {/* Content */}
        <main className = "flex-1 overflow-auto p-2 sm:p-4 md:p-6 text-white relative z-10">
          <Outlet />
        </main>
        
      </div>
      
    </div>
    
  );
}

export default DashboardLayout;
