import React from 'react'
import "./Hero.css"


const Hero = () => {
    return(
        <section className="hero-wrapper">
            <div className="hero-container">
                <div className="hero-left">
                <div className="hero-image">
                <img src="./hero.png" alt="POS system" />
                </div>
                </div>
                    <div className="hero-right">
                    <div className="hero-title">
                        <p className="p1">Find The Perfect Solution</p>
                         <p className="p2">For Your Business</p>
                    </div>
                    <p className="hero-des">
                        Our software enhances operational efficiency and provides a robust framework for managing sales, inventory and customer relationships. Whether you have single or multiple stores, our tools help to take your business into the next level.</p>
                
            
                <button className="signbutton">Sign Up
                </button>
                </div>
                
            </div>
    
        </section>
        
    )
}


export default Hero
