import React from 'react';
import AdminDashboardLayout from './AdminDashboardLayout';
import Start from './Start';    
import AuthAlert from '../../Components/AuthAlert';
import {PersonStanding} from 'lucide-react'

const RegisterStudent = () =>{
    return (
        <>
            <AdminDashboardLayout>
                <div>
                    <Start Icon={PersonStanding} message="You haven't registered any student yet" button="Register a new student" onClick={() => alert("You can register your first student here")}/>
                </div>
            </AdminDashboardLayout>
        </>
    );
}

export default RegisterStudent;