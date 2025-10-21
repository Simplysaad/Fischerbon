import Logo from '../assets/logo-removebg-preview.png';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

const AdminHeader = ({
  isSidebarOpen,
  setIsSidebarOpen,
  activeHref,
  navItems,
}) => {
  navItems.forEach((item) => {
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
          {navItems.map(({ href, label, icon: Icon, onClick = null }) => (
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

export default AdminHeader;
