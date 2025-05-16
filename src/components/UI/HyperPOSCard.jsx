
import React from 'react';

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content of the card.
 * @param {string} props.title - The title of the card.
 * @param {boolean} props.glowEffect - Whether to show glow effects (default: true).
 * @param {string} props.className - Additional classes to apply.
 */
const HyperPOSCard = ( { 

  children, 
  title, 
  glowEffect = true,
  className = '' 

} ) => {

  return (

    <div className = { `relative bg-hyper-dark/80 backdrop-blur-sm border border-hyper-pink/30 rounded-lg overflow-hidden ${ className }` }
         style = { {
           boxShadow : glowEffect ? '0 0 15px rgba( 192, 38, 211, 0.2 )' : 'none'
         } }>
      
      {/* Card header. */}
      { title && (
        <div className = "border-b border-hyper-pink/30 p-4">
          <h3 className = "text-lg font-semibold hyper-text-glow text-white">
            { title }
          </h3>
        </div>
      ) }
      
      {/* Card content. */}
      <div className = "p-4">
        { children }
      </div>
      
      {/* Corner accent. */}
      { glowEffect && (
        <>
          <div className = "absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div className = "absolute top-0 right-0 w-[2px] h-8 bg-hyper-pink"
                 style = { { boxShadow : '0 0 8px #f472b6' } }></div>
            <div className = "absolute top-0 right-0 h-[2px] w-8 bg-hyper-pink"
                 style = { { boxShadow : '0 0 8px #f472b6' } }></div>
          </div>
          <div className = "absolute bottom-0 left-0 w-16 h-16 overflow-hidden">
            <div className = "absolute bottom-0 left-0 w-[2px] h-8 bg-hyper-pink"
                 style = { { boxShadow : '0 0 8px #f472b6' } }></div>
            <div className = "absolute bottom-0 left-0 h-[2px] w-8 bg-hyper-pink"
                 style = { { boxShadow : '0 0 8px #f472b6' } }></div>
          </div>
        </>
      ) }
      
    </div>

  );

};

export default HyperPOSCard;