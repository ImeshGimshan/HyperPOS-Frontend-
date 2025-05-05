
import React from 'react'

import "./Section.css"

const Section = ( ) => {

  return (

    <section className="s-wrapper">

      <div className="statement">

        <span className="title">Cloud-based POS with Endless Possibilities</span>
                    
        <div className="s-container">

          <h2 className="s-heading">Tailored solutions for every business type</h2>

          <div className="business-types">
            <div className="business-card">
              <img src="./Section-RestrauntPOS.png" alt="Restaurant POS" />
              <h4>Restaurant</h4>
              <p>Manage your restaurant with ease using tools for order taking, table management, kitchen printing, split billing, and real-time sales tracking.</p>
            </div>

            <div className="business-card">
              <img src="./Section-RetailPOS.png" alt="Retail POS" />
              <h4>Retail</h4>
              <p>All the retail tools you need for selling online and in-store, like inventory management, reports, returns and exchanges.</p>
            </div>

            <div className="business-card">
              <img src="./Section-CafePOS.png" alt="Cafe POS" />
              <h4>Cafe & Coffee Shop</h4>
              <p>Streamline operations with quick order processing, customizable menus, loyalty programs, and inventory tracking designed for busy cafes.</p>
            </div>

          </div>
          
        </div>

      </div>

    </section>

  )

}

export default Section;
