import { useState } from 'react';
import useAuth from '../context/AuthContext';

const LoginForm = ({ next }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    setError('');
    setIsLoading(true);
    try {
      const response = await login({ email, password }, next);
      // Handle success (e.g., redirect is likely handled by login function)
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit} className=" py-12 px-4 flex flex-col gap-4">
      <div className="">
        <input
          type="email"
          id="email"
          className="p-2 rounded focus:ring-1 w-full focus:outline-none"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        {/* <label htmlFor="email">Email Address</label> */}
      </div>
      <div className="">
        <input
          type="password"
          id="password"
          className="p-2 rounded border focus:ring-1 w-full focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          autoComplete="current-password"
        />
        {/* <label htmlFor="email">Password</label> */}
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 py-2 px-4 text-white rounded w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Logging in...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
