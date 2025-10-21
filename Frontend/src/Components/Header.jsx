// import { Link, useLocation } from 'react-router-dom';
// import Logo from '../assets/logo-removebg-preview-removebg-preview.png';
// import { Menu, X } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import useAuth from '../context/AuthContext.jsx';

// export default function Header({ type }) {
//   const [isNavbarOpen, setIsNavbarOpen] = useState(false);
//   const location = useLocation();
//   const { user } = useAuth();
//   const [activeSection, setActiveSection] = useState('#home');

//   const navLinks = user ? navLinks3 : type == 'landing' ? navLinks1 : navLinks2;

//   navLinks.forEach((link) => {
//     link.isActive =
//       activeSection === link.path || location.pathname === link.path;
//     // location.hash === link.path || location.pathname === link.path;
//   });

//   // Track scroll to highlight active sidebar link
//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = navLinks.map((link) => link.path);
//       // console.log(sections);
//       let current = '#home';
//       const scrollY = window.pageYOffset;

//       for (const href of sections) {
//         if (!href.startsWith('#')) return null;
//         const element = document.querySelector(href);
//         if (element && element.offsetTop - 80 <= scrollY) {
//           // console.log(element);
//           current = href;
//         }
//       }
//       setActiveSection(current);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <header className="backdrop-blur p-2 shadow-sm break sticky top-0 z-30">
//       <div className="max-w-7xl mx-auto flex  justify-between flex-wrap items-center sm:px-6 lg:px-8">
//         <Link to="/">
//           <h1 className="text-2xl font-bold text-blue-700 select-none">
//             <img
//               src={Logo}
//               style={{ height: '2.2em', width: 'auto' }}
//               alt="FischerBon"
//             />
//           </h1>
//         </Link>
//         <button
//           onClick={() => setIsNavbarOpen(!isNavbarOpen)}
//           className="md:hidden text-blue-600"
//           aria-label="Open menu"
//         >
//           {isNavbarOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>

//         <div className="w-100 overflow-hidden">
//           <nav
//             className={`${isNavbarOpen ? 'h-full' : ' h-0'} md:h-full flex  flex-col md:flex-row md:absolute md:top-0 md:end-0  md:pe-4 justify-center items-center md:right-0 font-medium text-gray-700`}
//           >
//             {navLinks.map(({ path, text, isActive }, idx) => (
//               <a
//                 key={idx}
//                 href={path}
//                 onClick={() => setIsNavbarOpen(false)}
//                 className={`hover:text-blue-600 text-center sm:border-none ${idx === navLinks.length - 1 ? '' : 'border-b'} w-full py-4 px-2 ${isActive ? 'text-blue-500' : ''}`}
//               >
//                 {text}
//               </a>
//             ))}
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }

import Logo from '../assets/logo-removebg-preview.png';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Header = ({ isSidebarOpen, setIsSidebarOpen, activeHref, navItems }) => {
  navItems?.forEach((item) => {
    item.isActive = item.href === activeHref;
  });

  return (
    // <header className="backdrop-blur flex-wrap md:flex-nowrap p-2 shadow-sm break fixed w-full top- z-20 flex items-center justify-between px-2">
    <header className="backdrop-blur p-2 shadow-sm flex flex-nowrap justify-between fixed items-center w-full top-0 z-30">
      <div className="logo sm:px-6 lg:px-8">
        <Link to="/">
          <h1 className="text-2xl font-bold text-blue-700 select-none">
            <img
              src={Logo}
              style={{ height: '2.2em', width: 'auto' }}
              alt="FischerBon"
            />
          </h1>
        </Link>
      </div>
      <div className="navbarToggle md:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-blue-600"
          aria-label="Open menu"
        >
          <Menu />
        </button>
      </div>

      <div className="options hidden md:inline-block px-4 py-2 ">
        <ul className="flex gap-3 justify-center ">
          {navItems?.map(({ href, label, icon: Icon, onClick = null }) => (
            <li key={href} title={label}>
              <Link
                to={href}
                className={`flex gap-1  items-center ${
                  href === activeHref
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-700'
                }`}
                onClick={() => {
                  setIsSidebarOpen(false);
                  if (onClick) onClick();
                }}
              >
                <Icon size={20} />
                <span className="hidden lg:inline">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
