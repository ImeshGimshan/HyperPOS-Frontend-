import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const [term, setTerm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = () => setTerm(!term);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2a0036] to-[#000828]">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-bold text-center text-purple-300 mb-2 capitalize">Sign Up</h2>
        <p className="text-center text-sm text-gray-200 mb-6">
          Please fill in this form to create a new account.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="First Name"
            className="px-4 py-2 rounded-full bg-purple-100 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Second Name"
            className="px-4 py-2 rounded-full bg-purple-100 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-full bg-purple-100 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full px-4 py-2 rounded-full bg-purple-100 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span
              className="absolute top-2.5 right-4 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEye /> :  <AiOutlineEyeInvisible />}
            </span>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 rounded-full bg-purple-100 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span
              className="absolute top-2.5 right-4 text-gray-600 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-center mt-4 text-sm text-white">
          <input
            type="checkbox"
            checked={term}
            id="checkbox"
            onChange={handleChange}
            className="mr-2 accent-purple-500"
          />
          <label htmlFor="checkbox">
            I accept the <span className="text-purple-300 underline">Terms of Use</span> and <span className="text-purple-300 underline">Privacy Policy</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-full cursor-pointer"
            onClick={() => navigate('/')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
