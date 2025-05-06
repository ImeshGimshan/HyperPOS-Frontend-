
/* eslint-disable react-refresh/only-export-components */

import React, { createContext , useContext , useState } from "react";

const NavContext = createContext ( {
  activeLink : "",
  setActiveLink : ( ) => "",
} );

export default function NavProvider ( { children } ) {
  
  const [ activeLink , setActiveLink ] = useState ( "home" );
  
  return (
    
    <NavContext.Provider value = { { activeLink , setActiveLink } }>
      { children }
    </NavContext.Provider>
    
  );
  
}

export const useNavProvider = ( ) => useContext ( NavContext );
