
import React, { useState, useEffect } from 'react'

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa"
import { FaLocationDot, FaPhone, FaEnvelope, FaArrowUp } from "react-icons/fa6"

import ParticleBackground from '../../UI/ParticleBackground'

const Footer = () => {

  const [setHoveredCard] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function.
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (

    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#593192] to-[#07182E] -z-10"></div>
      
      {/* Particles using ParticleBackground component */}
      <ParticleBackground count={15} className="absolute inset-0 -z-5" />
      
      {/* Scanlines */}
      <div className="hyper-scanlines absolute inset-0 -z-5 pointer-events-none"></div>
      <div className="hyper-scanline absolute inset-0 -z-5 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex flex-col items-center gap-6 text-white font-['Open_Sans'] text-xs">

        <div className="mb-2">
          <a href="#">
            <img src="./HyperPOS.svg" alt="logo" width={120} className="filter drop-shadow-[0_0_8px_rgba(152,84,248,0.6)] animate-[logo-pulse_3s_infinite_ease-in-out]" />
          </a>
        </div>

        <div className="flex flex-wrap justify-between w-full gap-6">

          {/* About Us Section. */}
          <div className="flex-1 flex-shrink-0 min-w-[250px]">

            <div 
              className="relative bg-black/40 backdrop-blur-md p-6 rounded-lg border border-[#f472b6]/30 shadow-lg overflow-hidden h-full"
              onMouseEnter={() => setHoveredCard('about')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Top neon line */}
              <div className="hyper-line-accent absolute top-0 left-0"></div>
              
              {/* Corner decorations */}
              <div className="hyper-modal-corner hyper-modal-corner-tl"></div>
              <div className="hyper-modal-corner hyper-modal-corner-tr"></div>
              <div className="hyper-modal-corner hyper-modal-corner-bl"></div>
              <div className="hyper-modal-corner hyper-modal-corner-br"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold hyper-text-glow text-center mb-4">
                  About <span className="text-[#f472b6]">Us</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <FaPhone className="text-[#9854F8] mt-1 filter drop-shadow-[0_0_3px_rgba(152,84,248,0.5)] transition-all duration-300 group-hover:text-[#FF44CC] group-hover:filter-drop-shadow-[0_0_5px_rgba(255,68,204,0.7)] group-hover:scale-110" />
                    <span className="text-white/90">(456) 789-12301</span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <FaEnvelope className="text-[#9854F8] mt-1 filter drop-shadow-[0_0_3px_rgba(152,84,248,0.5)] transition-all duration-300 group-hover:text-[#FF44CC] group-hover:filter-drop-shadow-[0_0_5px_rgba(255,68,204,0.7)] group-hover:scale-110" />
                    <span className="text-white/90">info@modrino.co.uk</span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <FaLocationDot className="text-[#9854F8] mt-1 filter drop-shadow-[0_0_3px_rgba(152,84,248,0.5)] transition-all duration-300 group-hover:text-[#FF44CC] group-hover:filter-drop-shadow-[0_0_5px_rgba(255,68,204,0.7)] group-hover:scale-110" />
                    <span className="text-white/90">South 13th Street<br />New York, America</span>
                  </div>
                </div>
              </div>
              
              {/* Bottom neon line */}
              <div className="hyper-line-bottom absolute bottom-0 left-0"></div>
            </div>

          </div>

          {/* Recent News Section. */}
          <div className="flex-1 flex-shrink-0 min-w-[250px]">

            <div 
              className="relative bg-black/40 backdrop-blur-md p-6 rounded-lg border border-[#f472b6]/30 shadow-lg overflow-hidden h-full"
              onMouseEnter={() => setHoveredCard('news')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Top neon line */}
              <div className="hyper-line-accent absolute top-0 left-0"></div>
              
              {/* Corner decorations */}
              <div className="hyper-modal-corner hyper-modal-corner-tl"></div>
              <div className="hyper-modal-corner hyper-modal-corner-tr"></div>
              <div className="hyper-modal-corner hyper-modal-corner-bl"></div>
              <div className="hyper-modal-corner hyper-modal-corner-br"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold hyper-text-glow text-center mb-4">
                  Recent <span className="text-[#f472b6]">News</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 group hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-8 h-8 bg-[#9854F8]/30 rounded-md group-hover:bg-[#FF44CC]/30 group-hover:shadow-[0_0_10px_rgba(255,68,204,0.5)] transition-all duration-300"></div>
                    <div>
                      <span className="block text-[#FF44CC] text-xs mb-0.5">June 14, 2024</span>
                      <p className="text-white/90 text-sm group-hover:text-white transition-colors duration-300">New features released</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 group hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-8 h-8 bg-[#9854F8]/30 rounded-md group-hover:bg-[#FF44CC]/30 group-hover:shadow-[0_0_10px_rgba(255,68,204,0.5)] transition-all duration-300"></div>
                    <div>
                      <span className="block text-[#FF44CC] text-xs mb-0.5">June 10, 2024</span>
                      <p className="text-white/90 text-sm group-hover:text-white transition-colors duration-300">System updates</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom neon line */}
              <div className="hyper-line-bottom absolute bottom-0 left-0"></div>
            </div>

          </div>

        </div>

        {/* Navigation Links. */}
        <div className="w-full max-w-3xl mx-auto">
          <ul className="flex justify-evenly items-center w-full py-3 list-none flex-wrap gap-3 sm:gap-4">
            <li>
              <a 
                href="#home" 
                className="relative text-white no-underline text-[0.9rem] font-medium hover:text-[#9854F8] transition-colors duration-300 px-3 py-1.5 rounded-full inline-block group"
                onClick={(e) => handleNavClick(e, 'home')}
              > 
                Home
                <span className="absolute left-0 bottom-[-4px] w-full h-[3px] bg-[#ff44cc] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className="relative text-white no-underline text-[0.9rem] font-medium hover:text-[#9854F8] transition-colors duration-300 px-3 py-1.5 rounded-full inline-block group"
                onClick={(e) => handleNavClick(e, 'about')}
              >
                About Us
                <span className="absolute left-0 bottom-[-4px] w-full h-[3px] bg-[#ff44cc] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </a>
            </li>
            <li>
              <a 
                href="#features" 
                className="relative text-white no-underline text-[0.9rem] font-medium hover:text-[#9854F8] transition-colors duration-300 px-3 py-1.5 rounded-full inline-block group"
                onClick={(e) => handleNavClick(e, 'features')}
              >
                Features
                <span className="absolute left-0 bottom-[-4px] w-full h-[3px] bg-[#ff44cc] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </a>
            </li>
            <li>
              <a 
                href="#faq" 
                className="relative text-white no-underline text-[0.9rem] font-medium hover:text-[#9854F8] transition-colors duration-300 px-3 py-1.5 rounded-full inline-block group"
                onClick={(e) => handleNavClick(e, 'faq')}
              >
                FAQ
                <span className="absolute left-0 bottom-[-4px] w-full h-[3px] bg-[#ff44cc] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </a>
            </li>
          </ul>
        </div>

        {/* Divider. */}
        <div className="w-full h-px bg-[#9854F8]/30 my-3"></div>

        <div className="text-center mt-1 text-white/80 text-xs w-full flex flex-col items-center gap-3">

          <p className="mb-1">© 2025 HyperPOS. All rights reserved.</p>
          
          {/* Social Media Icons. */}
          <div className="flex justify-center gap-4 mt-1 p-2">

            <a 
              href="#" 
              className="w-10 h-10 bg-[#07182E]/80 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-[#3b5998] active:scale-90 group shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#3b5998,0_0_15px_#3b5998,0_0_30px_#3b5998] hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_10px_#3b5998,0_0_20px_#3b5998,0_0_40px_#3b5998] animate-[pulse_2s_infinite]"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-4 h-4 text-white group-hover:animate-[slideInTop_0.3s_both]" />
            </a>
            
            <a 
              href="#" 
              className="w-10 h-10 bg-[#07182E]/80 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-[#d62976] active:scale-90 group shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#d62976,0_0_15px_#d62976,0_0_30px_#d62976] hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_10px_#d62976,0_0_20px_#d62976,0_0_40px_#d62976] animate-[pulse_2s_infinite]"
              aria-label="Instagram"
            >
              <FaInstagram className="w-4 h-4 text-white group-hover:animate-[slideInTop_0.3s_both]" />
            </a>
            
            <a 
              href="#" 
              className="w-10 h-10 bg-[#07182E]/80 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-[#00acee] active:scale-90 group shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#00acee,0_0_15px_#00acee,0_0_30px_#00acee] hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_10px_#00acee,0_0_20px_#00acee,0_0_40px_#00acee] animate-[pulse_2s_infinite]"
              aria-label="Twitter"
            >
              <FaTwitter className="w-4 h-4 text-white group-hover:animate-[slideInTop_0.3s_both]" />
            </a>
            
            <a 
              href="#" 
              className="w-10 h-10 bg-[#07182E]/80 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-[#0072b1] active:scale-90 group shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#0072b1,0_0_15px_#0072b1,0_0_30px_#0072b1] hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_10px_#0072b1,0_0_20px_#0072b1,0_0_40px_#0072b1] animate-[pulse_2s_infinite]"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-4 h-4 text-white group-hover:animate-[slideInTop_0.3s_both]" />
            </a>

          </div>
          
        </div>

        {/* Scroll to top button */}
        <button 
          onClick={scrollToTop} 
          className={`fixed right-6 bottom-6 w-12 h-12 bg-[#9854F8]/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#FF44CC] active:scale-90 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#9854F8,0_0_15px_#9854F8,0_0_30px_#9854F8] hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_10px_#FF44CC,0_0_20px_#FF44CC,0_0_40px_#FF44CC] z-50 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-5 h-5 text-white" />
        </button>

      </div>

      {/* Keyframe animations for social icons */}
      <style jsx>{`
        @keyframes slideInTop {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>

    </section>

  )

}

export default Footer

