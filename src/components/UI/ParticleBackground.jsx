
import React from 'react';

/**
 * @param {Object} props
 * @param {number} props.count - Number of particles to display.
 * @param {string} props.className - Additional classes to apply.
 */

const ParticleBackground = ( {
   
  count = 15, 
  className = ''

} ) => {

  React.useEffect ( ( ) => {

    if ( !document.getElementById ( 'particle-animation-style' ) ) {

      const styleEl = document.createElement ( 'style' );
      styleEl.id = 'particle-animation-style';
      styleEl.textContent = `
        .particles-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          overflow: hidden;
          z-index: 0;
        }
        
        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: float 15s infinite linear;
        }
        
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild ( styleEl );

    }
  } , [ ] );

  return (

    <div className = { `particles-container ${ className }` }>
      
      { [ ...Array ( count ) ].map ( ( _, i ) => (

        <div 
          key = { i } 
          className = "particle"
          style = { {

            left : `${ Math.random ( ) * 100 }%`,
            top : `${ Math.random ( ) * 100 }%`,
            animationDelay : `${ Math.random ( ) * 5 }s`,
            width : `${ Math.random ( ) * 8 + 2 }px`,
            height : `${ Math.random ( ) * 8 + 2 }px`,

          } } 
        >
        </div>
      ) ) }

    </div>

  );

};

export default ParticleBackground;