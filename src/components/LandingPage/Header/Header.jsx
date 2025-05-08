
import React , { useState , useRef , useEffect } from 'react';

import { useNavProvider } from '../../Navigation/NavProvider';

import GradientButton from '../../UI/GradientButton';

import { useNavigate } from 'react-router-dom'

const Header = ( ) => {

  const navigate = useNavigate ( )

  // Use States for Mobile Menu and Active Link.
  const [ mobileMenuOpen, setMobileMenuOpen ] = useState ( false );
  const { activeLink, setActiveLink } = useNavProvider ( );
  const activeLinkRef = useRef ( null );
  const [ indicatorStyle, setIndicatorStyle ] = useState ( { left: 0, width: 0 } );
  
  // Toggle menu function.
  const toggleMobileMenu = ( ) => {
    setMobileMenuOpen ( !mobileMenuOpen );
  };

  // Handling navigation click.
  const handleNavClick = ( e, id ) => {
    e.preventDefault ( );
    const element = document.getElementById ( id );
    if ( element ) {
      element.scrollIntoView ( { behavior: 'smooth' } );
      setActiveLink ( id );
    }
  };

  // Updating indicator position when active link changes.
  useEffect ( ( ) => {
    if ( activeLinkRef.current ) {
      const { offsetLeft, offsetWidth } = activeLinkRef.current;
      setIndicatorStyle ( {
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      } );
    }
  }, [ activeLink ] );

  const toLogin = ( ) => {
    navigate ( '/login' )
  }

  return (
    
    <section className = "bg-[#593192] text-white fixed top-0 left-0 right-0 z-50 shadow-md">
      
      <div className = "flex justify-between items-center max-w-[1200px] px-5 mx-auto flex-wrap">
        
        <div className = "flex items-center">

          <a href = "#">
            <img src = "./HyperPOS - Logo.svg" alt = "logo" className = "logo-glow h-[70px] w-[70px]"/>
          </a>
          
          {/* Mobile menu button. */}
          <div className = "md:hidden flex items-center ml-3">
            <button 
              className = "text-white p-2" 
              onClick = { toggleMobileMenu }
              aria-label = "Toggle mobile menu"
            >
              <svg xmlns = "http://www.w3.org/2000/svg" className = "h-6 w-6" fill = "none" viewBox = "0 0 24 24" stroke = "currentColor">
                <path strokeLinecap = "round" strokeLinejoin = "round" strokeWidth = { 2 } d = "M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop menu. */}
        <div className = "hidden md:block relative">

          <div 
            className = "absolute bg-[#9854F8]/30 h-8 rounded-full transition-all duration-300 ease-in-out"
            style = { {
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              top: '50%',
              transform: 'translateY(-50%)'
            } }
          ></div>
          
          <ul className = "flex list-none gap-6 flex-wrap p-0 my-2.5 relative z-10">
            <li className = "text-center">
              <a 
                href = "#home" 
                ref = { activeLink === 'home' ? activeLinkRef : null }
                className = { `relative text-white no-underline text-[1.1rem] font-medium hover:text-[#9854F8] transition-colors duration-300 px-3 py-1.5 rounded-full inline-block group
                  ${ activeLink === 'home' ? 'text-[#9854F8]' : '' }` }
                onClick = { ( e ) => handleNavClick ( e, 'home' ) }
              > 
                Home
                <span className = "absolute left-0 bottom-[-4px] w-full h-[3px] bg-[#ff44cc] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </a>
            </li>
            <li className = "text-center">
              <a 
                href = "#about" 
                ref = { activeLink === 'about' ? activeLinkRef : null }
                className = { `relative text-white no-underline text-[1.1rem] font-medium hover:text-[#9854F8] transition-colors duration-300 px-3 py-1.5 rounded-full inline-block group
                  ${ activeLink === 'about' ? 'text-[#9854F8]' : '' }` }
                onClick = { ( e ) => handleNavClick ( e, 'about' ) }
              >
                About Us
                <span className = "absolute left-0 bottom-[-4px] w-full h-[3px] bg-[#ff44cc] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </a>
            </li>
            <li className = "text-center">
              <a 
                href = "#features" 
                ref = { activeLink === 'features' ? activeLinkRef : null }
                className = { `relative text-white no-underline text-[1.1rem] font-medium hover:text-[#9854F8] transition-colors duration-300 px-3 py-1.5 rounded-full inline-block group
                  ${ activeLink === 'features' ? 'text-[#9854F8]' : '' }` }
                onClick = { ( e ) => handleNavClick ( e, 'features' ) }
              >
                Features
                <span className = "absolute left-0 bottom-[-4px] w-full h-[3px] bg-[#ff44cc] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </a>
            </li>
            <li className = "text-center">
              <a 
                href = "#faq" 
                ref = { activeLink === 'faq' ? activeLinkRef : null }
                className = { `relative text-white no-underline text-[1.1rem] font-medium hover:text-[#9854F8] transition-colors duration-300 px-3 py-1.5 rounded-full inline-block group
                  ${ activeLink === 'faq' ? 'text-[#9854F8]' : '' }` }
                onClick = { ( e ) => handleNavClick ( e, 'faq' ) }
              >
                FAQ
                <span className = "absolute left-0 bottom-[-4px] w-full h-[3px] bg-[#ff44cc] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </a>
            </li>
          </ul>
        </div>

        <div className = "my-2.5">
          <GradientButton 
            className = "py-2 px-5 text-sm h-9 min-w-[90px] rounded-xl"
            onClick = { toLogin }
          >
            Login
          </GradientButton>
        </div>

      </div>

      {/* Mobile menu. */}
      <div className = { `${ mobileMenuOpen ? 'block' : 'hidden' } w-full md:hidden bg-[#593192] border-t border-[#9854F8]/30 mb-0 pb-2` }>
        <ul className = "flex flex-col list-none gap-4 p-4 my-0">
          <li className = "text-center">
            <a 
              href = "#home" 
              className = { `relative text-white no-underline text-[1.1rem] font-medium hover:text-[#9854F8] transition-colors duration-300 inline-block group
                ${ activeLink === 'home' ? 'text-[#9854F8]' : '' }` }
              onClick = { ( e ) => {
                handleNavClick ( e, 'home' );
                toggleMobileMenu ( );
              } }
            > 
              Home
              <span className = "absolute left-0 bottom-[-4px] w-full h-[3px] bg-[#ff44cc] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </a>
          </li>
          <li className = "text-center">
            <a 
              href = "#about" 
              className = { `relative text-white no-underline text-[1.1rem] font-medium hover:text-[#9854F8] transition-colors duration-300 inline-block group
                ${ activeLink === 'about' ? 'text-[#9854F8]' : '' }` }
              onClick = { ( e ) => {
                handleNavClick ( e, 'about' );
                toggleMobileMenu ( );
              } }
            >
              About Us
              <span className = "absolute left-0 bottom-[-4px] w-full h-[3px] bg-[#ff44cc] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </a>
          </li>
          <li className = "text-center">
            <a 
              href = "#features" 
              className = { `relative text-white no-underline text-[1.1rem] font-medium hover:text-[#9854F8] transition-colors duration-300 inline-block group
                ${ activeLink === 'features' ? 'text-[#9854F8]' : '' }` }
              onClick = { ( e ) => {
                handleNavClick ( e, 'features' );
                toggleMobileMenu ( );
              } }
            >
              Features
              <span className = "absolute left-0 bottom-[-4px] w-full h-[3px] bg-[#ff44cc] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </a>
          </li>
          <li className = "text-center">
            <a 
              href = "#faq" 
              className = { `relative text-white no-underline text-[1.1rem] font-medium hover:text-[#9854F8] transition-colors duration-300 inline-block group
                ${ activeLink === 'faq' ? 'text-[#9854F8]' : '' }` }
              onClick = { ( e ) => {
                handleNavClick ( e, 'faq' );
                toggleMobileMenu ( );
              } }
            >
              FAQ
              <span className = "absolute left-0 bottom-[-4px] w-full h-[3px] bg-[#ff44cc] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </a>
          </li>
        </ul>
      </div>
      
    </section>
    
  );
  
};

export default Header;
