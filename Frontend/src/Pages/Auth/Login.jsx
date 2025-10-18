import React, { useState } from 'react';
import { Eye, EyeOff, UserCircle, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthAlert from '../../Components/AuthAlert';
import useAuth from '../../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState('');
  const [result, setResult] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
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

    try {
      setLoading(true);

      const response = await login({ ...formData });

      console.log(formData);

      if (response.success) {
        const currentUser = response.data;

        console.log(currentUser); //TODO: Remove this;
        setAlert('success');
        setResult({ message: 'Welcome back!' });
      } else {
        setAlert('failure');
        setResult({ message: 'Invalid credentials' });
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left informational side */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-700 text-white flex-col justify-center px-20">
        <h2 className="text-5xl font-extrabold mb-6 max-w-lg">
          Welcome Back to FischerBon
        </h2>
        <p className="text-xl mb-8 max-w-md">
          Access your engineering design courses, including PDMS, CAD, BIM,
          Piping 3D and more. Learn from industry experts, anytime, anywhere.
        </p>
        {/* Suggest adding an illustrative engineering graphic or animation here */}
      </div>

      {/* Right form side */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-12 py-20 max-w-md mx-auto">
        {alert === 'success' && (
          <AuthAlert
            header="Logged In"
            message={result.message}
            iconType="success"
            border="#3c97d0"
            onClose={() => setAlert('')}
          />
        )}
        {alert === 'failure' && (
          <AuthAlert
            header="Login Failed"
            message={result.message || 'Check your email and password'}
            iconType="error"
            onClose={() => setAlert('')}
          />
        )}
        <h2 className="text-4xl font-extrabold text-blue-700 mb-6 select-none">
          Login
        </h2>
        <p className="mb-10 text-gray-600">
          Enter your credentials to access your dashboard
        </p>
        <form onSubmit={handleSubmit} className="space-y-8 w-full">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
            >
              <UserCircle className="w-5 h-5 text-blue-600" /> Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              autoComplete="email"
              className={`w-full p-3 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
            >
              <Lock className="w-5 h-5 text-blue-600" /> Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              className={`w-full p-3 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
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

            <div className="text-right mt-1">
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:text-blue-800 text-[13px] font-medium"
              >
                Forgot password?
              </Link>
            </div>
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
            {loading ? 'Logging you in...' : 'Log in'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
