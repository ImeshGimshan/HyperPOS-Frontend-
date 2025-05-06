
import React from 'react'

const Section = () => {

  return (

    <section className="w-full h-screen flex flex-col">

      <div className="bg-[#593192] text-[rgb(42,211,211)] font-bold text-center text-2xl py-2">
        <span>Cloud-based POS with Endless Possibilities</span>
      </div>
                    
      <div className="bg-[#ECB5FE] text-center text-[#5E164C] py-8 px-4 flex-1 flex flex-col justify-center">

        <h2 className="font-bold text-2xl mb-8">Tailored solutions for every business type</h2>

        <div className="flex flex-wrap gap-8 justify-center">
          <div className="bg-white text-black p-6 rounded-2xl w-[200px] shadow-md text-center transition-transform hover:-translate-y-2">
            <img src="./Section-RestrauntPOS.png" alt="Restaurant POS" className="w-full rounded-lg mb-4" />
            <h4 className="text-xl mb-2">Restaurant</h4>
            <p className="text-sm">Manage your restaurant with ease using tools for order taking, table management, kitchen printing, split billing, and real-time sales tracking.</p>
          </div>

          <div className="bg-white text-black p-6 rounded-2xl w-[200px] shadow-md text-center transition-transform hover:-translate-y-2">
            <img src="./Section-RetailPOS.png" alt="Retail POS" className="w-full rounded-lg mb-4" />
            <h4 className="text-xl mb-2">Retail</h4>
            <p className="text-sm">All the retail tools you need for selling online and in-store, like inventory management, reports, returns and exchanges.</p>
          </div>

          <div className="bg-white text-black p-6 rounded-2xl w-[200px] shadow-md text-center transition-transform hover:-translate-y-2">
            <img src="./Section-CafePOS.png" alt="Cafe POS" className="w-full rounded-lg mb-4" />
            <h4 className="text-xl mb-2">Cafe & Coffee Shop</h4>
            <p className="text-sm">Streamline operations with quick order processing, customizable menus, loyalty programs, and inventory tracking designed for busy cafes.</p>
          </div>
        </div>
          
      </div>

    </section>

  )

}

export default Section;
