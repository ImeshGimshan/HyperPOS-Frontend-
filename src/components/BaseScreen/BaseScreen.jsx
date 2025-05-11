import React, { useState } from 'react';
import TopBar from './TopBar';
import BottomContent from './BottomContent';

const BaseScreen = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const [isSliderOpen, setSliderOpen] = useState(true);
  
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
      />
      <BottomContent 
        isSidebarExpanded={isSidebarExpanded} 
        toggleSidebar={toggleSidebar}
        isSliderOpen={isSliderOpen}
        toggleSliderOpen={toggleSliderOpen}
      />
    </div>
  );
};

export default BaseScreen;
