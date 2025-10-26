import Hero from '../../Components/Hero';
import useAuth from '../../context/AuthContext';

import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';

import React, { useState, useEffect } from 'react';
import { Layers, User2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Footer from '../../Components/Footer';

export default function Layout({ children, hero }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('');

  const { user } = useAuth();

  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname.split('/');
    console.log(currentPath);
    currentPath.forEach((item) => {
      navItems.forEach((i) => {
        if (item !== '' && i.href.split('/').includes(item)) {
          return setActiveHref(i.href);
        }
      });
    });
  }, [location]);
  const navItems = [{ href: '/courses', label: 'Courses', icon: Layers }];

  if (!user) navItems.push({ href: '/login', label: 'Login', icon: User2 });
  return (
    <div className="">
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

        <main className="flex-1 overflow-y-auto mt-16 overscroll-contain px-0">
          {hero && <Hero hero={hero} />}

          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
