import React from 'react';
import SideBar from './SideBar';
import MidScreen from './MidScreen';

const BottomContent = ({ isSidebarExpanded, toggleSidebar, isSliderOpen, toggleSliderOpen }) => {
  return (
    <div className="flex w-full h-[calc(100vh-3.5rem)]">
      {isSliderOpen && <SideBar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} isSliderOpen={isSliderOpen} toggleSliderOpen={toggleSliderOpen} />}
      
      <div className="flex-1 overflow-auto">
        <MidScreen sidebarExpanded={isSidebarExpanded} />
      </div>
    </div>
  );
};

export default BottomContent;
