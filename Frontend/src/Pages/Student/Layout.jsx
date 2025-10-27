// import Header from '../../Components/Header';
// import Hero from '../../Components/Hero';

// const PublicLayout = ({ children, header, hero }) => {
//   return (
//     <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-gray-50">
//       {/* Header */}
//       <Header type={header} />
//       {/* Hero Section */}
//       {hero && <Hero hero={hero} />}
//       {children}
//       <footer className="bg-gray-100 relative bottom-0 min-w-screen py-8 text-center text-gray-600 select-none text-sm">
//         &copy; {new Date().getFullYear()} FISCHERBON inc. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default PublicLayout;

// DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { X, BellIcon, BookOpen, Layers, User2, Users } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Footer from '../../Components/Footer';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Layers },
  { href: '/courses', label: 'Courses', icon: BookOpen },
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
    // Find exact match first, then try to match path prefix
    const exactMatch = navItems.find((item) => item.href === location.pathname);
    if (exactMatch) {
      setActiveHref(exactMatch.href);
    } else {
      // Find the longest matching prefix
      const prefixMatch = navItems
        .filter((item) => location.pathname.startsWith(item.href))
        .sort((a, b) => b.href.length - a.href.length)[0];
      if (prefixMatch) {
        setActiveHref(prefixMatch.href);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeHref={activeHref}
        navItems={navItems}
      />

      <div className="flex flex-1 overflow-hidden">
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
      <Footer />
    </div>
  );
}
