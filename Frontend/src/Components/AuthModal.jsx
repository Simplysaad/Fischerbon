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
    try {
      setIsLoading(true);
      const response = await login({ email, password });

      if (response) next && next();
      console.log(response);
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="py-12 px-4 flex flex-col gap-4">
      <span className="text-red-500">{error.toString()}</span>
      <div className="">
        <input
          type="email"
          id="email"
          className="p-2 rounded border focus:ring-1 w-full focus:outline-none"
          value={email}
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
        />
        {/* <label htmlFor="email">Password</label> */}
      </div>
      <div className="">
        <button
          disabled={isLoading}
          type="submit"
          className={`${isLoading ? 'bg-blue-400' : 'bg-blue-600'} py-2 px-4 text-white rounded w-full`}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

// const SignupForm = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   function handleSubmit(e) {
//     e.preventDefault();
//     // Handle sign up submission logic here
//   }
//   return <form>{/* Signup form fields */}</form>;
// };

const AuthModal = ({ next, setIsAuthModalOpen }) => {
  // const [modalType, setModalType] = useState('login');
  const [loading, setLoading] = useState(false);

  return (
    <div className="fixed top-0  min-h-screen min-w-screen bg-gray-600 opacity-90 flex justify-center items-center">
      <div className="border bg-gray-200">
        <X className="border" onClick={() => setIsAuthModalOpen(false)} />
        <LoginForm next={next} />
      </div>
    </div>
  );
};

export default AuthModal;
