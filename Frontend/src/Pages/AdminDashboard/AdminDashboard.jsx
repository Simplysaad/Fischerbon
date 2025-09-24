import React from 'react';
import AdminDashboardLayout from './AdminDashboardLayout';
import {Link} from 'react-router-dom';
import {ArrowRight, BookOpen, PersonStanding, Puzzle} from 'lucide-react';

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
            button: "Create a course",
            link: "/course/create"
        },
        {
            Icon: PersonStanding,
            label: "Register a student",
            description: "Create an account for a new student",
            button: "Register a new student",
            link: "/student/register"
        },
        {
            Icon: Puzzle,
            label: "Post a challenge",
            description: "Post a new challenge for all students",
            button: "Post a challenge",
            link: "/challenge/add"
        }
    ]
    return (
        <>
            <AdminDashboardLayout>
                <div className='grid lg:grid-cols-2 grid-cols-1 mx-auto px-3 md:px-0'>
                    {quickActions.map((action, index) => {
                        const Icon = action.Icon
                        return(
                            <div className='flex md:flex-row flex-col w-full gap-0 grow md:m-5 md:mt-0.5 mt-10'>

                                <div className='rounded-l-md h-[100px] flex md:py-20 py-15 md:w-[30%] w-full text-white bg-primary hover:bg-primaryHover duration-300 ease-in-out text-center items-center justify-center'>
                                    <Icon size={60}/>
                                </div>

                                <div className='rounded-r-md md:h-[160px] md:w-[65%] w-full bg-white p-5 flex flex-col justify-between'>
                                    <div>
                                        <h4 className='text-dark leading-10 text-xl font-bold'>{action.label}</h4>
                                        <p className='text-gray mb-1 md:mb-0 text-md'>{action.description}</p>
                                    </div>
                                    

                                    <Link to={action.link}>
                                        <p className="mt-3 flex md:text-[16px] text-sm hover:scale-x-[102%] hover:text-primaryHover text-primary duration-300 ease-in-out cursor-pointer items-center gap-2">
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