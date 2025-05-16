
import React from 'react';

/**
 * @param {Object} props
 * @param {string} props.src - Source URL of the logo image.
 * @param {string} props.alt - Alt text for the logo.
 * @param {number} props.width - Width of the logo in pixels.
 * @param {string} props.glowColor - Color of the glow effect (default: 'rgba(236, 72, 153, 0.8)').
 * @param {string} props.hoverGlowColor - Color of the glow effect on hover (default: 'rgba(236, 72, 153, 0.9)').
 * @param {string} props.className - Additional classes to apply.
 */

const GlowingLogo = ( { 

  src, 
  alt = 'Logo', 
  width = 100, 
  glowColor = 'rgba( 236 , 72 , 153 , 0.8 )',
  hoverGlowColor = 'rgba( 236 , 72 , 153 , 0.9 )',
  className = ''
} ) => {

  React.useEffect ( ( ) => {
    if ( !document.getElementById ( 'glowing-logo-style' ) ) {
      const styleEl = document.createElement ( 'style' );
      styleEl.id = 'glowing-logo-style';
      styleEl.textContent = `
        .logo-glow {
          transition: filter 0.3s ease;
        }
        .logo-glow:hover {
          filter: drop-shadow( 0 0 12px ${ hoverGlowColor } ) !important;
        }
      `;
      document.head.appendChild ( styleEl );
    }

  } , [ hoverGlowColor ] );

  return (

    <img 
      src = { src } 
      alt = { alt } 
      width = { width } 
      className = { `logo-glow ${ className }` } 
      style = { {
        filter : `drop-shadow( 0 0 8px ${ glowColor } )`
      } }
    />

  );

};

export default GlowingLogo;