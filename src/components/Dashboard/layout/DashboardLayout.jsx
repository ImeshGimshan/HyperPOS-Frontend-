// Imports : ( Outlet ) , ( Sidebar , Topbar )
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
// import Loader from "../../../components/ui/Loader";
// Function : ( DashboardLayout )
function DashboardLayout() {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const userRole = JSON.parse(localStorage.getItem("user")).roles;

    if(userRole === "ROLE_USER"){
      navigator("/basescreen");
    }
    if(userRole != "ROLE_ADMIN"){
      navigator("/");
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2950);

    return () => clearTimeout(timer);
  }, []);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to close sidebar (for when clicking on backdrop or menu item on mobile)
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile sidebar backdrop - only visible when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - transforms off-screen on mobile when closed */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out bg-purple-900 
                  lg:static lg:translate-x-0 lg:z-auto ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                  }`}
      >
        <Sidebar onCloseMobile={closeSidebar} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onMenuToggle={toggleSidebar} />

        <main className="flex-1 overflow-auto p-4">
          {/*Using the Outlet component to render the nested routes.*/}
          <Outlet />
        </main>
      </div>
    </div>
  );
}


export default DashboardLayout;
