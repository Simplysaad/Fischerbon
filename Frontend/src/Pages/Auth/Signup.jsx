
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import AuthContainer from '../../Components/AuthContainer'
import { Link } from 'react-router-dom';

const SignupPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (
    e
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const BASE_URL = 'https://fischerbon.onrender.com'

  const handleSubmit = async (e) => {
  const handleSubmit = (e) => {
    //Post fetch await logic goes here

    // POST /auth/register
    // email, password, fullName


    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const {success, message, data} = await response.json();

      if (!success) {
        console.error(message);
        throw new Error(message || 'Signup failed');
      }
    } catch(error){
      console.log('Error', error)
    }

    const newErrors = {
      fullName: formData.fullName ? '' : 'Full name is required',
      email: formData.email ? '' : 'Email is required',
      password: formData.password ? '' : 'Password is required',
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (hasErrors) return;

    alert('Form submitted');

    console.log({
      ...formData,
    });
  };

  return (
    <div>
      <AuthContainer>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h5 className="text-dark text-2xl leading-9">Sign up</h5>
            <p className="text-[16px] lg:text-lg leading-6 lg:leading-7 text-gray font-normal">
              Create your account to start your journey with us
            </p>
          </div>
          <hr />
          <div>
            <label
              htmlFor="fullName"
              className="block text-[16px] font-medium text-gray leading-6 mb-1"
            >
              Full name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full p-3 border-2 rounded-md outline-none border-accent placeholder:text-accent text-[16px] leading-6 focus:border-primary transition-colors duration-200 ease-in-out"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className="w-full p-3 border-2 rounded-md border-accent outline-none placeholder:text-accent text-[16px] leading-6 focus:border-primary transition-colors duration-200 ease-in-out"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray mb-1"
            >
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full p-3 border-2 rounded-md border-accent outline-none placeholder:text-accent text-[16px] leading-6 focus:border-primary transition-colors duration-200 ease-in-out"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 cursor-pointer text-accent"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="mb-2 bg-primary text-white hover:bg-primaryHover w-full font-medium py-3 px-4 rounded-md cursor-pointer transition-colors"
          >
            Sign Up
          </button>
        </form>

        <p className="text-[14px] text-[#69757C] leading-5">
          Already have an account?{' '}
          <Link to="/login">
            <span className="text-primary">Login</span>
          </Link>
        </p>
      </AuthContainer>
    </div>
  );
};

export default SignupPage;
