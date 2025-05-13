import { useState,useEffect } from 'react';
import TopBar from './TopBar';
import BottomContent from './BottomContent';
import {getOrgInfo} from '../../API/APIOrg';

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
    <div className="w-screen h-screen flex flex-col bg-gray-50">
      <TopBar 
      toggleSidebar={toggleSidebar} 
      toggleSliderOpen={toggleSliderOpen}
      org={org}
      />
      <BottomContent 
        isSidebarExpanded={isSidebarExpanded} 
        toggleSidebar={toggleSidebar}
        isSliderOpen={isSliderOpen}
        toggleSliderOpen={toggleSliderOpen}
        org={org}
      />
    </div>
  );
};

export default BaseScreen;
