import { X } from 'lucide-react';
import React, { useState } from 'react';
import Input from './Input';
import useAuth from '../context/AuthContext';

const LoginForm = ({ next }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await login({ email, password }, next);
    console.log(response);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="border py-12 px-4 flex flex-col gap-4"
    >
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
          type="submit"
          className="bg-blue-600 py-2 px-4 text-white rounded w-full"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Handle sign up submission logic here
  }
  return <form>{/* Signup form fields */}</form>;
};

// const AuthModal = ({ setIsOpen }) => {
// //   const [modalType, setModalType] = useState('login');
// //   const [loading, setLoading] = useState(false);

// //   return (
// //     <section className="fixed inset-0 min-h-screen min-w-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
// //       <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
// //         <button
// //           className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
// //           onClick={() => {
// //             setIsOpen(false);
// //           }}
// //         >
// //           <X size={24} />
// //         </button>
// //         <h2 className="text-2xl font-bold mb-4">
// //           {modalType === 'login' ? 'Login' : 'Sign Up'}
// //         </h2>
// //         {modalType === 'login' ? <LoginForm /> : <SignupForm />}
// //       </div>
// //     </section>
// //   );
// // };

// // export default AuthModal;

// import React, { useState } from 'react';
// import useAuth from '../context/AuthContext';

// export default function AuthModal({ isOpen = true, onClose }) {
//   const [isLoginTab, setIsLoginTab] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');

//   const { login, register } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let response;
//     if (isLoginTab) {
//       response = await login({ email, password });
//     } else {
//       response = await register({ name, email, password });
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Overlay */}
//       <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
//         {/* Modal Container */}
//         <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative">
//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
//             aria-label="Close modal"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth={2}
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>

//           {/* Tabs */}
//           <div className="flex mb-6">
//             <button
//               className={`flex-1 py-2 text-center font-semibold rounded-t-xl transition ${
//                 isLoginTab
//                   ? 'bg-indigo-600 text-white shadow-md'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//               onClick={() => setIsLoginTab(true)}
//             >
//               Login
//             </button>
//             <button
//               className={`flex-1 py-2 text-center font-semibold rounded-t-xl transition ${
//                 !isLoginTab
//                   ? 'bg-indigo-600 text-white shadow-md'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//               onClick={() => setIsLoginTab(false)}
//             >
//               Sign Up
//             </button>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {!isLoginTab && (
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Name
//                 </label>
//                 <input
//                   id="name"
//                   type="text"
//                   autoComplete="name"
//                   placeholder="Your full name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                   className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-600 focus:ring focus:ring-indigo-300 focus:outline-none transition"
//                 />
//               </div>
//             )}

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 autoComplete="email"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-600 focus:ring focus:ring-indigo-300 focus:outline-none transition"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 autoComplete={isLoginTab ? 'current-password' : 'new-password'}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-600 focus:ring focus:ring-indigo-300 focus:outline-none transition"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition"
//             >
//               {isLoginTab ? 'Log In' : 'Sign Up'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// import React, { useState } from 'react';

const AuthModal = ({ next }) => {
  // const [modalType, setModalType] = useState('login');
  const [loading, setLoading] = useState(false);

  return (
    <div className="fixed top-0  min-h-screen min-w-screen bg-green-200 flex justify-center items-center">
      <div className="border">
        <LoginForm />
      </div>
    </div>
  );
};

export default AuthModal;
