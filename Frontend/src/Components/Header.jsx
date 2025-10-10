import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/logo-removebg-preview-removebg-preview.png';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import useAuth from '../context/AuthContext.jsx';

export default function Header({ type }) {
  const location = useLocation();
  // const { user } = useAuth();
  const user = { x: 1 };

  const navLinks1 = [
    {
      path: '#home',
      text: 'Home',
      isActive: false,
    },
    {
      path: '#what',
      text: 'What',
      isActive: false,
    },
    {
      path: '#why',
      text: 'Why',
      isActive: false,
    },
    {
      path: '#testimonials',
      text: 'Testimonials',
      isActive: false,
    },
  ];

  const navLinks2 = [
    {
      path: '/',
      text: 'Home',
      isActive: false,
    },
    {
      path: '/courses',
      text: 'Courses',
      isActive: false,
    },
    {
      path: '/login',
      text: 'Login',
      isActive: false,
    },
    {
      path: '/signup',
      text: 'Register',
      isActive: false,
    },
  ];
  const navLinks = [
    {
      path: '/',
      text: 'Home',
      isActive: false,
    },
    {
      path: '/courses',
      text: 'Courses',
      isActive: false,
    },
  ];

  // const navLinks = navLinks3;
  // type === 'landing' ? navLinks1 : user ? navLinks3 : navLinks2;

  navLinks.forEach((link) => {
    link.isActive =
      location.hash === link.path || location.pathname === link.path;
  });
  return (
    <header className="backdrop-blur shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 sm:px-6 lg:px-8">
        <Link to="/">
          <h1 className="text-2xl font-bold text-blue-700 select-none">
            <img
              src={Logo}
              style={{ height: '2.2em', width: 'auto' }}
              alt="FischerBon"
            />
          </h1>
        </Link>
        <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
          {navLinks2.map(({ path, text, isActive }, idx) => (
            <a
              key={idx}
              href={path}
              className={`hover:text-blue-600 transition ${isActive ? 'text-blue-500' : ''}`}
            >
              {text}
            </a>
          ))}
        </nav>
        <button className="md:hidden text-blue-600" aria-label="Open menu">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}
