
import React from 'react'

import GradientButton from '../../UI/GradientButton'

const Hero = ( ) => {
    
    return (
        
        <section className = "bg-[rgb(19,5,47)] bg-[url('/Hero-Background.png')] bg-cover bg-center bg-no-repeat w-full h-screen flex items-center">
            
            <div className = "w-full max-w-[1200px] mx-auto px-4">
                
                <div className = "flex flex-col md:flex-row items-center justify-between gap-8">
                    
                    <div className = "w-full md:w-[45%] flex justify-center order-1 md:order-none">
                        <img src = "./Hero-Image.png" alt="POS system" className="w-full max-w-[450px] h-auto" />
                    </div>
                    
                    <div className = "w-full md:w-[50%] order-2 md:order-none text-center md:text-left">
                        
                        <div className = "font-bold bg-gradient-to-b from-[#FFE942] via-[#FF9500] to-[#FF0CB2] bg-clip-text text-transparent font-['Open_Sans',sans-serif]">
                            <p className = "text-2xl m-0 md:text-4xl">Find The Perfect Solution</p>
                            <p className = "text-2xl m-0 md:text-4xl">For Your Business</p>
                        </div>
                        
                        <p className = "text-white text-base leading-6 mt-4 font-['Open_Sans',sans-serif]">
                            Our software enhances operational efficiency and provides a robust framework for managing sales, inventory and customer relationships. Whether you have single or multiple stores, our tools help to take your business into the next level.
                        </p>
                        
                        <div className = "mt-6">
                            <GradientButton className ="py-3 px-8 text-lg min-w-[140px] rounded-2xl">
                                Sign Up
                            </GradientButton>
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
            
        </section>
        
    )
    
}

export default Hero;
