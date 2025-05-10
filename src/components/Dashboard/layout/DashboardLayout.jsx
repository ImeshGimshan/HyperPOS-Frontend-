
// Imports : ( Outlet ) , ( Sidebar , Topbar )
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Loader from "../../ui/Loader";

// Function : ( DashboardLayout )
function DashboardLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2950);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (

    <div className="flex h-screen bg-gray-50">

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        <Topbar />

        <main className="flex-1 overflow-auto p-4">

          { /*Using the Outlet component to render the nested routes.*/ }
          <Outlet />

        </main>

      </div>

    </div>   

  );

}

export default DashboardLayout;