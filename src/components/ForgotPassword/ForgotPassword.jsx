
import { useState , useRef , useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { AiOutlineEye , AiOutlineEyeInvisible } from "react-icons/ai";

import { APIForgotPassword } from "../../API/APILogin"

import ParticleBackground from "../UI/ParticleBackground";

const ForgotPassword = ( ) => {

  const navigate = useNavigate ( );
  const emailRef = useRef( );
  const passwordRef = useRef( );
  
  const [ showPassword , setShowPassword ] = useState ( false );
  const [ email , setEmail ] = useState ( "" );
  const [ newPassword , setNewPassword ] = useState ( "" );
  const [ errors , setErrors ] = useState ( { } );
  const [ isLoading , setIsLoading ] = useState ( false );

  useEffect ( ( ) => {
    emailRef.current.focus ( );
  }, [ ] );

  const validateForm = ( ) => {

    const newErrors = { };

    if ( !email.trim ( ) ) {
      
      newErrors.email = "Email is required";

    } else if ( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test ( email ) ) {
      newErrors.email = "Invalid email format";
    }

    if ( !newPassword ) {

      newErrors.newPassword = "Password is required";

    } else if ( newPassword.length < 6 ) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    setErrors ( newErrors );

    return Object.keys ( newErrors ).length === 0;

  };

  const handleSubmit = async( ) => {

    if ( validateForm ( ) ) {
      try {
        setIsLoading ( true );
        const response = await APIForgotPassword ( email , newPassword )
        alert ( response.message );
        navigate ( "/login" );
      }
      catch ( error ) {
        alert ( error.message );
      } finally {
        setIsLoading ( false );
      }
      
    }

  };

  return (

    <div className = "min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-6 sm:px-6 md:px-8">

      <div className = "absolute inset-0 hyper-bg -z-10"></div>
      
      <ParticleBackground count = { 15 } className = "absolute inset-0 -z-5" />

      <div className = "hyper-scanlines absolute inset-0 -z-5 pointer-events-none"></div>
      <div className = "hyper-scanline absolute inset-0 -z-5 pointer-events-none"></div>
      
      <div className = "relative w-full max-w-md mx-auto z-10">

        <div className = "relative bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-lg border border-[#f472b6]/30 shadow-lg overflow-hidden">

          <div className = "hyper-line-accent absolute top-0 left-0"></div>
          
          <div className = "hyper-modal-corner hyper-modal-corner-tl"></div>
          <div className = "hyper-modal-corner hyper-modal-corner-tr"></div>
          <div className = "hyper-modal-corner hyper-modal-corner-bl"></div>
          <div className = "hyper-modal-corner hyper-modal-corner-br"></div>
          
          <div className = "text-center mb-6 sm:mb-8">
            <h2 className = "text-3xl sm:text-4xl font-bold hyper-text-glow text-white mb-1 sm:mb-2">
              RESET <span className = "text-[#f472b6]">PASSWORD</span>
            </h2>
            <p className = "text-purple-300/70 text-xs tracking-wider">
              Enter your email and create a new password
            </p>
          </div>

          <div className = "space-y-4 sm:space-y-5">

            <div>

              <label className = "hyper-text text-purple-300 text-sm font-medium mb-1 block">
                EMAIL
              </label>
              <div className = "relative">
                <input
                  type = "email"
                  placeholder = "Enter your email"
                  value = { email }
                  onChange = { ( e ) => setEmail ( e.target.value ) }
                  onKeyDown = { ( e ) => {
                    if ( e.key === "Enter" ) {
                      passwordRef.current.focus ( );
                    }
                  } }
                  ref = { emailRef }
                  className = "w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-sm bg-[#0f0326]/70 border border-[#f472b6]/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-[#f472b6] focus:shadow-[0_0_10px_rgba(244,114,182,0.5)] transition-all"
                />
                { errors.email && (
                  <p className = "hyper-warning-text text-xs mt-1">{ errors.email }</p>
                ) }
              </div>

            </div>

            <div className = "relative">

              <label className = "hyper-text text-purple-300 text-sm font-medium mb-1 block">
                NEW PASSWORD
              </label>
              <div className = "relative">
                <input
                  ref = { passwordRef }
                  type = { showPassword ? "text" : "password" }
                  placeholder = "Enter new password"
                  value = { newPassword }
                  onChange = { ( e ) => setNewPassword ( e.target.value ) }
                  onKeyDown = { ( e ) => {
                    if ( e.key === "Enter" ) {
                      handleSubmit ( );
                    }
                  }}
                  className = "w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-sm bg-[#0f0326]/70 border border-[#f472b6]/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-[#f472b6] focus:shadow-[0_0_10px_rgba(244,114,182,0.5)] transition-all"
                />
                <span
                  className = "absolute right-3 sm:right-4 top-2.5 sm:top-3 text-[#f472b6] cursor-pointer text-xl hyper-icon"
                  onClick = { ( ) => setShowPassword ( !showPassword ) }
                >
                  { showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible /> }
                </span>

                { errors.newPassword && (

                  <p className = "hyper-warning-text text-xs mt-1">{ errors.newPassword }</p>

                ) }
              </div>

            </div>

          </div>

          <div className = "mt-5 sm:mt-6">

            <button
              onClick = { handleSubmit }
              disabled = { isLoading }
              className = "hyper-button w-full py-2.5 sm:py-3 text-white uppercase tracking-wider text-sm font-medium relative overflow-hidden"
            >
              <span className = "relative z-10">
                {isLoading ? (
                  <span className = "flex items-center justify-center">
                    <div role = "status" className = "inline-flex items-center">
                      <svg 
                        aria-hidden = "true"
                        className = "inline w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-200 animate-spin fill-[#f472b6]" 
                        viewBox = "0 0 100 101" 
                        fill = "none" 
                        xmlns = "http://www.w3.org/2000/svg"
                      >
                        <path 
                          d = "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" 
                          fill = "currentColor"
                        />
                        <path 
                          d = "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" 
                          fill = "currentFill"
                        />
                      </svg>
                      <span>Processing...</span>
                      <span className = "sr-only">Loading...</span>
                    </div>
                  </span>
                ) : (
                  "Reset Password"
                ) }
              </span>
            </button>

          </div>

          <div className = "flex items-center justify-center mt-5 sm:mt-6 text-xs text-purple-300/70">
            <div className = "h-[1px] flex-grow bg-gradient-to-r from-transparent to-[#f472b6]/30"></div>
            <p className = "px-3 uppercase tracking-widest">or</p>
            <div className = "h-[1px] flex-grow bg-gradient-to-l from-transparent to-[#f472b6]/30"></div>
          </div>

          <div className = "text-center mt-4">
            <p className = "text-purple-300/70 text-xs tracking-wider">
              Remember your password?{ " " }
              <span
                className = "hyper-text text-[#f472b6] hover:text-white cursor-pointer transition-colors"
                onClick = { ( ) => navigate ( "/login" ) }
              >
                Back to Login
              </span>
            </p>
          </div>
          
          <div className = "hyper-line-bottom absolute bottom-0 left-0"></div>
        </div>

        <div className = "hyper-glow-bottom"></div>
      </div>

    </div>

  );

};

export default ForgotPassword;
