
import React from 'react'

import "./Footer.css"

import { FaFacebookF , FaWhatsapp , FaInstagram } from "react-icons/fa"

const Footer = ( ) => {
      
  return (
    <section className="footer-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        
        <div className="footer-top">
          <img src="./logo.png" alt="logo" width={50} />
          
        <div className = "footer-top">

          <img src = "./logo.png" alt = "logo" width = { 120 } />
            
          <div className = "footer-socials">
          <span>Follow Us</span>
            <a href = "#"><FaFacebookF /></a>
            <a href = "#"><FaWhatsapp /></a>
            <a href = "#"><FaInstagram /></a>
          </div>

        </div>
          
        <div className = "footer-content">

          <div className = "footer-section">

            <h3>About Us</h3>
            <p>(456) 789-12301<br/>
            info@modrino.co.uk<br/>
            South 13th Street<br />New York, America</p>

          </div>

          <div className = "footer-section">

            <h3>Explore</h3>

            <ul>
              <li><a href = "#">Home</a></li>
              <li><a href = "#">Blog</a></li>
              <li><a href = "#">Contact Us</a></li>
              <li><a href = "#">Services</a></li>
            </ul>

          </div>

          <div className = "footer-section">
            
            <h3>Recent News</h3>

            <div className = "news-item">
              <div className = "news-img"></div>
              <div>
                <span>June 14,2024</span>
                <p>text</p>
              </div>
            </div>

            <div className = "news-item">
              <div className = "news-img"></div>
              <div>
                <span>June 14,2024</span>
                <p>text</p>
              </div>
            </div>

          </div>

        </div>

        <div className = "footer-bottom">
          © 2025 HyperPOS. All rights reserved.
        </div>

      </div>

      </div>

    </section>

  )

}

export default Footer;
