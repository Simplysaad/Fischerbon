import React, { useState } from 'react';
import AdminDashboardLayout from './AdminDashboardLayout';
import Start from './Start';    
import AuthAlert from '../../Components/AuthAlert';
import {PersonStanding} from 'lucide-react'
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AdminButton from './AdminButton';




const RegisterStudent = () =>{

    const navigate = useNavigate();
    const [state, setState] = useState(true);

    const BASE_URL = 'https://fischerbon.onrender.com';

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        role: 'student',
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('')
    const [alert, setAlert] = useState('')

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.password.trim()) newErrors.password = 'Password is required';
        if (emailError !== '') newErrors.email = 'An account with that mail already exists';
        if (formData.password.trim().length < 8 && formData.password.trim()) newErrors.password = 'Password must have a minimum of 8 characters';
        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
        }

        setLoading(true);

        try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const result = response.json();

        if(!result.success){
            setAlert('failure');
            setEmailError(result.message)
        } else{
            setAlert('success');
            navigate('/login');
        }

        } catch (error) {
            setAlert('network')
            // console.log(error)
        } finally {
            setLoading(false);
        }    
    };

    const labelStyle = "text-gray font-serif leading-9 md:text-lg text-md block mb-1";

    return (
        <>
            {
                alert === 'success' ? <AuthAlert header={'Logged In'} message={'You can now access your dashboard'} iconType={'success'} border={'#3c97d0'} onClose={() => setAlert('')}/> 
                :
                alert === 'failure' ? <AuthAlert header={'Oops'} message={"Something went wrong, try that again later"} iconType={'error'} onClose={() => setAlert('')}/> 
                :
                alert === 'network' ? <AuthAlert header={'Network Error'} message={"You're not connected to the internet"} iconType={'error'} onClose={() => setAlert('')}/> 
                :
                ''
            }
            <AdminDashboardLayout>
                <div className='bg-[#F1F2F3] rounded-lg p-3'>
                    {state ? <Start Icon={PersonStanding} message="You haven't registered any student yet" button="Register a new student" onClick={() => setState(false)}/>
                        :
                    <div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="fullName" className={labelStyle}>
                            Student's Full Name
                            </label>
                            <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter the student's full name"
                            className="w-full p-3 border-2 rounded-md border-accent placeholder:text-accent focus:border-primary outline-none"
                            />
                            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className={labelStyle}>
                            Student's Email Address
                            </label>
                            <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter the student's email adress"
                            className="w-full p-3 border-2 rounded-md border-accent placeholder:text-accent focus:border-primary outline-none"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className={labelStyle}>
                            Password
                            </label>
                            <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Set a password for the student"
                            className="w-full p-3 border-2 rounded-md border-accent placeholder:text-accent focus:border-primary outline-none"
                            />
                            <span
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-3 top-14 cursor-pointer text-accent"
                            >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </span>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <AdminButton text={loading ? 'Registering...' : 'Register Student'} disabled={loading}/>
                    </form>

                    </div>
                    }
                </div>
            </AdminDashboardLayout>
        </>
    );
}

export default RegisterStudent;