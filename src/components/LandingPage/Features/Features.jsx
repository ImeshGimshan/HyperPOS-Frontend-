
import React from 'react'

const Features = ( ) => {

  return (

    <section className="w-full h-screen bg-white flex items-center">

      <div className="max-w-[1200px] mx-auto px-4">

        <h2 className="text-center text-2xl mb-8 text-gray-800">Key Features of HyperPOS</h2>

        <div className="flex flex-wrap justify-center gap-8">

          <div className="bg-white rounded-xl p-6 shadow-md flex-1 min-w-[250px] max-w-[350px] text-center transition-transform hover:-translate-y-1">
            <img src="/Features-Accessibility.png" alt="Accessible Icon" className="w-[60px] h-[60px] mx-auto mb-4" />
            <h3 className="text-xl mb-2 text-[#593192]">Accessibility</h3>
            <p className="text-gray-600 leading-relaxed">Access your POS system anytime, anywhere, ensuring flexibility and convenience for your business management needs.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md flex-1 min-w-[250px] max-w-[350px] text-center transition-transform hover:-translate-y-1">
            <img src="/Features-RTIM.png" alt="Real-Time Inventory Management Icon" className="w-[60px] h-[60px] mx-auto mb-4" />
            <h3 className="text-xl mb-2 text-[#593192]">Real-Time Inventory Management</h3>
            <p className="text-gray-600 leading-relaxed">Stay updated with your stock levels instantly. Track product availability, receive low stock alerts, and manage inventory efficiently.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md flex-1 min-w-[250px] max-w-[350px] text-center transition-transform hover:-translate-y-1">
            <img src="/Features-CPLT.png" alt="Customer Profiles Icon" className="w-[60px] h-[60px] mx-auto mb-4" />
            <h3 className="text-xl mb-2 text-[#593192]">Customer Profiles & Loyalty Tracking</h3>
            <p className="text-gray-600 leading-relaxed">Easily create and manage customer profiles with contact details, purchase history, and preferences to boost loyalty.</p>
          </div>
          
        </div>

      </div>

    </section>

  )

}

export default Features;
