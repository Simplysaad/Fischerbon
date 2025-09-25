import React from 'react';
import AdminDashboardLayout from './AdminDashboardLayout';
import Challenges from '../Dashboard/Challenges';
import {BookOpen, PersonStanding, Puzzle} from 'lucide-react';

const AdminProfile = () => {

    let img = true;
    const stats = [
        {label: "Challenges Posted", count: 10, icon:Puzzle},
        {label: "Students Registered", count: 29, icon: PersonStanding},
        {label: "Courses Created", count: 12, icon: BookOpen}
    ]

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
                    <div className='mb-5 size-20 bg-primary text-white text-3xl font-bold justify-center rounded-full flex items-center text-center hover:bg-primaryHover'>
                        {"EI"}
                    </div>
                    }
                    <h4 className="text-lg font-serif text-dark leading-9">
                        Engr Iskil Ismail / <span className='font-gray text-secondary'>Admin</span>
                    </h4>
                    <section className='grid lg:grid-cols-3 grid-cols-1'>
                    {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <article
                        key={index}
                        className="rounded-lg bg-[#F1F6F3] font-serif border-1 border-gray m-5 flex-1 p-5 gap-3 flex justify-between items-center"
                        >
                            <div
                                className={` bg-primary p-5 rounded-full flex items-center justify-center`}
                            >
                                <Icon size="24" color={stat.challenges} />
                            </div>
                            <p className="text-[#2F3437] text-base leading-6 font-medium">
                                <span className='text-3xl'>{`${stat.count}`}</span> {`${stat.label}`} 
                            </p>
                        </article>
                    );
                    })}
                    </section>
                </div>
            </AdminDashboardLayout>
        </>
    );
}

export default AdminProfile;