import React, { useState } from 'react';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-white shadow-md w-64 transform transition-transform duration-200 ease-in-out z-20
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex-shrink-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-gray-200 px-6">
            <h1 className="text-xl font-bold text-blue-600">CAD LMS Admin</h1>
          </div>
          <nav className="flex-grow px-6 py-4 overflow-y-auto">
            <ul className="space-y-4 text-gray-700">
              <li>
                <a
                  href="#overview"
                  className="block py-2 px-3 rounded hover:bg-blue-100 font-semibold"
                >
                  Dashboard Overview
                </a>
              </li>
              <li>
                <a
                  href="#enrollment"
                  className="block py-2 px-3 rounded hover:bg-blue-100"
                >
                  Enrollment Management
                </a>
              </li>
              <li>
                <a
                  href="#courses"
                  className="block py-2 px-3 rounded hover:bg-blue-100"
                >
                  Course Content
                </a>
              </li>
              <li>
                <a
                  href="#certifications"
                  className="block py-2 px-3 rounded hover:bg-blue-100"
                >
                  Certifications
                </a>
              </li>
              <li>
                <a
                  href="#notifications"
                  className="block py-2 px-3 rounded hover:bg-blue-100"
                >
                  Notifications
                </a>
              </li>
              <li>
                <a
                  href="#profile"
                  className="block py-2 px-3 rounded hover:bg-blue-100"
                >
                  Admin Profile
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-white shadow p-4 border-b border-gray-200 md:hidden">
          <button
            className="text-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-blue-600">
            Dashboard Overview
          </h2>
          <div />
        </header>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
