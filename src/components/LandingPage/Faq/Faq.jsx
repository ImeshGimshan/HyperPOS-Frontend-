
import React from 'react'

const Faq = ( ) => {

  return (

    <section className="w-full h-screen flex items-center">

      <div className="bg-[#0f001f] text-white p-8 w-full h-full flex flex-col justify-center">

        <h2 className="text-2xl text-center mb-8">FAQ</h2>

        <div className="max-w-[700px] mx-auto">
          <div className="bg-[#1f0c3b] m-2 p-4 rounded-lg border border-white">
            <p className="font-bold mb-1 text-center">What software do I need to use your products?</p>
          </div>

          <div className="bg-[#1f0c3b] m-2 p-4 rounded-lg border border-white">
            <p className="font-bold mb-1 text-center">What can I learn?</p>
            <p className="text-[0.95rem] text-justify text-[#ddd]">If you're new to Figma, you'll master advanced software techniques, stay up to date with the latest features, and 
            learn how to create your design system, UI kit or icon set.<br></br>If you're an advanced user, you will benefit by using a well-maintained and solid foundation with many different components to fit a variety of different projects.</p>
          </div>

          <div className="bg-[#1f0c3b] m-2 p-4 rounded-lg border border-white">
            <p className="font-bold mb-1 text-center">How can I download products again?</p>
            <p className="text-[0.95rem] text-justify text-[#ddd]">Log into your Gumroad to access your library. Click on any Buninux product to get its latest version.</p>
          </div>

          <div className="bg-[#1f0c3b] m-2 p-4 rounded-lg border border-white">
            <p className="font-bold mb-1 text-center">What license should I choose?</p>
            <p className="text-[0.95rem] text-justify text-[#ddd]">Choose a Team license if you work with a team, plan to use the products under your company, or if you plan to share or distribute an end-product. Choose a Personal license if you're a solo user and plan to use the products by yourself.</p>
          </div>

          <div className="bg-[#1f0c3b] m-2 p-4 rounded-lg border border-white">
            <p className="font-bold mb-1 text-center">Do you provide refunds?</p>
            <p className="text-[0.95rem] text-justify text-[#ddd]">We issue refunds only if you can show that the file is corrupt on your end and cannot be used. Due to the nature of digital downloads, there are no refunds and credits once an order is placed and the product is sen.</p>
          </div>
        </div>

      </div>

    </section>

  )

}

export default Faq;
