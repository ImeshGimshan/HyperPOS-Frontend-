/* eslint-disable no-unused-vars */

import React from 'react'

import GradientButton from '../../UI/GradientButton'

import { motion , useScroll , useTransform } from 'framer-motion'

import { useNavigate } from 'react-router-dom'

const Hero = ( ) => {

  const navigate = useNavigate ( )
  
  // Reference for the scroll container.
  const containerRef = React.useRef ( null )
  
  // Scrolling progress.
  const { scrollYProgress } = useScroll ( {

    target : containerRef,
    offset : [ "start start" , "end start" ]

  } )
  
  // Transform values based on scroll.
  const mainImageOpacity = useTransform ( scrollYProgress , [ 0 , 0.15 ] , [ 1 , 0 ] )
  const mainImageScale = useTransform ( scrollYProgress , [ 0 , 0.15 ] , [ 1 , 0.8 ] )
  
  const featuresOpacity = useTransform ( scrollYProgress , [ 0.15 , 0.25 ] , [ 0 , 1 ] )
  const textOpacity = useTransform ( scrollYProgress , [ 0.2 , 0.3 ] , [ 0 ,     1 ] )
  
  // Image transformations.
  const feature1Transform = useTransform ( scrollYProgress , [ 0.15 , 0.25 ] , [ 50 , 0 ] )
  const feature2Transform = useTransform ( scrollYProgress , [ 0.15 , 0.25 ] , [ -50 , 0 ] )
  const feature3Transform = useTransform ( scrollYProgress , [ 0.15 , 0.25 ] , [ 50 , 0 ] )
  const feature4Transform = useTransform ( scrollYProgress , [ 0.15 , 0.25 ] , [ -50 , 0 ] )
  
  const toSignUP = ( ) => {
    navigate ( '/signup' )
  }
  
  return (

    <div 
      ref = { containerRef }
      className = "h-[200vh] bg-[rgb(19,5,47)] bg-[url('/Hero-Background.png')] bg-cover bg-center bg-no-repeat"
    >
      {/* Making the container sticky */}
      <div className = "sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Main image */}
        <motion.div 
          className = "absolute inset-0 flex items-center justify-center"
          style = { { 
            opacity : mainImageOpacity,
            scale : mainImageScale
          } }
        >

          <img 
            src = "./Hero-Image.png" 
            alt = "POS system" 
            className = "w-full max-w-[450px] h-auto"
          />

        </motion.div>
        
        {/* Feature images. */}
        <motion.div 
          className = "absolute inset-0 w-full h-full"
          style = { { opacity : featuresOpacity } }
        >

          <div className="grid grid-cols-2 gap-4 w-full h-full p-8 md:p-16">

            {/* Example Part of our system 1. */}
            <motion.div 
              className = "bg-black/20 rounded-xl overflow-hidden shadow-xl flex flex-col"
              style = { { y : feature1Transform } }
            >
              <div className = "p-4">
                <h3 className = "text-white text-lg font-bold">Example Display 1</h3>
                <p className = "text-white/80 text-sm">Description</p>
              </div>
              <div className = "flex-1 overflow-hidden">
                <img 
                  src = "./feature-sales.png" 
                  alt = "Sales Dashboard" 
                  className = "w-full h-full object-cover"
                  onError = { ( e ) => { e.target.src = "./nap_cat.gif" } } // In case the image doesn't exist.
                />
              </div>
            </motion.div>
            
            {/* Example Part of our system 2. */}
            <motion.div 
              className = "bg-black/20 rounded-xl overflow-hidden shadow-xl flex flex-col"
              style={{ y: feature2Transform }}
            >
              <div className = "p-4">
                <h3 className = "text-white text-lg font-bold">Example Display 2</h3>
                <p className = "text-white/80 text-sm">Description</p>
              </div>
              <div className = "flex-1 overflow-hidden">
                <img 
                  src = "./feature-inventory.png" 
                  alt = "Inventory Management" 
                  className = "w-full h-full object-cover"
                  onError = { ( e ) => { e.target.src = "./nap_cat.gif" } } // In case the image doesn't exist.
                />
              </div>
            </motion.div>
            
            {/* Example Part of our system 3. */}
            <motion.div 
              className = "bg-black/20 rounded-xl overflow-hidden shadow-xl flex flex-col"
              style = { { y : feature3Transform } }
            >
              <div className = "p-4">
                <h3 className = "text-white text-lg font-bold">Example Display 3</h3>
                <p className = "text-white/80 text-sm">Description</p>
              </div>
              <div className = "flex-1 overflow-hidden">
                <img 
                  src = "./feature-customers.png" 
                  alt = "Customer Management" 
                  className = "w-full h-full object-cover"
                  onError = { ( e ) => { e.target.src = "./nap_cat.gif" } } // In case the image doesn't exist.
                />
              </div>
            </motion.div>
            
            {/* Example Part of our system 4. */}
            <motion.div 
              className = "bg-black/20 rounded-xl overflow-hidden shadow-xl flex flex-col"
              style = { { y : feature4Transform } }
            >
              <div className = "p-4">
                <h3 className = "text-white text-lg font-bold">Example Display 4</h3>
                <p className = "text-white/80 text-sm">Description</p>
              </div>
              <div className = "flex-1 overflow-hidden">
                <img 
                  src = "./feature-payments.png"  
                  alt = "Payment Processing" 
                  className = "w-full h-full object-cover"
                  onError = { ( e ) => { e.target.src = "./nap_cat.gif" } } // In case the image doesn't exist.
                />
              </div>
            </motion.div>

          </div>

        </motion.div>
        
        {/* Text content. */}
        <motion.div 
          className = "absolute inset-0 flex items-center justify-center z-10"
          style = { { opacity : textOpacity } }
        >
          <div className = "max-w-[600px] mx-auto px-6 text-center bg-black/30 py-8 rounded-xl">
            <div className = "font-bold bg-gradient-to-b from-[#FFE942] via-[#FF9500] to-[#FF0CB2] bg-clip-text text-transparent font-['Open_Sans',sans-serif]">
              <p className = "text-2xl m-0 md:text-4xl">Find The Perfect Solution</p>
              <p className = "text-2xl m-0 md:text-4xl">For Your Business</p>
            </div>
            
            <p className = "text-white text-base leading-6 mt-4 font-['Open_Sans',sans-serif]">
              Our software enhances operational efficiency and provides a robust framework for managing sales, inventory and customer relationships. Whether you have single or multiple stores, our tools help to take your business into the next level.
            </p>
            
            <div className = "mt-6">
              <GradientButton 
                className = "py-3 px-8 text-lg min-w-[140px] rounded-2xl"
                onClick = { toSignUP }
              >
                Sign Up
              </GradientButton>
            </div>
          </div>
        </motion.div>
      </div>
      
    </div>

  )

}

export default Hero;
