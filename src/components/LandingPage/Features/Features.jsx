/* eslint-disable no-unused-vars */

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ParticleBackground from '../../UI/ParticleBackground'

const maskedTextContainerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  width: '100%',
  zIndex: 20,
  marginBottom: '4rem',
}

const maskedTextStyle = {
  fontSize: '4rem',
  fontWeight: 'bold',
  textAlign: 'center',
  color: 'transparent',
  backgroundImage: 'linear-gradient(45deg, #9854F8, #FF44CC, #FFE942, #9854F8)',
  backgroundSize: '300%',
  backgroundPosition: '0 50%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'animate-background 8s infinite alternate linear',
  margin: 0,
  lineHeight: 1.3,
  filter: 'drop-shadow(0 0 8px #f472b6)',
}

const keyframes = `
@keyframes animate-background {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
`

const Features = () => {
  // Reference for the scroll container
  const containerRef = useRef(null)
  
  // Scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  // Transform values based on scroll
  const firstLineOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const firstLineY = useTransform(scrollYProgress, [0, 0.15], [0, -100])
  
  const secondLineOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const secondLineY = useTransform(scrollYProgress, [0, 0.15], [0, -50])
  
  const thirdLineOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const thirdLineY = useTransform(scrollYProgress, [0, 0.15], [0, 100])
  
  const cardsOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1])
  
  // Card transformations
  const card1Transform = useTransform(scrollYProgress, [0.15, 0.25], [50, 0])
  const card2Transform = useTransform(scrollYProgress, [0.15, 0.25], [-50, 0])
  const card3Transform = useTransform(scrollYProgress, [0.15, 0.25], [50, 0])

  // Typewriter effect states
  const [accessibilityText, setAccessibilityText] = useState("")
  const [inventoryText, setInventoryText] = useState("")
  const [profilesText, setProfilesText] = useState("")
  
  // Full texts for each card
  const accessibilityFullText = `   Access your POS
  system anytime, anywhere,
  ensuring flexibility and
  convenience for your
  business management
  needs.`
  const inventoryFullText = `Stay updated with
  your stock levels instantly.
  Track product availability,
   receive low stock alerts, 
  and manage inventory
  efficiently.`
  const profilesFullText = `Easily create and
  manage customer profiles
  with contact details,
  purchase history,
  and preferences to 
  boost loyalty.`
  
  // Previous scroll position to determine direction
  const prevScrollRef = useRef(0)
  
  // Effect to handle scroll-based typing
  useEffect(() => {
    const handleScroll = () => {
      // Current scroll progress value.
      const currentScroll = scrollYProgress.get()
      
      const scrollingDown = currentScroll > prevScrollRef.current
      
      if (currentScroll > 0.25 && currentScroll < 0.5) {
        const textProgress = (currentScroll - 0.25) / 0.25
        
        // Calculate character position for each text.
        const accessibilityLength = Math.floor(accessibilityFullText.length * textProgress)
        const inventoryLength = Math.floor(inventoryFullText.length * textProgress)
        const profilesLength = Math.floor(profilesFullText.length * textProgress)
        
        // Updating text states.
        setAccessibilityText(accessibilityFullText.substring(0, accessibilityLength))
        setInventoryText(inventoryFullText.substring(0, inventoryLength))
        setProfilesText(profilesFullText.substring(0, profilesLength))
      } else if (currentScroll <= 0.25) {
        setAccessibilityText("")
        setInventoryText("")
        setProfilesText("")
      } else if (currentScroll >= 0.5) {
        setAccessibilityText(accessibilityFullText)
        setInventoryText(inventoryFullText)
        setProfilesText(profilesFullText)
      }
      
      prevScrollRef.current = currentScroll
    }
    
    const unsubscribe = scrollYProgress.onChange(handleScroll)
    
    return () => unsubscribe()
  }, [scrollYProgress, accessibilityFullText, inventoryFullText, profilesFullText])

  return (
    <div 
      ref={containerRef}
      className="h-[200vh]"
    >
      <style>{keyframes}</style>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 hyper-bg -z-10"></div>
        
        {/* Particles using ParticleBackground component */}
        <ParticleBackground count={15} className="absolute inset-0 -z-5" />
        
        {/* Scanlines */}
        <div className="hyper-scanlines absolute inset-0 -z-5 pointer-events-none"></div>
        <div className="hyper-scanline absolute inset-0 -z-5 pointer-events-none"></div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col items-center relative z-10">
          {/* Masked and splitting text */}
          <div style={maskedTextContainerStyle}>
            <motion.h1 
              style={{
                ...maskedTextStyle,
                opacity: firstLineOpacity,
                y: firstLineY
              }}
            >
              Key <span style={{ color: '#f472b6' }}>Features</span>
            </motion.h1>
            <motion.h1 
              style={{
                ...maskedTextStyle,
                opacity: secondLineOpacity,
                y: secondLineY,
                margin: '1rem 0'
              }}
            >
              of
            </motion.h1>
            <motion.h1 
              style={{
                ...maskedTextStyle,
                opacity: thirdLineOpacity,
                y: thirdLineY
              }}
            >
              <span style={{ color: '#f472b6' }}>Hyper</span>POS
            </motion.h1>
          </div>
          
          {/* Cards */}
          <motion.div 
            className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12 lg:mt-24 lg:grid-cols-3 w-full"
            style={{ opacity: cardsOpacity }}
          >
            {/* Accessibility Card */}
            <motion.div 
              className="relative bg-black/40 backdrop-blur-md rounded-xl border border-[#f472b6]/30 shadow-lg overflow-hidden h-full"
              style={{ y: card1Transform }}
            >
              {/* Top neon line */}
              <div className="hyper-line-accent absolute top-0 left-0"></div>
              
              {/* Corner decorations */}
              <div className="hyper-modal-corner hyper-modal-corner-tl"></div>
              <div className="hyper-modal-corner hyper-modal-corner-tr"></div>
              <div className="hyper-modal-corner hyper-modal-corner-bl"></div>
              <div className="hyper-modal-corner hyper-modal-corner-br"></div>
              
              <div className="flex flex-col items-center p-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#9854F8] to-[#FF44CC] text-white shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#9854F8,0_0_15px_#9854F8]">
                  <img src="/Features-Accessibility.png" alt="Accessibility Icon" className="h-12 w-12" />
                </div>
                <h3 className="mt-4 text-xl font-bold hyper-text-glow text-[#f472b6]">Accessibility</h3>
                
                <div className="bg-black/30 p-4 rounded mt-4 w-full">
                  <p className="text-purple-300 leading-relaxed text-center">
                    <span className="hyper-typing-effect-2">
                      <pre>{accessibilityText}</pre>
                    </span>
                    <span className="hyper-cursor"></span>
                  </p>
                </div>
              </div>
              
              {/* Bottom neon line */}
              <div className="hyper-line-bottom absolute bottom-0 left-0"></div>
            </motion.div>

            {/* Real-Time Inventory Management Card */}
            <motion.div 
              className="relative bg-black/40 backdrop-blur-md rounded-xl border border-[#f472b6]/30 shadow-lg overflow-hidden h-full"
              style={{ y: card2Transform }}
            >
              {/* Top neon line */}
              <div className="hyper-line-accent absolute top-0 left-0"></div>
              
              {/* Corner decorations */}
              <div className="hyper-modal-corner hyper-modal-corner-tl"></div>
              <div className="hyper-modal-corner hyper-modal-corner-tr"></div>
              <div className="hyper-modal-corner hyper-modal-corner-bl"></div>
              <div className="hyper-modal-corner hyper-modal-corner-br"></div>
              
              <div className="flex flex-col items-center p-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FF44CC] to-[#FFE942] text-white shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#FF44CC,0_0_15px_#FF44CC]">
                  <img src="/Features-RTIM.png" alt="Real-Time Inventory Management Icon" className="h-12 w-12" />
                </div>
                <h3 className="mt-4 text-xl font-bold hyper-text-glow text-[#f472b6]">Real-Time Inventory</h3>
                
                <div className="bg-black/30 p-4 rounded mt-4 w-full">
                  <p className="text-purple-300 leading-relaxed text-center">
                    <span className="hyper-typing-effect-2">
                      <pre>{inventoryText}</pre>
                    </span>
                    <span className="hyper-cursor"></span>
                  </p>
                </div>
              </div>
              
              {/* Bottom neon line */}
              <div className="hyper-line-bottom absolute bottom-0 left-0"></div>
            </motion.div>

            {/* Customer Profiles Card */}
            <motion.div 
              className="relative bg-black/40 backdrop-blur-md rounded-xl border border-[#f472b6]/30 shadow-lg overflow-hidden h-full"
              style={{ y: card3Transform }}
            >
              {/* Top neon line */}
              <div className="hyper-line-accent absolute top-0 left-0"></div>
              
              {/* Corner decorations */}
              <div className="hyper-modal-corner hyper-modal-corner-tl"></div>
              <div className="hyper-modal-corner hyper-modal-corner-tr"></div>
              <div className="hyper-modal-corner hyper-modal-corner-bl"></div>
              <div className="hyper-modal-corner hyper-modal-corner-br"></div>
              
              <div className="flex flex-col items-center p-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FFE942] to-[#9854F8] text-white shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#FFE942,0_0_15px_#FFE942]">
                  <img src="/Features-CPLT.png" alt="Customer Profiles Icon" className="h-12 w-12" />
                </div>
                <h3 className="mt-4 text-xl font-bold hyper-text-glow text-[#f472b6]">Customer Profiles</h3>
                
                <div className="bg-black/30 p-4 rounded mt-4 w-full">
                  <p className="text-purple-300 leading-relaxed text-center">
                    <span className="hyper-typing-effect-2">
                      <pre>{profilesText}</pre>
                    </span>
                    <span className="hyper-cursor"></span>
                  </p>
                </div>
              </div>
              
              {/* Bottom neon line */}
              <div className="hyper-line-bottom absolute bottom-0 left-0"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
export default Features;
