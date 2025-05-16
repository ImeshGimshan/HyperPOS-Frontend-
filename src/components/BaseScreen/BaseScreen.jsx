
import { useState , useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import TopBar from './TopBar';
import SideBar from './SideBar';

import { getOrgInfo } from '../../API/APIOrg';

import ParticleBackground from '../UI/ParticleBackground';

const BaseScreen = ( ) => {

  //

  const [ isSidebarExpanded , setSidebarExpanded ] = useState ( true );
  const [ isSliderOpen , setSliderOpen ] = useState ( true );
  const [ org , setOrg ] = useState ( null );
  
  useEffect ( ( ) => {

    const fetchOrg = async () => {
      try {
        const orgData = await getOrgInfo ( );
        setOrg ( orgData );
      } catch ( error ) {
        console.error('Error fetching organization data:', error);
      }
    };
    fetchOrg ( );

  } , [ ] );
  
  const toggleSidebar = ( ) => {
    setSidebarExpanded ( !isSidebarExpanded );
  };
  
  const toggleSliderOpen = ( ) => {
    setSliderOpen ( !isSliderOpen );
  };

  return (

    <div className = "flex flex-col h-screen overflow-hidden relative">
      
      {/* Background gradient */}
      <div className = "absolute inset-0 z-0" style={{ 
        background : "linear-gradient( 135deg , rgba( 126 , 34 , 206 , 0.8 ) 0% , rgba( 236 , 72 , 153 , 0.8 ) 100% )",
        opacity : 0.2
      } }></div>
      
      {/* Base background */}
      <div className = "absolute inset-0 z-0 hyper-bg" style = { { opacity : 0.95 } }></div>
      
      {/* Scanline effect */}
      <div className = "hyper-scanline"></div>
      
      {/* Topbar */}
      <TopBar 
        toggleSidebar = { toggleSidebar } 
        toggleSliderOpen = { toggleSliderOpen }
        org = { org }
      />
      
      {/* Main content */}
      <div className = "flex flex-1 overflow-hidden">
        
        {/* Mobile sidebar overlay */}
        {/* {isSliderOpen && (
          // <div
          //   className = "fixed inset-0 bg-black/70 z-20 lg:hidden "
          //   onClick = { toggleSliderOpen }
          //   aria-hidden = "true"
          // />
        )} */}

        {/* Sidebar */}
        { isSliderOpen && 
          <SideBar 

          isExpanded = { isSidebarExpanded } 
          toggleSidebar = { toggleSidebar } 
          isMobileOpen = { isSliderOpen }
          onCloseMobile = { toggleSliderOpen }
          org = { org }
        />}

        {/* Content */}
        <main className = "flex-1 overflow-auto p-2 sm:p-4 md:p-6 text-white relative z-10">
          <Outlet />
        </main>
        
      </div>
      
      {/* Particle background */}
      <div className = "absolute inset-0 pointer-events-none">
        <ParticleBackground 
          count = { 20 } 
          color = "#f472b6" 
          opacity = { 0.05 } 
          glowColor = "rgba( 192 , 38 , 211 , 0.3 )"
        />
      </div>
    </div>

  );

};

export default BaseScreen;
