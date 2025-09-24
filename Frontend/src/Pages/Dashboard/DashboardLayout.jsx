import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout = ({children}) => {
    let [sidebarOpen, setsidebarOpen] = useState(window.innerWidth > 768 ? true : false);

    return (
        <div className="bg-[hsl(203,11%,90%)] text-dark md:flex gap-4 h-screen overflow-y-hidden md:pt-2">
            <div className='absolute md:relative z-12'>
                {sidebarOpen && <Sidebar onClick={() => setsidebarOpen(false)}/>}
            </div>

            <div onClick={() => sidebarOpen === true && (window.innerWidth < 768 ? setsidebarOpen(false) : setsidebarOpen(true))} className={`${sidebarOpen ? 'opacity-50 md:opacity-100' : ''} flex flex-col h-full w-full md:mr-4`}>
                <Header onClick={() => setsidebarOpen(true)}/>

                <main className="flex-1 h-full overflow-x-hidden pb-5 no-scrollbar mt-4 md:px-3 px-5">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;