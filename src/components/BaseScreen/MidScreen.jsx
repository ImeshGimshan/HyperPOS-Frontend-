import React from 'react';

function MidScreen({ sidebarExpanded }) {
  return (
    <div className={`flex-1 p-6 bg-gray-100 overflow-y-auto transition-all duration-300 ${sidebarExpanded ? 'ml-0' : 'ml-0'}`}>
      <div className="h-full flex items-center justify-center">
      </div>
    </div>
  );
}

export default MidScreen;
