
/* eslint-disable no-unused-vars */

import React, { useRef , useState , useEffect } from 'react'

import { motion , useScroll , useTransform } from 'framer-motion'

import '../Section/Section.css'

const Features = ( ) => {

  // Reference for the scroll container
  const containerRef = useRef(null)
  
  // Scroll progress
  const { scrollYProgress } = useScroll ( {
    target : containerRef,
    offset : [ "start start" , "end start" ]

  } )
  
  // Transform values based on scroll
  const firstLineOpacity = useTransform ( scrollYProgress , [ 0 , 0.15 ] , [ 1 , 0 ] )
  const firstLineY = useTransform ( scrollYProgress , [ 0 , 0.15 ] , [ 0 , -100 ] )
  
  const secondLineOpacity = useTransform ( scrollYProgress , [ 0 , 0.15 ] , [ 1 ,  0 ] )
  const secondLineY = useTransform ( scrollYProgress , [ 0 , 0.15 ] , [ 0 , -50 ] )
  
  const thirdLineOpacity = useTransform ( scrollYProgress , [ 0 , 0.15 ] , [ 1 , 0 ] )
  const thirdLineY = useTransform ( scrollYProgress , [ 0 , 0.15 ] , [ 0 , 100 ] )
  
  const cardsOpacity = useTransform ( scrollYProgress , [ 0.15 , 0.25 ] , [ 0 , 1 ] )
  
  // Card transformations
  const card1Transform = useTransform ( scrollYProgress , [ 0.15 , 0.25 ] , [ 50 , 0 ] )
  const card2Transform = useTransform ( scrollYProgress , [ 0.15 , 0.25 ] , [ -50 , 0 ] )
  const card3Transform = useTransform ( scrollYProgress , [ 0.15 , 0.25 ] , [ 50 , 0 ] )

  // Typewriter effect states
  const [ accessibilityText , setAccessibilityText ] = useState ( "" )
  const [ inventoryText , setInventoryText ] = useState ( "" )
  const [ profilesText , setProfilesText ] = useState ( "" )
  
  // Full texts for each card
  const accessibilityFullText = "Access your POS system anytime, anywhere, ensuring flexibility and convenience for your business management needs."
  const inventoryFullText = "Stay updated with your stock levels instantly. Track product availability, receive low stock alerts, and manage inventory efficiently."
  const profilesFullText = "Easily create and manage customer profiles with contact details, purchase history, and preferences to boost loyalty."
  
  // Previous scroll position to determine direction
  const prevScrollRef = useRef ( 0 )
  
  // Effect to handle scroll-based typing
  useEffect ( ( ) => {
    
    const handleScroll = ( ) => {

      // Current scroll progress value.
      const currentScroll = scrollYProgress.get ( )
      
      const scrollingDown = currentScroll > prevScrollRef.current
      
      if ( currentScroll > 0.25 && currentScroll < 0.5 ) {

        const textProgress = (currentScroll - 0.25) / 0.25
        
        // Calculate character position for each text.
        const accessibilityLength = Math.floor ( accessibilityFullText.length * textProgress )
        const inventoryLength = Math.floor ( inventoryFullText.length * textProgress )
        const profilesLength = Math.floor ( profilesFullText.length * textProgress )
        
        // Updating text states.
        setAccessibilityText ( accessibilityFullText.substring ( 0 , accessibilityLength ) )
        setInventoryText ( inventoryFullText.substring ( 0 , inventoryLength ) )
        setProfilesText ( profilesFullText.substring ( 0 , profilesLength ) )

      } else if ( currentScroll <= 0.25 ) {

        setAccessibilityText ( "" )
        setInventoryText ( "" )
        setProfilesText ( "" )
        
      } else if ( currentScroll >= 0.5 ) {

        setAccessibilityText ( accessibilityFullText )
        setInventoryText ( inventoryFullText )
        setProfilesText ( profilesFullText )

      }
      
      prevScrollRef.current = currentScroll

    }
    
    const unsubscribe = scrollYProgress.onChange ( handleScroll )
    
    return ( ) => unsubscribe ( )
  } , [ scrollYProgress , accessibilityFullText , inventoryFullText , profilesFullText ] )

  return (

    <div 

      ref = { containerRef }
      className = "h-[200vh]"

    >

      <div className="sticky top-0 h-screen w-full bg-[rgb(19,5,47)] bg-[url('/Hero-Background.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center">

        {/* Text shadows animation */}
        <style jsx>{`
          .text-shadows {
            --color-primary: #f6aca2;
            --color-secondary: #f49b90;
            --color-tertiary: #f28b7d;
            --color-quaternary: #f07a6a;
            --color-quinary: #ee6352;
            text-shadow: 3px 3px 0 var(--color-secondary), 6px 6px 0 var(--color-tertiary),
              9px 9px var(--color-quaternary), 12px 12px 0 var(--color-quinary);
            font-weight: 700;
            text-transform: uppercase;
            font-size: 1.5rem;
            text-align: center;
            margin: 0;
            color: var(--color-primary);
            animation: shadows 2.5s ease-in infinite;
            letter-spacing: 0.1rem;
          }
          
          .text-shadows-purple {
            --color-primary: #9854F8;
            --color-secondary: #8A4CE0;
            --color-tertiary: #7B45C9;
            --color-quaternary: #6D3EB2;
            --color-quinary: #5E379B;
          }
          
          .text-shadows-pink {
            --color-primary: #FF44CC;
            --color-secondary: #E83DB9;
            --color-tertiary: #D136A6;
            --color-quaternary: #BA2F93;
            --color-quinary: #A32880;
          }
          
          .text-shadows-yellow {
            --color-primary: #FFE942;
            --color-secondary: #E8D43D;
            --color-tertiary: #D1BF38;
            --color-quaternary: #BAAA33;
            --color-quinary: #A3952E;
          }

          @keyframes shadows {
            0% {
              text-shadow: none;
            }
            10% {
              transform: translate(-3px, -3px);
              text-shadow: 3px 3px 0 var(--color-secondary);
            }
            20% {
              transform: translate(-6px, -6px);
              text-shadow: 3px 3px 0 var(--color-secondary),
                6px 6px 0 var(--color-tertiary);
            }
            30% {
              transform: translate(-9px, -9px);
              text-shadow: 3px 3px 0 var(--color-secondary),
                6px 6px 0 var(--color-tertiary), 9px 9px var(--color-quaternary);
            }
            40% {
              transform: translate(-12px, -12px);
              text-shadow: 3px 3px 0 var(--color-secondary),
                6px 6px 0 var(--color-tertiary), 9px 9px var(--color-quaternary),
                12px 12px 0 var(--color-quinary);
            }
            50% {
              transform: translate(-12px, -12px);
              text-shadow: 3px 3px 0 var(--color-secondary),
                6px 6px 0 var(--color-tertiary), 9px 9px var(--color-quaternary),
                12px 12px 0 var(--color-quinary);
            }
            60% {
              text-shadow: 3px 3px 0 var(--color-secondary),
                6px 6px 0 var(--color-tertiary), 9px 9px var(--color-quaternary),
                12px 12px 0 var(--color-quinary);
            }
            70% {
              text-shadow: 3px 3px 0 var(--color-secondary),
                6px 6px 0 var(--color-tertiary), 9px 9px var(--color-quaternary);
            }
            80% {
              text-shadow: 3px 3px 0 var(--color-secondary),
                6px 6px 0 var(--color-tertiary);
            }
            90% {
              text-shadow: 3px 3px 0 var(--color-secondary);
            }
            100% {
              text-shadow: none;
            }
          }
          
          .typewriter-container {
            height: 80px; /* Fixed height to prevent layout shifts */
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .typewriter-text {
            min-height: 4em; /* Ensure enough height for the text */
            padding-right: 5px;
          }
        `}</style>

        <div className = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">

          {/* Masked and splitting text */}
          <div className = "masked-text-container text-center mb-16">
            <motion.h1 
              className = "masked-text first-line text-5xl md:text-6xl"
              style = { { 

                opacity : firstLineOpacity,
                y : firstLineY

              } }
            >
              Key Features
            </motion.h1>
            
            <motion.h1 
              className = "masked-text second-line text-5xl md:text-6xl my-4"
              style = { { 

                opacity : secondLineOpacity,
                y : secondLineY

              } }
            >
              of
            </motion.h1>
            
            <motion.h1 
              className = "masked-text third-line text-5xl md:text-6xl"
              style = { { 

                opacity : thirdLineOpacity,
                y : thirdLineY

              } }
            >
              HyperPOS
            </motion.h1>
          </div>
          
          {/* Cards */}
          <motion.div 
            className = "mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12 lg:mt-24 lg:grid-cols-3 w-full"
            style = { { opacity : cardsOpacity } }
          >
            {/* Accessibility Card */}
            <motion.div 
              className = "relative rounded-xl border-t-4 border-[#9854F8] bg-[#07182E]/80 backdrop-blur-sm shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#9854F8,0_0_15px_#9854F8,0_0_30px_#9854F8] transition-all duration-300 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_10px_#9854F8,0_0_20px_#9854F8,0_0_40px_#9854F8]"
              style = { { y : card1Transform } }
            >
              <div className = "flex flex-col items-center py-10">
                <div className = "-mt-20 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#9854F8] to-[#FF44CC] text-white shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#9854F8,0_0_15px_#9854F8]">
                  <img src = "/Features-Accessibility.png" alt = "Accessibility Icon" className = "h-12 w-12" />
                </div>
                <h3 className = "mt-3 text-shadows text-shadows-purple">Accessibility</h3>
                <div className = "typewriter-container mt-5 px-4">
                  <p className = "typewriter-text text-center text-white/80">
                    { accessibilityText }
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Real-Time Inventory Management Card */}
            <motion.div 
              className = "relative rounded-xl border-t-4 border-[#FF44CC] bg-[#07182E]/80 backdrop-blur-sm shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#FF44CC,0_0_15px_#FF44CC,0_0_30px_#FF44CC] transition-all duration-300 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_10px_#FF44CC,0_0_20px_#FF44CC,0_0_40px_#FF44CC]"
              style = { { y : card2Transform } }
            >
              <div className = "flex flex-col items-center py-10">
                <div className = "-mt-20 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FF44CC] to-[#FFE942] text-white shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#FF44CC,0_0_15px_#FF44CC]">
                  <img src = "/Features-RTIM.png" alt = "Real-Time Inventory Management Icon" className = "h-12 w-12" />
                </div>
                <h3 className = "mt-3 text-shadows text-shadows-pink">Real-Time Inventory</h3>
                <div className = "typewriter-container mt-5 px-4">
                  <p className = "typewriter-text text-center text-white/80">
                    { inventoryText }
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Customer Profiles Card */}
            <motion.div 
              className = "relative rounded-xl border-t-4 border-[#FFE942] bg-[#07182E]/80 backdrop-blur-sm shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#FFE942,0_0_15px_#FFE942,0_0_30px_#FFE942] transition-all duration-300 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_10px_#FFE942,0_0_20px_#FFE942,0_0_40px_#FFE942]"
              style = { { y : card3Transform } }
            >
              <div className = "flex flex-col items-center py-10">
                <div className = "-mt-20 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FFE942] to-[#9854F8] text-white shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#FFE942,0_0_15px_#FFE942]">
                  <img src = "/Features-CPLT.png" alt = "Customer Profiles Icon" className = "h-12 w-12" />
                </div>
                <h3 className = "mt-3 text-shadows text-shadows-yellow">Customer Profiles</h3>
                <div className = "typewriter-container mt-5 px-4">
                  <p className = "typewriter-text text-center text-white/80">
                    { profilesText }
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>

      </div>

    </div>

  )

}

export default Features;
