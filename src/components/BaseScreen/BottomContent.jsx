import React from 'react';
import SideBar from './SideBar';
import MidScreen from './MidScreen';

const BottomContent = ({ isSidebarExpanded, toggleSidebar }) => {
  return (
    <div className="flex w-full h-[calc(100vh-3.5rem)]">
      <SideBar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      <div className="flex-1 overflow-auto">
        <MidScreen sidebarExpanded={isSidebarExpanded} />
      </div>
    </div>
  );
};

export default BottomContent;
