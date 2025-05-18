
import React from 'react'
import ParticleBackground from '../../UI/ParticleBackground'

const Faq = ( ) => {

  return (

    <section className="w-full min-h-screen relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 hyper-bg -z-10"></div>
      
      {/* Particles using ParticleBackground component */}
      <ParticleBackground count={15} className="absolute inset-0 -z-5" />
      
      {/* Scanlines */}
      <div className="hyper-scanlines absolute inset-0 -z-5 pointer-events-none"></div>
      <div className="hyper-scanline absolute inset-0 -z-5 pointer-events-none"></div>

      <div className="relative z-10 p-8 w-full h-full flex flex-col justify-center py-16">
        <h2 className="text-3xl sm:text-4xl font-bold hyper-text-glow text-white mb-8 text-center">
          <span className="text-[#f472b6]"> Frequently </span> Asked <span className="text-[#f472b6]">Questions</span>
        </h2>

        <div className="max-w-[800px] mx-auto space-y-4 sm:space-y-5">
          <div className="relative bg-black/40 backdrop-blur-md p-4 sm:p-6 rounded-lg border border-[#f472b6]/30 shadow-lg overflow-hidden">

            <div className="hyper-line-accent absolute top-0 left-0"></div>
            
            <div className="hyper-modal-corner hyper-modal-corner-tl"></div>
            <div className="hyper-modal-corner hyper-modal-corner-tr"></div>
            <div className="hyper-modal-corner hyper-modal-corner-bl"></div>
            <div className="hyper-modal-corner hyper-modal-corner-br"></div>
            
            <p className="hyper-text text-[#f472b6] text-lg font-medium mb-2 text-center">
              Question
            </p>
            <p className="text-purple-300 text-sm">
              Description
            </p>
            
            <div className="hyper-line-bottom absolute bottom-0 left-0"></div>
          </div>

          <div className="relative bg-black/40 backdrop-blur-md p-4 sm:p-6 rounded-lg border border-[#f472b6]/30 shadow-lg overflow-hidden">

            <div className="hyper-line-accent absolute top-0 left-0"></div>
            
            <div className="hyper-modal-corner hyper-modal-corner-tl"></div>
            <div className="hyper-modal-corner hyper-modal-corner-tr"></div>
            <div className="hyper-modal-corner hyper-modal-corner-bl"></div>
            <div className="hyper-modal-corner hyper-modal-corner-br"></div>
            
            <p className="hyper-text text-[#f472b6] text-lg font-medium mb-2 text-center">
              Question
            </p>
            <p className="text-purple-300 text-sm">
              Description
            </p>
            
            <div className="hyper-line-bottom absolute bottom-0 left-0"></div>
          </div>

          <div className="relative bg-black/40 backdrop-blur-md p-4 sm:p-6 rounded-lg border border-[#f472b6]/30 shadow-lg overflow-hidden">

            <div className="hyper-line-accent absolute top-0 left-0"></div>
            
            <div className="hyper-modal-corner hyper-modal-corner-tl"></div>
            <div className="hyper-modal-corner hyper-modal-corner-tr"></div>
            <div className="hyper-modal-corner hyper-modal-corner-bl"></div>
            <div className="hyper-modal-corner hyper-modal-corner-br"></div>
            
            <p className="hyper-text text-[#f472b6] text-lg font-medium mb-2 text-center">
              Question
            </p>
            <p className="text-purple-300 text-sm">
              Description
            </p>
            
            {/* Bottom neon line */}
            <div className="hyper-line-bottom absolute bottom-0 left-0"></div>
          </div>

          <div className="relative bg-black/40 backdrop-blur-md p-4 sm:p-6 rounded-lg border border-[#f472b6]/30 shadow-lg overflow-hidden">
            {/* Top neon line */}
            <div className="hyper-line-accent absolute top-0 left-0"></div>
            
            <div className="hyper-modal-corner hyper-modal-corner-tl"></div>
            <div className="hyper-modal-corner hyper-modal-corner-tr"></div>
            <div className="hyper-modal-corner hyper-modal-corner-bl"></div>
            <div className="hyper-modal-corner hyper-modal-corner-br"></div>
            
            <p className="hyper-text text-[#f472b6] text-lg font-medium mb-2 text-center">
              Question
            </p>
            <p className="text-purple-300 text-sm">
              Description
            </p>
            
            <div className="hyper-line-bottom absolute bottom-0 left-0"></div>
          </div>

          <div className="relative bg-black/40 backdrop-blur-md p-4 sm:p-6 rounded-lg border border-[#f472b6]/30 shadow-lg overflow-hidden">

            <div className="hyper-line-accent absolute top-0 left-0"></div>
            
            <div className="hyper-modal-corner hyper-modal-corner-tl"></div>
            <div className="hyper-modal-corner hyper-modal-corner-tr"></div>
            <div className="hyper-modal-corner hyper-modal-corner-bl"></div>
            <div className="hyper-modal-corner hyper-modal-corner-br"></div>
            
            <p className="hyper-text text-[#f472b6] text-lg font-medium mb-2 text-center">
              Question
            </p>
            <p className="text-purple-300 text-sm">
              Description
            </p>
            
            <div className="hyper-line-bottom absolute bottom-0 left-0"></div>
          </div>
        </div>

      </div>

    </section>

  )

}

export default Faq;
