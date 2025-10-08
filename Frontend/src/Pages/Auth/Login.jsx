import React, { useState } from 'react';
import AuthContainer from '../../Components/AuthContainer';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthAlert from '../../Components/AuthAlert';
import useAuth from '../../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoading, login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState('');
  const [result, setResult] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    const response = await login({ ...formData });
    setLoading(false);

    if (!response?.success) {
      setAlert('failure');
      setResult(response);
    } else {
      setAlert('success');
      setResult(response);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }
  };

  if (isLoading)
    return (
      <p className="text-center py-20 text-lg text-gray-600 font-semibold">
        Loading...
      </p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
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
              Login
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Enter your details to access your FischerBon dashboard
            </p>
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
              autoComplete="email"
              className={`w-full p-3 border rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition ${
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
              autoComplete="current-password"
              className={`w-full p-3 border rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
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

          <p className="text-center text-gray-600 text-sm">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-semibold"
            >
              Sign up
            </Link>
          </p>
        </form>
      </AuthContainer>
    </div>
  );
};

export default LoginPage;
