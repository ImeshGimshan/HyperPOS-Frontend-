import React from 'react';
import SideBar from './SideBar';
import MidScreen from './MidScreen';

const BottomContent = ({ isSidebarExpanded, toggleSidebar, isSliderOpen, toggleSliderOpen, org }) => {
  return (
    <div className="flex w-full h-[calc(100vh-3.5rem)] bg-gray-900 fixed top-50">
      {isSliderOpen && <SideBar 
      isExpanded={isSidebarExpanded} 
      toggleSidebar={toggleSidebar} 
      isSliderOpen={isSliderOpen} 
      toggleSliderOpen={toggleSliderOpen}
      org={org}
      />}
      
      <div className="flex-1 overflow-auto bg-gray-900">
        <MidScreen sidebarExpanded={isSidebarExpanded} />
      </div>
    </div>
  );
};

export default BottomContent;
