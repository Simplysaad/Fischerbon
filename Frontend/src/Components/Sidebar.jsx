// Sidebar.jsx
import React from 'react';
import { Award, BellIcon, BookOpen, Layers, User2, Users } from 'lucide-react';

const navItems = [
  { href: '#overview', label: 'Dashboard Overview', icon: Layers },
  { href: '#enrollment', label: 'Enrollments', icon: Users },
  { href: '/admin/courses', label: 'Manage Courses', icon: BookOpen },
  { href: '#certifications', label: 'Certifications', icon: Award },
  { href: '#notifications', label: 'Notifications', icon: BellIcon },
  { href: '#profile', label: 'Profile', icon: User2 },
];

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  activeSection,
}) {
  return (
    <>
      {/* Overlay for small screens when sidebar is open */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden transition-opacity ${
          sidebarOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 bg-white shadow-md w-64 transform transition-transform duration-200 ease-in-out z-20
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex-shrink-0`}
        aria-label="Sidebar navigation"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-gray-200 px-6">
            <h1 className="text-xl font-bold text-blue-600 select-none">
              FischerBon Admin
            </h1>
          </div>
          <nav className="flex-grow px-6 py-6 overflow-y-auto">
            <ul className="space-y-3 text-gray-700">
              {navItems.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 py-2 px-4 rounded-lg transition-colors hover:bg-blue-100
                      ${
                        activeSection === href
                          ? 'bg-blue-100 font-semibold text-blue-700'
                          : 'font-medium'
                      }`}
                    aria-current={activeSection === href ? 'page' : undefined}
                  >
                    <Icon className="w-6 h-6" aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
