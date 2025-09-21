import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate()
    return (
        <div className="bg-[#E3E6E8] flex gap-4 h-screen overflow-y-hidden pt-3">
            <Sidebar />
            <div className="flex flex-col h-full w-full mr-4">
                <Header />
                <main className="flex-1 h-full overflow-x-hidden pb-20 no-scrollbar mt-4">

                </main>
            </div>
        </div>
    );
}

export default Dashboard;