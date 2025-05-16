
import styled from 'styled-components';

function Loader ( ) {

  return (

    <StyledWrapper>
      <div className = "loader-container">
        
        <div className = "rings-container">
          <div className = "ring outer-ring"></div>
          <div className = "ring middle-ring"></div>
          <div className = "ring inner-ring"></div>
        </div>
        
        <div className = "logo-container">
          <img 
            src = "/HyperPOS.svg" 
            alt = "HyperPOS Logo" 
            className = "logo-image" 
          />
        </div>
        
        <div className = "scanlines"></div>
        
      </div>
    </StyledWrapper>

  );

}

const StyledWrapper = styled.div`

  position : fixed;
  top : 0;
  left : 0;
  width : 100%;
  height : 100%;
  display : flex;
  justify-content : center;
  align-items : center;
  background : linear-gradient( 135deg , #0f0326 0% , #1a0a40 50% , #3b0764 100% );
  z-index : 9999;
  overflow : hidden;

  .loader-container {

    position : relative;
    /* Responsive sizing for the loader container */
    width : min( 85vw , 320px );
    height : min( 85vw , 320px );
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;

  }

  .rings-container {

    position : absolute;
    width : 100%;
    height : 100%;

  }

  .ring {

    position : absolute;
    border-radius : 50%;
    border : 2px solid transparent;
    border-top-color : rgba( 244 , 114 , 182 , 0.8 );
    border-right-color : rgba( 192 , 38 , 211 , 0.8 );
    box-shadow : 0 0 20px rgba( 244 , 114 , 182 , 0.4 );
    animation : spin-and-pulse 3s ease-in-out infinite;

  }

  .outer-ring {

    width : 100%;
    height : 100%;
    inset : 0;
    animation-duration : 3s;

  }

  .middle-ring {

    width : 80%;
    height : 80%;
    inset : 10%;
    animation-duration : 2.5s;
    animation-direction : reverse;
    border-top-color : rgba( 192 , 38 , 211 , 0.8 );
    border-right-color : rgba( 244 , 114 , 182 , 0.8 );

  }

  .inner-ring {

    width : 60%;
    height : 60%;
    inset : 20%;
    animation-duration : 2s;

  }

  /* Logo styling. */
  .logo-container {

    position : relative;
    /* Responsive sizing for the logo container */
    width : min( 40% , 120px );
    height : min( 40% , 120px );
    display : flex;
    align-items : center;
    justify-content : center;
    z-index : 2;
    animation : logo-pulse 2s infinite ease-in-out;

  }

  .logo-image {

    width : 100%;
    height : auto;
    filter : drop-shadow( 0 0 15px rgba( 244 , 114 , 182 , 0.8 ) );

  }

  /* Scanlines effect. */
  .scanlines {

    position : absolute;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
    background : linear-gradient(
      transparent 50%,
      rgba( 15 , 3 , 38 , 0.5 ) 50%
    );
    background-size : 100% 4px;
    opacity : 0.3;
    pointer-events : none;
    z-index : 3;

  }

  /* Animations. */

  @keyframes spin-and-pulse {

    0% {
      transform : rotate( 0deg ) scale( 0.8 );
      opacity : 0.3;
    }
    50% {
      transform : rotate( 180deg ) scale( 1.2 );
      opacity : 1;
    }
    100% {
      transform : rotate( 360deg ) scale( 0.8 );
      opacity : 0.3;
    }

  }

  @keyframes logo-pulse {

    0%, 100% {
      opacity : 0.9;
      filter : drop-shadow( 0 0 15px rgba( 244 , 114 , 182 , 0.6 ) );
      transform : scale( 1 );
    }
    50% {
      opacity : 1;
      filter : drop-shadow( 0 0 30px rgba( 244 , 114 , 182 , 1 ) );
      transform : scale( 1.15 );
    }

  }

  /* Hexagon background behind logo. */
  .logo-container::before {

    content : '';
    position : absolute;
    width : 100%;
    height : 100%;
    background : rgba( 15 , 3 , 38 , 0.7 );
    transform : rotate( 45deg );
    border : 1px solid rgba( 244 , 114 , 182 , 0.3 );
    box-shadow : 0 0 20px rgba( 192 , 38 , 211 , 0.3 );
    z-index : -1;

  }

  /* Glowing corners. */
  .logo-container::after {

    content : '';
    position : absolute;
    width : 120%;
    height : 120%;
    background : radial-gradient(
      ellipse at center,
      rgba( 244 , 114 , 182 , 0.2 ) 0%,
      transparent 70%
    );
    z-index : -2;

  }

  @media (max-width: 640px) {

    .ring {
      border-width : 1.5px;
      box-shadow : 0 0 10px rgba( 244 , 114 , 182 , 0.4 );

    }
    
    .logo-container::before {

      border-width : 0.5px;
    }

  }

  @media (max-width: 480px) {

    .outer-ring {
      animation-duration : 4s;

    }
    
    .middle-ring {

      animation-duration : 3.5s;

    }
    
    .inner-ring {

      animation-duration : 3s;

    }

  }
`;

export default Loader;
