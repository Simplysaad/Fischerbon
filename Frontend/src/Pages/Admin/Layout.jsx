// DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import AdminHeader from '../../Components/AdminHeader';
import Sidebar from '../../Components/Sidebar';
import { X, BellIcon, BookOpen, Layers, User2, Users } from 'lucide-react';

const navItems = [
  { href: '#overview', label: 'Overview', icon: Layers },
  { href: '#enrollments', label: 'Enrollments', icon: Users },
  { href: '/admin/courses', label: 'Courses', icon: BookOpen },
  { href: '#notifications', label: 'Notifications', icon: BellIcon },
  { href: '#profile', label: 'Profile', icon: User2 },
];

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#overview');

  // Track scroll to highlight active sidebar link
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        '#overview',
        '#enrollment',
        '#courses',
        '#certifications',
        '#notifications',
        '#profile',
      ];
      let current = '#overview';
      const scrollY = window.pageYOffset;

      for (const href of sections) {
        const element = document.querySelector(href);
        if (element && element.offsetTop - 80 <= scrollY) {
          current = href;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-hidden">
      <AdminHeader
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeHref={activeSection}
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
          activeHref={activeSection}
        />

        <main className="flex-1 overflow-y-auto mt-16 overscroll-contain">
          {children}
        </main>
      </div>
    </div>
  );
}
