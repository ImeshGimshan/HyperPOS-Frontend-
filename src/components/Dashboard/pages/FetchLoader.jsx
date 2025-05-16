
import styled from 'styled-components';

const FetchLoader = ( ) => {

  return (

    <StyledWrapper>
      <div className = "loader">
        <span className = "load"></span>
        <span className = "loader-text">FETCHING</span>
      </div>
    </StyledWrapper>
    
  );

}

const StyledWrapper = styled.div`

  display : flex;
  justify-content : center;
  align-items : center;
  padding : 2rem;
  position : relative;

  .loader {

    width : 120px;
    height : 60px;
    position : relative;

  }

  .loader-text {

    position : absolute;
    bottom : 5px;
    left : 50%;
    transform : translateX(-50%);
    padding : 0;
    margin : 0;
    color : #f472b6;
    font-size : 0.8rem;
    font-family : monospace;
    letter-spacing : 2px;
    text-shadow : 0 0 5px rgba( 244 , 114 , 182 , 0.8 );

  }

  .load {

    background : linear-gradient(
      90deg, 
      rgba( 192 , 38 , 211 , 0.7 ) 0%, 
      rgba( 244 , 114 , 182 , 0.9 ) 100%
    );

    border-radius : 50px;
    display : block;
    height : 16px;
    width : 16px;
    top : 15px;
    position : absolute;
    transform : translateX( 64px );
    animation : loading_713 3.5s ease both infinite;
    box-shadow : 0 0 10px rgba( 244 , 114 , 182 , 0.5 );

  }

  .load::before {

    position : absolute;
    content : "";
    width : 100%;
    height : 100%;

    background : linear-gradient(
      90deg, 
      rgba( 244 , 114 , 182 , 0.5 ) 0%, 
      rgba( 192 , 38 , 211 , 0.8 ) 100%
    );

    border-radius : inherit;
    animation : loading2_713 3.5s ease both infinite;
    box-shadow : 0 0 10px rgba( 192 , 38 , 211 , 0.5 );

  }

  @keyframes loading_713 {

    0% {

      width : 16px;
      transform : translateX( 0px );
    }

    40% {

      width : 100%;
      transform : translateX( 0px );
    }

    80% {

      width : 16px;
      transform : translateX( 64px );
    }

    90% {

      width : 100%;
      transform : translateX( 0px );
    }

    100% {

      width : 16px;
      transform : translateX( 0px );
    }

  }

  @keyframes loading2_713 {

    0% {

      transform : translateX( 0px );
      width : 16px;
    }

    40% {

      transform : translateX( 0% );
      width : 80%;
    }

    80% {

      width : 100%;
      transform : translateX( 0px );
    }

    90% {

      width : 80%;
      transform : translateX( 15px );
    }

    100% {

      transform : translateX( 0px );
      width : 16px;

    }

  }

  @media ( max-width : 640px ) {

    padding : 1.5rem;
    
    .loader {

      width : 100px;
      height : 50px;

    }
    
    .loader-text {

      font-size : 0.7rem;

    }
    
    .load {

      height : 14px;
      width : 14px;
      transform : translateX( 56px );

    }

  }
    
`;

export default FetchLoader;
