
import React from 'react'

import "./Faq.css"

const Faq = ( ) => {

  return (

    <section className = "f-wrapper">

      <div className = "faq-section">

        <h2 className = "faq-heading">FAQ</h2>

        <div className = "faq-item">
          <p className = "faq-question">What software do I need to use your products?</p>
        </div>

        <div className = "faq-item">
          <p className = "faq-question">What can I learn?</p>
          <p className = "faq-answer">If you're new to Figma, you'll master advanced software techniques, stay up to date with the latest features, and 
          learn how to create your design system, UI kit or icon set.<br></br>If you're an advanced user, you will benefit by using a well-maintained and solid foundation with many different components to fit a variety of different projects.</p>
          <p></p>
        </div>

        <div className = "faq-item">
          <p className = "faq-question">How can I download products again?</p>
          <p className = "faq-answer">Log into your Gumroad to access your library. Click on any Buninux product to get its latest version.</p>
        </div>

        <div className = "faq-item">
          <p className = "faq-question">What license should I choose?</p>
          <p className = "faq-answer">Choose a Team license if you work with a team, plan to use the products under your company, or if you plan to share or distribute an end-product. Choose a Personal license if you're a solo user and plan to use the products by yourself.</p>
        </div>

        <div className = "faq-item">
          <p className = "faq-question">Do you provide refunds?</p>
          <p className = "faq-answer">We issue refunds only if you can show that the file is corrupt on your end and cannot be used. Due to the nature of digital downloads, there are no refunds and credits once an order is placed and the product is sen.</p>
        </div>

      </div>

    </section>

  )

}

export default Faq;
