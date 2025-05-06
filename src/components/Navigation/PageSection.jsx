
import React , { useRef , useEffect } from "react";

import { useNavProvider } from "./NavProvider";

export default function PageSection ( { id, children } ) {
  
  const ref = useRef ( null );
  const { setActiveLink } = useNavProvider ( );
  
  useEffect ( ( ) => {
    
    const observer = new IntersectionObserver (

      ( [ entry ] ) => {
        if ( entry.isIntersecting ) {
          setActiveLink ( id );
        }
      },
      { threshold: 0.5 }
      
    );
    
    if ( ref.current ) {
      observer.observe ( ref.current );
    }
    
    return ( ) => {
      if ( ref.current ) {
        observer.unobserve ( ref.current );
      }
    };
    
  }, [ id, setActiveLink ] );
  
  return (
    
    <section id = { id } ref = { ref }>
      { children }
    </section>
    
  );
  
}
