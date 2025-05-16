import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { registerUser } from "../../API/APILogin";

const Signup = () => {
  const [term, setTerm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    isActive: true,
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.username.trim())
      newErrors.username = "First name is required";
    if (!formData.phone.trim())
      newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Please enter a valid 10-digit phone number";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!term) newErrors.term = "You must accept the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      submitRegistration();
      return;
    }
    alert("Please fix the errors in the form");
  };
  const submitRegistration = async () => {
    try {
      const response = await registerUser(formData);
      console.log("Registration successful:", response);
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error?.message;
      alert(errorMessage);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2a0036] to-[#000828] px-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-bold text-center text-purple-300 mb-2 capitalize">
          Sign Up
        </h2>
        <p className="text-center text-sm text-gray-200 mb-6">
          Please fill in this form to create a new account.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full bg-purple-100 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full bg-purple-100 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full bg-purple-100 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
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
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
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
              {showConfirmPassword ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              )}
            </span>
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center mt-4 text-sm text-white">
          <input
            type="checkbox"
            checked={term}
            id="checkbox"
            onChange={() => setTerm(!term)}
            className="mr-2 accent-purple-500"
          />
          <label htmlFor="checkbox">
            I accept the{" "}
            <span className="text-purple-300 underline">Terms of Use</span> and{" "}
            <span className="text-purple-300 underline">Privacy Policy</span>
          </label>
        </div>
        {errors.term && (
          <p className="text-red-400 text-sm mt-1">{errors.term}</p>
        )}

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