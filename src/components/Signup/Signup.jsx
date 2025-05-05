import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const [term, setTerm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.secondName.trim()) newErrors.secondName = 'Second name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!term) newErrors.term = 'You must accept the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2a0036] to-[#000828] px-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-bold text-center text-purple-300 mb-2 capitalize">Sign Up</h2>
        <p className="text-center text-sm text-gray-200 mb-6">
          Please fill in this form to create a new account.
        </p>

        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full bg-purple-100 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <input
              type="text"
              name="secondName"
              placeholder="Second Name"
              value={formData.secondName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full bg-purple-100 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.secondName && <p className="text-red-400 text-sm mt-1">{errors.secondName}</p>}
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-full bg-purple-100 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-full bg-purple-100 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <span
            className="absolute top-2.5 right-4 text-gray-600 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
          {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password Field */}
        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-full bg-purple-100 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <span
            className="absolute top-2.5 right-4 text-gray-600 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
          {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        {/* Terms and Policy Checkbox */}
        <div className="flex items-center mt-4 text-sm text-white">
          <input
            type="checkbox"
            checked={term}
            id="checkbox"
            onChange={() => setTerm(!term)}
            className="mr-2 accent-purple-500"
          />
          <label htmlFor="checkbox">
            I accept the{' '}
            <span
              className="text-purple-300 underline cursor-pointer"
              onClick={() => navigate('/termOfU')}
            >
              Terms of Use
            </span>{' '}
            and{' '}
            <span
              className="text-purple-300 underline cursor-pointer"
              onClick={() => navigate('/termOfU')}
            >
              Privacy Policy
            </span>
          </label>
        </div>
        {errors.term && <p className="text-red-400 text-sm mt-1">{errors.term}</p>}

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-full cursor-pointer"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;

