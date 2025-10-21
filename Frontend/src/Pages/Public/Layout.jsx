import Hero from '../../Components/Hero';
import useAuth from '../../context/AuthContext';

import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';

import React, { useState, useEffect } from 'react';
import { BellIcon, Layers, User2 } from 'lucide-react';

const navItems = [
  { href: '/courses', label: 'Courses', icon: Layers },
  { href: '/login', label: 'Login', icon: User2 },
  { href: '#notifications', label: 'Notifications', icon: BellIcon },
];

export default function Layout({ children, hero }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  return (
    <div className="">
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeHref={activeSection}
        navItems={navItems}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          navItems={navItems}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activeHref={activeSection}
        />

        <main className="flex-1 overflow-y-auto mt-16 overscroll-contain px-0">
          {hero && <Hero hero={hero} />}

          {children}
        </main>
      </div>
    </div>
  );
}
