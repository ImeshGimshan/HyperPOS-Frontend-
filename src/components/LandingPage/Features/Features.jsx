
import React from 'react'

import "./Features.css"

const Features = ( ) => {

  return (

    <section className = "f-wrapper">

      <div className = "features-section">

        <h2 className = "features-heading">Key Features of HyperPOS</h2>

        <div className = "features-cards">

          <div className = "feature-card">
            <img src = "/Features-Accessibility.png" alt = "Accessible Icon" className = "feature-icon" />
            <h3>Accessibility</h3> <br></br>
            <p>Access your POS system anytime, anywhere, ensuring flexibility and convenience for your business management needs.</p>
          </div>

          <div className = "feature-card">
            <img src = "/Features-RTIM.png" alt = "Accessible Icon" className = "feature-icon" />
            <h3>Real-Time Inventory Management</h3>
            <p>Stay updated with your stock levels instantly. Track product availability, receive low stock alerts, and manage inventory efficiently.</p>
          </div>

          <div className = "feature-card">
            <img src = "/Features-CPLT.png" alt = "Accessible Icon" className = "feature-icon" />
            <h3>Customer Profiles & Loyalty Tracking</h3>
            <p>Easily create and manage customer profiles with contact details, purchase history, and preferences to boost loyalty.</p>
          </div>
          
        </div>

      </div>

    </section>

  )

}

export default Features;
