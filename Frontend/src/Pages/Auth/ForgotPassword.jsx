import React, { useState } from 'react';
import axiosInstance from '../../utils/axios.util';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
const BASE_URL = import.meta.VITE_BASE_URL;

const forgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email.trim()) setError('Email is required');
  };

  const handleSubmit = async () => {
    try {
      const { data: response } = await axiosInstance.post(
        '/auth/forgot-password',
        { email }
      );

      if (!response || !response.success)
        setError(response?.message || 'Something went wrong, Try again ');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="hidden lg:flex lg:w-1/2 bg-blue-700 text-white flex-col justify-center px-20">
        <h2 className="text-5xl font-extrabold mb-6 max-w-lg">
          It's not Over Yet!
        </h2>
        <p className="text-xl mb-8 max-w-md">
          Access your engineering design courses, including PDMS, CAD, BIM,
          Piping 3D and more. Learn from industry experts, anytime, anywhere.
        </p>
      </div>
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-12 py-20 max-w-md mx-auto">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-6 select-none">
          Forgot Password
        </h2>
        <p className="mb-10 text-gray-600">
          Enter your email to recieve a code to reset password
        </p>
        <form onSubmit={handleSubmit} className="space-y-8 w-full">
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
            >
              <Mail className="w-5 h-5 text-blue-600" /> Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="current-email"
              className={`w-full p-3 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold text-white transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Resend code in 5:09 ...' : 'Send Code'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Back to
          <Link
            to="/login"
            className="text-blue-600 px-1 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default forgotPasswordPage;
