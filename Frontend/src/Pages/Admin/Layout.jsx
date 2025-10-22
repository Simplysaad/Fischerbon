// DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { X, BellIcon, BookOpen, Layers, User2, Users } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const navItems = [
  { href: '/admin/', label: 'Overview', icon: Layers },
  { href: '#enrollments', label: 'Enrollments', icon: Users },
  { href: '/admin/courses', label: 'Courses', icon: BookOpen },
  { href: '#notifications', label: 'Notifications', icon: BellIcon },
  { href: '#profile', label: 'Profile', icon: User2 },
];

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#overview');

  // // Track scroll to highlight active sidebar link
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const sections = [
  //       '#overview',
  //       '#enrollment',
  //       '#courses',
  //       '#certifications',
  //       '#notifications',
  //       '#profile',
  //     ];
  //     let current = '#overview';
  //     const scrollY = window.pageYOffset;

  //     for (const href of sections) {
  //       const element = document.querySelector(href);
  //       if (element && element.offsetTop - 80 <= scrollY) {
  //         current = href;
  //       }
  //     }
  //     setActiveHref(current);
  //   };

  //   window.addEventListener('scroll', handleScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

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

        <main className="flex-1 overflow-y-auto mt-16 overscroll-contain">
          {children}
        </main>
      </div>
    </div>
  );
}
