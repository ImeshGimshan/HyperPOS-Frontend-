
import React , { useState , useEffect } from 'react'

import { FaFacebookF , FaTwitter , FaLinkedinIn , FaInstagram } from "react-icons/fa"
import { FaLocationDot, FaPhone, FaEnvelope, FaArrowUp } from "react-icons/fa6"

import './Footer.css'

const Footer = ( ) => {

  const [ setHoveredCard ] = useState ( null );
  const [ showScrollTop, setShowScrollTop ] = useState ( false );

  useEffect ( ( ) => {
    const handleScroll = ( ) => {
      setShowScrollTop ( window.scrollY > 300 );
    };
    
    window.addEventListener ( 'scroll' , handleScroll );
    return ( ) => window.removeEventListener ( 'scroll' , handleScroll );
  } , [ ] );

  // Scroll to top function.
  const scrollToTop = ( ) => {

    window.scrollTo ( {
      top : 0,
      behavior : 'smooth'
    } );

  };

  const handleNavClick = ( e , id ) => {
    e.preventDefault ( );
    const element = document.getElementById ( id );
    if ( element ) {
      element.scrollIntoView ( { behavior : 'smooth' } );
    }
  };

  return (

    <section className = "bg-gradient-to-b from-[#593192] to-[#07182E] text-white py-8 font-['Open_Sans'] text-xs relative overflow-hidden">

      {/* Animated background particles. */}
      <div className = "particles-container">

        {  [ ...Array ( 15 ) ].map ( ( _ , i ) => (

          <div 
            key = { i } 
            className = "particle"
            style = { {
              left : `${Math.random() * 100}%`,
              top : `${Math.random() * 100}%`,
              animationDelay : `${Math.random() * 5}s`,
              width : `${Math.random() * 8 + 2}px`,
              height : `${Math.random() * 8 + 2}px`,
            } }
          ></div>

        ) ) }

      </div>

      <div className = "relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">

        <div className="mb-2">
          <a href = "#">
            <img src = "./HyperPOS - Logo.svg" alt = "logo" width = { 120 } className = "logo-glow" />
          </a>
        </div>

        <div className = "flex flex-wrap justify-between w-full gap-6">

          {/* About Us Section. */}
          <div className = "flex-1 flex-shrink-0 min-w-[250px]">

            <div 
              className = "glass-neon-card"
              onMouseEnter = { ( ) => setHoveredCard ( 'about' ) }
              onMouseLeave = { ( ) => setHoveredCard ( null ) }
            >
              {/* Card inner glow. */}
              <div className = "card-glow"></div>
              
              <div className = "card-content">
                <h3 className = "neon-text">About Us</h3>
                
                <div className = "info-container">
                  <div className = "info-item">
                    <FaPhone className = "info-icon" />
                    <span className = "info-text">(456) 789-12301</span>
                  </div>
                  
                  <div className = "info-item">
                    <FaEnvelope className = "info-icon" />
                    <span className = "info-text">info@modrino.co.uk</span>
                  </div>
                  
                  <div className = "info-item">
                    <FaLocationDot className = "info-icon" />
                    <span className = "info-text">South 13th Street<br />New York, America</span>
                  </div>
                </div>
              </div>
              
              {/* Floating particles inside card. */}
              <div className = "card-particles">
                {[ ...Array ( 4 ) ].map ( ( _, i ) => (
                  <div 
                    key = { i } 
                    className = "card-particle"
                    style = { {
                      left: `${ Math.random ( ) * 100 }%`,
                      top: `${ Math.random ( ) * 100 }%`,
                      width: `${ Math.random ( ) * 3 + 1 }px`,
                      height: `${ Math.random ( ) * 3 + 1 }px`,
                      animationDelay: `${ Math.random ( ) * 5 }s`,
                    } }
                  ></div>
                ) ) }
              </div>

            </div>

          </div>

          {/* Recent News Section. */}
          <div className = "flex-1 flex-shrink-0 min-w-[250px]">

            <div 
              className = "glass-neon-card"
              onMouseEnter = { ( ) => setHoveredCard ( 'news' ) }
              onMouseLeave = { ( ) => setHoveredCard ( null ) }
            >
              <div className="card-glow"></div>
              
              <div className = "card-content">
                <h3 className = "neon-text">Recent News</h3>
                
                <div className = "news-container">
                  <div className = "news-item">
                    <div className = "news-image"></div>
                    <div className = "news-content">
                      <span className = "news-date">June 14, 2024</span>
                      <p className = "news-title">New features released</p>
                    </div>
                  </div>
                  
                  <div className = "news-item">
                    <div className = "news-image"></div>
                    <div className = "news-content">
                      <span className = "news-date">June 10, 2024</span>
                      <p className = "news-title">System updates</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card-particles">
                {[ ...Array ( 4 ) ].map ( ( _, i ) => (
                  <div 
                    key = { i } 
                    className = "card-particle"
                    style = { {
                      left: `${ Math.random ( ) * 100 }%`,
                      top: `${ Math.random ( ) * 100 }%`,
                      width: `${ Math.random ( ) * 3 + 1 }px`,
                      height: `${ Math.random ( ) * 3 + 1 }px`,
                      animationDelay: `${ Math.random ( ) * 5 }s`,
                    } }
                  ></div>
                ) ) }
              </div>

            </div>

          </div>

        </div>

        {/* Navigation Links. */}
        <div className = "w-full max-w-3xl mx-auto">
          <ul className = "flex justify-evenly items-center w-full py-3 list-none flex-wrap gap-3 sm:gap-4">
            <li className = "nav-link-item">
              <a 
                href = "#home" 
                className = "relative text-white no-underline text-[0.9rem] font-medium hover:text-[#9854F8] transition-colors duration-300 px-3 py-1.5 rounded-full inline-block group"
                onClick = { ( e ) => handleNavClick ( e , 'home' ) }
              > 
                Home
                <span className = "absolute left-0 bottom-[-4px] w-full h-[3px] bg-[#ff44cc] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </a>
            </li>
            <li className = "nav-link-item">
              <a 
                href = "#about" 
                className = "relative text-white no-underline text-[0.9rem] font-medium hover:text-[#9854F8] transition-colors duration-300 px-3 py-1.5 rounded-full inline-block group"
                onClick = { ( e ) => handleNavClick ( e , 'about' ) }
              >
                About Us
                <span className = "absolute left-0 bottom-[-4px] w-full h-[3px] bg-[#ff44cc] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </a>
            </li>
            <li className = "nav-link-item">
              <a 
                href = "#features" 
                className = "relative text-white no-underline text-[0.9rem] font-medium hover:text-[#9854F8] transition-colors duration-300 px-3 py-1.5 rounded-full inline-block group"
                onClick = { ( e ) => handleNavClick ( e , 'features' ) }
              >
                Features
                <span className = "absolute left-0 bottom-[-4px] w-full h-[3px] bg-[#ff44cc] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </a>
            </li>
            <li className = "nav-link-item">
              <a 
                href = "#faq" 
                className = "relative text-white no-underline text-[0.9rem] font-medium hover:text-[#9854F8] transition-colors duration-300 px-3 py-1.5 rounded-full inline-block group"
                onClick = { ( e ) => handleNavClick ( e , 'faq' ) }
              >
                FAQ
                <span className = "absolute left-0 bottom-[-4px] w-full h-[3px] bg-[#ff44cc] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </a>
            </li>
          </ul>
        </div>

        {/* Divider. */}
        <div className = "w-full h-px bg-[#9854F8]/30 my-3"></div>

        <div className = "text-center mt-1 text-white/80 text-xs w-full flex flex-col items-center gap-3">

          <p className = "mb-1">© 2025 HyperPOS. All rights reserved.</p>
          
          {/* Social Media Icons. */}
          <div className = "flex justify-center gap-4 mt-1 p-2">

            <a 
              href = "#" 
              className = "social-icon facebook-icon w-10 h-10 bg-[#07182E]/80 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-[#3b5998] active:scale-90 group"
              aria-label = "Facebook"
            >
              <FaFacebookF className = "w-4 h-4 text-white group-hover:animate-slideInTop" />
            </a>
            
            <a 
              href = "#" 
              className = "social-icon instagram-icon w-10 h-10 bg-[#07182E]/80 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-[#d62976] active:scale-90 group"
              aria-label = "Instagram"
            >
              <FaInstagram className = "w-4 h-4 text-white group-hover:animate-slideInTop" />
            </a>
            
            <a 
              href = "#" 
              className = "social-icon twitter-icon w-10 h-10 bg-[#07182E]/80 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-[#00acee] active:scale-90 group"
              aria-label = "Twitter"
            >
              <FaTwitter className = "w-4 h-4 text-white group-hover:animate-slideInTop" />
            </a>
            
            <a 
              href = "#" 
              className = "social-icon linkedin-icon w-10 h-10 bg-[#07182E]/80 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-[#0072b1] active:scale-90 group"
              aria-label = "LinkedIn"
            >
              <FaLinkedinIn className = "w-4 h-4 text-white group-hover:animate-slideInTop" />
            </a>

          </div>

        </div>

      </div>

      {/* Scroll up button. */}
      <button 
        className = { `scroll-top-button ${ showScrollTop ? 'visible' : '' }` }
        onClick = { scrollToTop }
        aria-label = "Scroll to top"
      >
        <FaArrowUp />
      </button>

    </section>

  )

}

export default Footer;
