
import React from 'react'

import { FaFacebookF , FaWhatsapp , FaInstagram } from "react-icons/fa"

const Footer = ( ) => {

  return (

    <section className="bg-black text-white py-5 font-['Open_Sans'] text-sm">

      <div className="flex flex-col items-center justify-center max-w-7xl mx-auto gap-5 px-6">

        <div className="flex flex-wrap justify-between w-full gap-8">

          {/* Logo Section */}
          <div className="flex-1 flex-shrink-0 min-w-[150px] flex justify-center items-center">
            <img src="./HyperPOS - Logo.svg" alt="logo" width={120} className="max-w-full" />
          </div>
          
          {/* About Us Section */}
          <div className="flex-1 flex-shrink-0 min-w-[150px]">
            <h3 className="text-base font-bold mb-2.5">About Us</h3>
            <p className="text-white">
              (456) 789-12301<br/>
              info@modrino.co.uk<br/>
              South 13th Street<br />
              New York, America
            </p>
          </div>

          {/* Explore Section */}
          <div className="flex-1 flex-shrink-0 min-w-[150px]">
            <h3 className="text-base font-bold mb-2.5">Explore</h3>
            <ul className="list-none p-0">
              <li className="mb-1.5"><a href="#" className="text-white no-underline hover:underline">Home</a></li>
              <li className="mb-1.5"><a href="#" className="text-white no-underline hover:underline">Blog</a></li>
              <li className="mb-1.5"><a href="#" className="text-white no-underline hover:underline">Contact Us</a></li>
              <li className="mb-1.5"><a href="#" className="text-white no-underline hover:underline">Services</a></li>
            </ul>
          </div>

          {/* Recent News Section */}
          <div className="flex-1 flex-shrink-0 min-w-[150px]">
            
            <h3 className="text-base font-bold mb-2.5">Recent News</h3>
            <div className="flex gap-2.5 items-center mb-2.5">
              <div className="w-10 h-10 bg-[#555]"></div>
              <div>
                <span className="text-xs text-[#E9BD8C]">June 14,2024</span>
                <p>text</p>
              </div>
            </div>

            <div className="flex gap-2.5 items-center mb-2.5">
              <div className="w-10 h-10 bg-[#555]"></div>
              <div>
                <span className="text-xs text-[#E9BD8C]">June 14,2024</span>
                <p>text</p>
              </div>
            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#444] my-5"></div>

        {/* Footer Bottom */}
        <div className="text-center mt-2.5 text-[#aaaaaa] text-xs w-full flex flex-col items-center gap-4">
          <p className="mb-2.5">© 2025 HyperPOS. All rights reserved.</p>
          
          <div className="flex justify-center gap-7 mt-1.5">
            <a href="#" className="text-white text-lg transition-colors duration-300 hover:text-[#8888ff]">
              <FaFacebookF />
            </a>
            <a href="#" className="text-white text-lg transition-colors duration-300 hover:text-[#8888ff]">
              <FaWhatsapp />
            </a>
            <a href="#" className="text-white text-lg transition-colors duration-300 hover:text-[#8888ff]">
              <FaInstagram />
            </a>
          </div>
        </div>

      </div>

    </section>

  )

}

export default Footer;
