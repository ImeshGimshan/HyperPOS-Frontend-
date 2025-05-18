
/* eslint-disable no-unused-vars */

import { useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { motion, useScroll, useTransform } from 'framer-motion';

import ParticleBackground from '../../UI/ParticleBackground';
import GradientButton from '../../UI/GradientButton';

// Import the CSS for animation styles
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform values based on scroll
  const maskedTextOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const maskedTextY = useTransform(scrollYProgress, [0, 0.15], [0, -100]);
  
  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.15, 0.25], [50, 0]);

  const toSignUp = () => {
    navigate('/signup');
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[200vh] bg-gradient-to-br from-[#0f0326] to-[#2d1247]"
    >
      <div className="sticky top-0 min-h-screen flex items-center justify-center overflow-hidden px-4 py-6 sm:px-6 md:px-8">
        {/* Particle Background */}
        <ParticleBackground count={15} className="absolute inset-0 -z-5" />

        {/* Overlay with Scanline Effect */}
        <div className="absolute inset-0 bg-black/40 hyper-scanlines -z-5 pointer-events-none" />

        {/* Masked Text Container */}
        <motion.div 
          className="absolute w-full text-center"
          style={{ 
            opacity: maskedTextOpacity,
            y: maskedTextY
          }}
        >
          <h1 className="masked-text text-6xl md:text-8xl font-bold">
            HyperPOS
          </h1>
          <div className='flex flex-col items-center'>
            <div className="flex flex-row  w-2/3 justify-center items-center">
              <img src="./mock.png" alt="logo" className="w-/6 mx-auto" />
            </div>
          </div>
          
        </motion.div>

        {/* Content */}
        <motion.div 
          className="relative w-full max-w-[600px] mx-auto z-10"
          style={{ 
            opacity: contentOpacity,
            y: contentY
          }}
        >
          <div className="relative bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-lg border border-[#f472b6]/30 shadow-lg overflow-hidden">
            {/* Neon Accents */}
            <div className="hyper-line-accent absolute top-0 left-0"></div>
            <div className="hyper-modal-corner hyper-modal-corner-tl"></div>
            <div className="hyper-modal-corner hyper-modal-corner-tr"></div>
            <div className="hyper-modal-corner hyper-modal-corner-bl"></div>
            <div className="hyper-modal-corner hyper-modal-corner-br"></div>

            {/* Text Content */}
            <div className="text-center">
              <div className="font-bold bg-gradient-to-b from-[#FFE942] via-[#FF9500] to-[#FF0CB2] bg-clip-text text-transparent font-['Open_Sans',sans-serif]">
                <p className="text-2xl m-0 md:text-4xl hyper-text-glow">Find The Perfect Solution</p>
                <p className="text-2xl m-0 md:text-4xl hyper-text-glow">For Your Business</p>
              </div>
              
              <p className="text-purple-300/70 text-base leading-6 mt-4 font-['Open_Sans',sans-serif]">
                Our software enhances operational efficiency and provides a robust framework for managing sales, inventory and customer relationships. Whether you have single or multiple stores, our tools help to take your business into the next level.
              </p>
              
              <div className="mt-6">
                <GradientButton 
                  className="py-3 px-8 text-lg min-w-[140px] rounded-2xl hyper-button text-white uppercase tracking-wider font-medium relative overflow-hidden"
                  onClick={toSignUp}
                >
                  Sign Up
                </GradientButton>
              </div>
            </div>

            {/* Bottom Neon Line */}
            <div className="hyper-line-bottom absolute bottom-0 left-0"></div>
          </div>
          
          <div className="hyper-glow-bottom"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;