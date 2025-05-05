
import React , { useState } from "react";

import { useNavigate } from "react-router-dom";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = ( ) => {

  const navigate = useNavigate ( );

  const [ showPassword , setShowPassword ] = useState ( false );
  const [ username , setUsername ] = useState ( "" );
  const [ password , setPassword ] = useState ( "" );
  const [ errors , setErrors ] = useState ( { } );

  const validateForm = ( ) => {

    const newErrors = { };
    if ( !username.trim ( ) ) {
      newErrors.username = "Username is required";
    }
    if ( !password ) {
      newErrors.password = "Password is required";
    }
    setErrors ( newErrors );
    return Object.keys ( newErrors ).length === 0;

  };

  const handleSubmit = ( ) => {

    if ( validateForm ( ) ) {
      navigate ( "/Home" );
    }

  };

  return (

    <div className = "min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2a0036] to-[#000828] px-4">

      <div className = "bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className = "text-3xl font-bold text-center text-purple-300 mb-6">Sign In</h2>

        <div className = "space-y-4">

          <div>

            <input
              type = "text"
              placeholder = "Username"
              value = { username }
              onChange = { ( e ) => setUsername ( e.target.value ) }
              className = "w-full px-4 py-3 rounded-full bg-purple-100 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            { errors.username && (
              <p className = "text-red-400 text-sm mt-1">{ errors.username }</p>
            ) }
            
          </div>

          <div className = "relative">

            <input
              type = { showPassword ? "text" : "password" }
              placeholder = "Password"
              value = { password }
              onChange = { ( e ) => setPassword ( e.target.value ) }
              className = "w-full px-4 py-3 rounded-full bg-purple-100 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span
              className = "absolute right-4 top-3 text-gray-500 cursor-pointer text-xl"
              onClick = { ( ) => setShowPassword ( !showPassword ) }
            >
              { showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible /> }
            </span>
            { errors.password && (
              <p className = "text-red-400 text-sm mt-1">{ errors.password }</p>
            )}

          </div>

        </div>

        <div className = "text-right mt-2">

          <button className = "text-red-400 text-sm hover:underline cursor-pointer"  onClick = { ( ) => navigate ( "/forgotpassword" ) }>
            Forgot Password?
          </button>

        </div>

        <div className = "mt-6">

          <button
            onClick = { handleSubmit }
            className = "w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-full transition cursor-pointer"
          >
            Sign In
          </button>

        </div>

        <div className = "text-center text-white mt-4">

          <p>or</p>
          <p className = "mt-2">
            Don’t have an account?{ " " }
            <span
              className = "text-purple-300 hover:underline cursor-pointer"
              onClick = { ( ) => navigate ( "/signup" ) }
            >
              Sign Up
            </span>
          </p>

        </div>

      </div>

    </div>

  );

};

export default Login;

