import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContainer from '../../Components/AuthContainer';
import AuthAlert from '../../Components/AuthAlert';
import axiosInstance from '../../utils/axios.util';

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'student',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [alert, setAlert] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (emailError !== '')
      newErrors.email = 'An account with that email already exists';
    if (
      formData.password.trim().length > 0 &&
      formData.password.trim().length < 8
    )
      newErrors.password = 'Password must have a minimum of 8 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data: response } = await axiosInstance(
        '/auth/register',
        formData
      );

      if (!response.success || !response) {
        setAlert('failure');
        setEmailError(response.message || 'Registration failed');
      } else {
        setAlert('success');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch {
      setAlert('network');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {alert === 'success' && (
        <AuthAlert
          header="Registered Successfully"
          message="You can now access your dashboard"
          iconType="success"
          border="#3c97d0"
          onClose={() => setAlert('')}
        />
      )}
      {alert === 'failure' && (
        <AuthAlert
          header="Oops"
          message="Something went wrong, try again later"
          iconType="error"
          onClose={() => setAlert('')}
        />
      )}
      {alert === 'network' && (
        <AuthAlert
          header="Network Error"
          message="You're not connected to the internet"
          iconType="error"
          onClose={() => setAlert('')}
        />
      )}

      <AuthContainer>
        <form onSubmit={handleSubmit} className="space-y-8 max-w-md w-full">
          <div>
            <h2 className="text-4xl font-extrabold text-blue-700 mb-2 select-none">
              Sign Up
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Create an account and start learning today
            </p>
          </div>

          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={`w-full p-3 border rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
              autoComplete="name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className={`w-full p-3 border rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={`w-full p-3 border rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
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
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>

          <p className="text-center text-gray-600 text-sm">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
        </form>
      </AuthContainer>
    </div>
  );
};

export default SignupPage;
