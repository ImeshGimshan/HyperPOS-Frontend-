
import React from 'react'

import "./Faq.css"

const Faq = ( ) => {

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

      <div className="faq-section">

        <h2 className="faq-heading">FAQ</h2>

        <div className="faq-item">
          <p className="faq-question">What software do I need to use your products?</p>
        </div>

        <div className="faq-item">
          <p className="faq-question">What can I learn?</p>
          <p className="faq-answer">If you're new to Figma, you'll master advanced software techniques, stay up to date with the latest features, and 
          learn how to create your design system, UI kit or icon set.<br></br>If you're an advanced user, you will benefit by using a well-maintained and solid foundation with many different components to fit a variety of different projects.</p>
          <p></p>
        </div>

        <div className="faq-item">
          <p className="faq-question">How can I download products again?</p>
          <p className="faq-answer">Log into your Gumroad to access your library. Click on any Buninux product to get its latest version.</p>
        </div>

        <div className="faq-item">
          <p className="faq-question">What license should I choose?</p>
          <p className="faq-answer">Choose a Team license if you work with a team, plan to use the products under your company, or if you plan to share or distribute an end-product. Choose a Personal license if you're a solo user and plan to use the products by yourself.</p>
        </div>

        <div className="faq-item">
          <p className="faq-question">Do you provide refunds?</p>
          <p className="faq-answer">We issue refunds only if you can show that the file is corrupt on your end and cannot be used. Due to the nature of digital downloads, there are no refunds and credits once an order is placed and the product is sen.</p>
        </div>

      </div>

    </section>

  )

}

export default Faq;
