import React, { useState } from 'react';
// import CreateCourse from './CreateCourse';
import AuthContainer from '../../Components/AuthContainer';
import {Eye, EyeOff } from 'lucide-react'
import {Link} from 'react-router-dom'

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (
        e
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //Get fetch await logic goes here

        // POST - /auth/login
        // email, password


        console.log('Login form submitted:', formData);
    };
    return (
        <div>
            <>
            <AuthContainer>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <h5 className="text-dark text-2xl leading-9">Login</h5>
                    <p className="text-[16px] lg:text-lg leading-6 lg:leading-7 text-gray font-normal">
                        Enter your details to access your dashboard
                    </p>
                </div>
                <hr />

                <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray mb-1"
                >
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full p-3 border-2 rounded-md border-accent outline-none placeholder:text-accent text-[16px] leading-6 focus:border-primary transition-colors duration-200 ease-in-out"
                />
                </div>

                <div className="relative">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray mb-1"
                >
                    Enter your password
                </label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="w-full p-3 border-2 rounded-md border-accent outline-none placeholder:text-accent text-[16px] leading-6 focus:border-primary transition-colors duration-200 ease-in-out"
                />
                <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-10 cursor-pointer text-accent"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>

                <Link to="/forgot-password"><p className="text-right text-[13px] text-primary leading-5">
                Forgot password?
                </p></Link>
                </div>


                <button
                type="submit"
                className="mb-2 bg-primary text-white hover:bg-primaryHover w-full font-medium py-3 px-4 rounded-md cursor-pointer transition-colors"
                >
                Login
                </button>
            </form>

            <p className="text-[13px] text-[#69757C] leading-5">
                Don't have an account? <Link to="/signup"><span className="text-primary">Sign up</span></Link>
            </p>
            </AuthContainer>
            </>
        </div>
    );
}

export default LoginPage;