
// Imports : ( React ) , ( Outlet ) , ( Sidebar , Topbar )
import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/SideBar";
import Topbar from "../components/Topbar";

// Function : ( DashboardLayout )
function DashboardLayout ( ) {

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