// DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import AdminHeader from '../../Components/AdminHeader';
import Sidebar from '../../Components/Sidebar';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeSection={activeSection}
        />

        <main className="flex-1 overflow-y-auto overscroll-contain p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
