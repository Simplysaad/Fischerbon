import React, { useState } from 'react';
import { Search, UserCircle, ChevronDown } from 'lucide-react';
import useAuth from '../context/AuthContext';
import Logo from '../assets/logo-removebg-preview.png';
import { Link } from 'react-router-dom';

export default function AdminHeader() {
  const { logout } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="backdrop-blur p-2 shadow-sm break sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between space-x-4">
        {/* Branding */}
        <Link to="/">
          <h1 className="text-2xl font-bold text-blue-700 select-none">
            <img
              src={Logo}
              style={{ height: '2.2em', width: 'auto' }}
              alt="FischerBon"
            />
          </h1>
        </Link>

        {/* Search Input */}
        <div className="hidden md:flex-1 max-w-xl relative">
          <label htmlFor="dashboard-search" className="sr-only">
            Search courses, users, content...
          </label>
          <input
            type="search"
            id="dashboard-search"
            placeholder="Search courses, users, content..."
            className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            aria-haspopup="true"
            aria-expanded={profileMenuOpen}
            className="flex items-center gap-2 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 p-1"
            aria-label="User menu"
          >
            <UserCircle className="w-8 h-8 text-blue-600" />
            <span className="hidden sm:block font-semibold text-gray-700 select-none">
              Admin
            </span>
            <ChevronDown
              className={`w-4 h-4 text-blue-600 transition-transform ${
                profileMenuOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          {/* Dropdown */}
          {profileMenuOpen && (
            <div
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                <button
                  className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() => {
                    logout();
                    alert('Logged out successfully');
                  }}
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
