import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/logo-removebg-preview-removebg-preview.png';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import useAuth from '../context/AuthContext.jsx';

export default function Header({ type }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  // const user = { x: 1 };

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
  const navLinks3 = [
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
  // const navLinks = navLinks2;
  // user ? console.log(user) : console.log('hello world');
  const navLinks = user ? navLinks3 : type == 'landing' ? navLinks1 : navLinks2;

  navLinks.forEach((link) => {
    link.isActive =
      location.hash === link.path || location.pathname === link.path;
  });

  return (
    <header className="backdrop-blur p-2 shadow-sm break sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex  justify-between flex-wrap items-center sm:px-6 lg:px-8">
        <Link to="/">
          <h1 className="text-2xl font-bold text-blue-700 select-none">
            <img
              src={Logo}
              style={{ height: '2.2em', width: 'auto' }}
              alt="FischerBon"
            />
          </h1>
        </Link>
        <button
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
          className="md:hidden text-blue-600"
          aria-label="Open menu"
        >
          {isNavbarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="w-100 overflow-hidden">
          <nav
            className={`${isNavbarOpen ? 'h-full' : ' h-0'} md:h-full flex  flex-col md:flex-row justify-center md:absolute md:top-0 md:end-0  md:pe-4 justify-center items-center md:right-0 font-medium text-gray-700`}
          >
            {navLinks.map(({ path, text, isActive }, idx) => (
              <a
                key={idx}
                href={path}
                onClick={() => setIsNavbarOpen(false)}
                className={`hover:text-blue-600 text-center sm:border-none ${idx === navLinks.length - 1 ? '' : 'border-b'} w-full py-4 px-2 ${isActive ? 'text-blue-500' : ''}`}
              >
                {text}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
