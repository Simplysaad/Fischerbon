// DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { X, BellIcon, BookOpen, Layers, User2, Users } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const navItems = [
  { href: '/admin/', label: 'Overview', icon: Layers },
  { href: '/admin/courses', label: 'Courses', icon: BookOpen },
  {
    href: '/notifications',
    label: 'Notifications',
    onlySidebar: true,
    icon: BellIcon,
  },
  { href: '/profile', label: 'Profile', onlySidebar: true, icon: User2 },
];

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('');

  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname.split('/');
    console.log(currentPath);
    currentPath.forEach((item) => {
      for (let i = 0; i < navItems.length; i++) {
        if (item !== '' && navItems[i].href.split('/').includes(item)) {
          console.log(navItems[i].href, item);
          setActiveHref(navItems[i].href);
          break;
        }
      }
    });
  }, [location]);

  // https://o75955.ingest.sentry.io/api/4505953531199488/envelope/?sentry_key=6e2ba0bf7c73d34430ca15324ed93ae8&sentry_version=7&sentry_client=sentry.javascript.browser%2F7.116.0https://o75955.ingest.sentry.io/api/4505953531199488/envelope/?sentry_key=6e2ba0bf7c73d34430ca15324ed93ae8&sentry_version=7&sentry_client=sentry.javascript.browser%2F7.116.0
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeHref={activeHref}
        navItems={navItems}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* <button onClick={(e) => setIsSidebarOpen(!isSidebarOpen)}>
          <BadgeRussianRuble className="md:hidden" />
        </button> */}
        <Sidebar
          navItems={navItems}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activeHref={activeHref}
        />

        <main className="overflow-y-auto mt-20 min-w-screen container overscroll-contain px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
