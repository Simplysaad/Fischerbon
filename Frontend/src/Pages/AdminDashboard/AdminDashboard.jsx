import React from 'react';
import AdminDashboardLayout from './AdminDashboardLayout';
import {Link} from 'react-router-dom';
import {ArrowRight, BookOpen, HardHat, Puzzle} from 'lucide-react';

const AdminDashboard = () => {
    // useEffect() to check authentication status
    // GET /auth/status
    // success: bool
    // message: string

    const quickActions = [
        {
            Icon: BookOpen,
            label: "Create a course",
            description: "Create a new course for students",
            button: "create a course",
            link: "/createCourse"
        },
        {
            Icon: HardHat,
            label: "Register a student",
            description: "Create an account for a new student",
            button: "register a new student",
            link: "/registerStudent"
        },
        {
            Icon: Puzzle,
            label: "Post a challenge",
            description: "Post a new CAD challenge for all students",
            button: "post a challenge",
            link: "/addChallenge"
        }
    ]
    return (
        <>
            <AdminDashboardLayout>
                <div className='grid md:grid-cols-2 grid-cols-1'>
                    {quickActions.map((action, index) => {
                        const Icon = action.Icon
                        return(
                            <div className='flex md:flex-row flex-col w-full gap-0 grow md:m-5 mb-5'>
                                <div className='rounded-l-md h-[120px] flex py-20 md:w-[50%] w-full text-white bg-primary hover:bg-primaryHover text-center items-center justify-center'>
                                    <Icon size={50}/>
                                </div>

                                <div className='rounded-r-md bg-white p-5'>
                                    <h4 className='text-dark leading-9 text-lg font-bold'>{action.label}</h4>
                                    <p className='leading-6 text-gray text-md'>{action.description}</p>

                                    <Link to={action.link}>
                                        <p className="mt-2 flex text-md hover:scale-105 hover:text-primaryHover text-primary xduration-300 ease-in-out cursor-pointer leading-5 items-center gap-2">
                                        <span>{action.button}</span>
                                        <span><ArrowRight size="20" /></span>
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </AdminDashboardLayout>
        </>
    );
}

export default AdminDashboard;