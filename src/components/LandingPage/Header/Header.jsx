
import React from 'react'

import "./Header.css"

const Header = ( ) => {

  return (

    <section className = "h-wrapper">

      <div className = "h-container">

        <img src = "./Header-Logo.png" alt = "logo" className = "h-logo" width = { 100 } />

        <ul className = "h-menu">
          <li className = "h-item">
            <a href = "/home" className = "h-link"> Home</a>
          </li>
          <li className = "h-item">
            <a href = "/about" className = "h-link">About Us</a>
          </li>
          <li className = "h-item">
            <a href = "/contact" className = "h-link">Contact</a>
          </li>
          <li className = "h-item">
            <a href = "/faq" className = "h-link">FAQ</a>
          </li>
        </ul>

        <div className = "h-button">
          <button className = "button">Login</button>
        </div>

      </div>

    </section>

  )

}

export default Header;
