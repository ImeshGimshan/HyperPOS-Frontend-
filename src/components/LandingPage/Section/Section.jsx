
/* eslint-disable no-unused-vars */

import React, { useRef } from 'react'

import './Section.css'

import { motion, useScroll, useTransform } from 'framer-motion'

const Section = ( ) => {

  // Reference for the scroll container.
  const containerRef = useRef ( null )
  
  // Scroll progress.
  const { scrollYProgress } = useScroll ( {
    target: containerRef,
    offset: [ "start start", "end start" ]
  } )
  
  // Transform values based on scroll.
  const firstLineOpacity = useTransform ( scrollYProgress, [ 0, 0.15 ], [ 1, 0 ] )
  const firstLineY = useTransform ( scrollYProgress, [ 0, 0.15 ], [ 0, -100 ] )
  
  const secondLineOpacity = useTransform ( scrollYProgress, [ 0, 0.15 ], [ 1, 0 ] )
  const secondLineY = useTransform ( scrollYProgress, [ 0, 0.15 ], [ 0, 100 ] )
  
  const cardsOpacity = useTransform ( scrollYProgress, [ 0.15, 0.25 ], [ 0, 1 ] )
  const titleOpacity = useTransform ( scrollYProgress, [ 0.2, 0.3 ], [ 0, 1 ] )
  
  // Card transformations.
  const card1Transform = useTransform ( scrollYProgress, [ 0.15, 0.25 ], [ 50, 0 ] )
  const card2Transform = useTransform ( scrollYProgress, [ 0.15, 0.25 ], [ -50, 0 ] )
  const card3Transform = useTransform ( scrollYProgress, [ 0.15, 0.25 ], [ 50, 0 ] )

  return (

    <div 
      ref = { containerRef }
      className = "section-wrapper"
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        `}
      </style>
      
      <div className = "section-sticky-container">

        {/* Masked and splitting text. */}
        <div className = "masked-text-container">

          <motion.h1 
            className = "masked-text first-line"
            style = { { 
              opacity: firstLineOpacity,
              y: firstLineY
            } }
          >
            Cloud-based POS
          </motion.h1>
          
          <motion.h1 
            className = "masked-text second-line"
            style = { { 
              opacity: secondLineOpacity,
              y: secondLineY
            } }
          >
            with Endless Possibilities
          </motion.h1>

        </div>
        
        {/* Title. */}
        <motion.h2 
          className = "section-title"
          style = { { opacity: titleOpacity } }
        >
          Tailored solutions for every business type
        </motion.h2>
        
        {/* Cards. */}
        <motion.div 
          className = "cards-container"
          style = { { opacity: cardsOpacity } }
        >

          {/* Restaurant Card. */}
          <motion.div 
            className = "card-parent"
            style = { { y: card1Transform } }
          >
            <div className = "card-3d">

              <div className = "card-glass"></div>
              
              <div className = "card-logo">
                <span className = "card-circle circle1"></span>
                <span className = "card-circle circle2"></span>
                <span className = "card-circle circle3"></span>
                <span className = "card-circle circle4"></span>
                <span className = "card-circle circle5">
                  <img src = "./HyperPOS - Logo.svg" alt = "HyperPOS Logo" className = "circle-logo" />
                </span>
              </div>
              
              <div className = "card-inner">

                <div className = "card-header">
                  <div className = "card-image-wrapper">
                    <img src = "./nap_cat.gif" alt = "Restaurant" className = "card-main-image" />
                  </div>
                </div>
                
                <div className = "card-content">
                  <span className = "card-title">Restaurant</span>
                  <span className = "card-text">
                    Manage your restaurant with ease using tools for order taking, table management, kitchen printing, split billing, and real-time sales tracking.
                  </span>
                </div>

              </div>

            </div>
          </motion.div>
          
          {/* Retail Card. */}
          <motion.div 
            className = "card-parent"
            style = { { y: card2Transform } }
          >
            <div className = "card-3d">

              <div className = "card-glass"></div>
              
              <div className = "card-logo">
                <span className = "card-circle circle1"></span>
                <span className = "card-circle circle2"></span>
                <span className = "card-circle circle3"></span>
                <span className = "card-circle circle4"></span>
                <span className = "card-circle circle5">
                  <img src = "./HyperPOS - Logo.svg" alt = "HyperPOS Logo" className = "circle-logo" />
                </span>
              </div>
              
              <div className = "card-inner">

                <div className = "card-header">
                  <div className = "card-image-wrapper">
                    <img src = "./nap_cat.gif" alt = "Retail" className = "card-main-image" />
                  </div>
                </div>
                
                <div className = "card-content">
                  <span className = "card-title">Retail</span>
                  <span className = "card-text">
                    All the retail tools you need for selling online and in-store, including inventory management, detailed reports, customer profiles, and seamless returns processing.
                  </span>
                </div>

              </div>

            </div>
          </motion.div>
          
          {/* Cafe Card. */}
          <motion.div 
            className = "card-parent"
            style = { { y: card3Transform } }
          >
            <div className = "card-3d">

              <div className = "card-glass"></div>
              
              <div className = "card-logo">
                <span className = "card-circle circle1"></span>
                <span className = "card-circle circle2"></span>
                <span className = "card-circle circle3"></span>
                <span className = "card-circle circle4"></span>
                <span className = "card-circle circle5">
                  <img src = "./HyperPOS - Logo.svg" alt = "HyperPOS Logo" className = "circle-logo" />
                </span>
              </div>
              
              <div className = "card-inner">

                <div className = "card-header">
                  <div className = "card-image-wrapper">
                    <img src = "./nap_cat.gif" alt = "Cafe" className = "card-main-image" />
                  </div>
                </div>
                
                <div className = "card-content">
                  <span className = "card-title">Cafe & Coffee Shop</span>
                  <span className = "card-text">
                    Streamline operations with quick order processing, customizable menus, loyalty programs, and inventory tracking designed for busy cafes.
                  </span>
                </div>

              </div>

            </div>
          </motion.div>

        </motion.div>

      </div>
      
    </div>

  )

}

export default Section
