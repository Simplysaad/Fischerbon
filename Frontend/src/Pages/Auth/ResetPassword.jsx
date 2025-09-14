
import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, X, Circle } from 'lucide-react';
import AuthContainer from '../../Components/AuthContainer'
import { Link } from 'react-router-dom';

export default function ResetPasswordPage() {
  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    showMismatchError: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setForm((prev) => ({ ...prev, showMismatchError: true }));
    } else {
      setForm((prev) => ({ ...prev, showMismatchError: false }));
      alert('Password updated successfully');
    }
  };

  return (
    <>
      <AuthContainer title="Reset Your Password" subtitle="Create a new password to secure your account">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Enter your password
            </label>
            <input
              type={form.showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your new password"
              className="w-full p-3 border-2 rounded-md border-[#C8CDD0] outline-none placeholder:text-[#ACB4B9] text-[16px] leading-6 focus:border-primary transition-colors duration-200 ease-in-out"
            />
            <span
              onClick={() => setForm((prev) => ({ ...prev, showPassword: !prev.showPassword }))}
              className="absolute right-3 top-10 cursor-pointer text-[#ACB4B9]"
            >
              {form.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm password
            </label>
            <input
              type={form.showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full p-3 border-2 rounded-md border-[#C8CDD0] outline-none placeholder:text-[#ACB4B9] text-[16px] leading-6 focus:border-primary transition-colors duration-200 ease-in-out"
            />
            <span
              onClick={() => setForm((prev) => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }))}
              className="absolute right-3 top-10 cursor-pointer text-[#ACB4B9]"
            >
              {form.showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {form.showMismatchError && (
            <p className="text-red-500 text-sm mt-1">*Passwords do not match</p>
          )}

          <button
            type="submit"
            className="mb-2 bg-primary text-white hover:bg-primaryHover w-full font-medium py-3 px-4 rounded-md cursor-pointer transition-colors"
          >
            Update Password
          </button>
        </form>
      </AuthContainer>


      <AuthContainer>
        <div className="space-y-5 text-center items-center justify-center flex flex-col">
          <div className='rounded-full bg-[#c1d4de] text-primary p-5 opacity-90'>
              <Circle />
          </div>

          <div className="max-w-md">
            <h5 className="text-[#2F3437] font-medium text-[16px] lg:text-[22px] leading-6 lg:leading-9">
              Password Reset Successful
            </h5>
            <p className="text-[16px] lg:text-lg leading-6 lg:leading-7 text-[#919BA1] font-normal">
              Your new password has been saved. You can now sign in to your account
            </p>
          </div>
          <button
            type="submit"
            className="mb-2 bg-primary text-white hover:bg-primaryHover w-full font-medium py-3 px-4 rounded-md cursor-pointer transition-colors"
          >
            <Link to="/login">Go to Login</Link>
          </button>
        </div>
      </AuthContainer>


      <AuthContainer>
        <div className="space-y-7 text-center items-center justify-center flex flex-col">
         <div className='rounded-full bg-accent text-[#F11010] p-5 opacity-90'>
            <X />
          </div>

          <div className="max-w-md">
            <h5 className="text-[#2F3437] font-medium text-[16px] lg:text-[22px] leading-6 lg:leading-9">
              Password Reset Failed
            </h5>
            <p className="text-[16px] lg:text-lg leading-6 lg:leading-7 text-[#919BA1] font-normal">
              We couldn’t update your password
            </p>
          </div>
          <button
            type="submit"
            className="mb-5 bg-primary text-white hover:bg-primaryHover w-full font-medium py-3 px-4 rounded-md cursor-pointer transition-colors"
          >
            Try Again
          </button>
        </div>
        <Link to="/login">
          <p className="text-center flex justify-center text-[14px] text-[#2F3437] cursor-pointer leading-5 items-center gap-2">
            <span className="text-center">
              <ArrowLeft size="20" />
            </span>
            <span className="text-center">Back to sign in</span>
          </p>
        </Link>
      </AuthContainer>
    </>
  );
}
