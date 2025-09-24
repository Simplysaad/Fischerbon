import React from 'react';
import AdminDashboardLayout from './AdminDashboardLayout';

const AdminProfile = () => {

    let img = true;

    return (
        <>
            <AdminDashboardLayout>
                <div className='bg-[#F1F2F3] rounded-lg p-3 flex flex-col items-center'>
                    {!img ? <img
                        src={'https://randomuser.me/api/portraits/men/40.jpg'}
                        alt="User-Profile"
                        className="w-[100px] h-[100px] rounded-full"
                    /> 
                    :
                    <div className='mb-5 size-20 bg-primary text-white font-bold justify-center rounded-full flex items-center text-center hover:bg-primaryHover'>
                        {"EI"}
                    </div>
                    }
                    <h4 className="text-xl font-bold text-dark">
                        Engr Iskil Ismail / <span className='font-gray'>Admin</span>
                    </h4>
                </div>
            </AdminDashboardLayout>
        </>
    );
}

export default AdminProfile;