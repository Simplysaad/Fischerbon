import { X } from 'lucide-react';
import React, { useState } from 'react';
import useAuth from '../context/AuthContext';

const LoginForm = ({ next }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      setIsLoading(true);
      const response = await login({ email, password });
      if (response) next && next();
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-6 w-full max-w-md"
    >
      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
      <input
        type="email"
        required
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <input
        type="password"
        required
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 rounded-md text-white font-semibold ${
          isLoading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        } transition`}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
};

const AuthModal = ({ next, setIsAuthModalOpen }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <button
          aria-label="Close modal"
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-3 right-3 p-1 text-gray-600 hover:text-gray-900 transition"
        >
          <X size={20} />
        </button>
        <header className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Sign in to your account
          </h2>
        </header>
        <section className="px-6 py-6">
          <LoginForm next={next} />
        </section>
      </div>
    </div>
  );
};

export default AuthModal;
