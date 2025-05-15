import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import SideBar from './SideBar';
import { getOrgInfo } from '../../API/APIOrg';

const BaseScreen = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const [isSliderOpen, setSliderOpen] = useState(true);
  const [org, setOrg] = useState(null);
  
  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const orgData = await getOrgInfo();
        setOrg(orgData);
      } catch (error) {
        console.error('Error fetching organization data:', error);
      }
    };
    fetchOrg();
  }, []);
  
  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };
  
  const toggleSliderOpen = () => {
    setSliderOpen(!isSliderOpen);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-50 fixed top-0">
      <TopBar 
        toggleSidebar={toggleSidebar} 
        toggleSliderOpen={toggleSliderOpen}
        org={org}
      />
      <div className="flex w-full h-[calc(100vh-3.5rem)] bg-gray-900 fixed top-[3.5rem]">
        {isSliderOpen && (
          <SideBar 
            isExpanded={isSidebarExpanded} 
            toggleSidebar={toggleSidebar} 
            org={org}
          />
        )}
        
        <div className="flex-1 overflow-auto">
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default BaseScreen;
