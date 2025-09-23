import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';


const AdminDashboardLayout = ({children}) => {

    let [sidebarOpen, setsidebarOpen] = useState(window.innerWidth > 768 ? true : false);

    return (
        <div className="bg-[hsl(204,10%,90%)] text-dark md:flex gap-4 h-screen overflow-y-hidden md:pt-2">
            <div className='absolute md:relative z-12'>
                {sidebarOpen && <AdminSidebar onClick={() => setsidebarOpen(false)}/>}
            </div>

            <div onClick={() => sidebarOpen === true && (window.innerWidth < 768 ? setsidebarOpen(false) : setsidebarOpen(true))} className={`${sidebarOpen ? 'opacity-50 md:opacity-100' : ''} flex flex-col h-full w-full md:mr-4`}>
                <AdminHeader onClick={() => setsidebarOpen(true)}/>

                <main className="flex-1 h-full overflow-x-hidden pb-5 no-scrollbar mt-4 md:px-3 px-5">
                    <section className="overflow-y-auto no-scrollbar w-full">
                        {children}
                    </section>
                </main>
            </div>
        </div>
    );
}

export default AdminDashboardLayout;