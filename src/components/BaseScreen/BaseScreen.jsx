import React, { useState } from 'react';
import TopBar from './TopBar';
import BottomContent from './BottomContent';

const BaseScreen = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-50">
      <TopBar toggleSidebar={toggleSidebar} />
      <BottomContent 
        isSidebarExpanded={isSidebarExpanded} 
        toggleSidebar={toggleSidebar} 
      />
    </div>
  );
};

export default BaseScreen;
