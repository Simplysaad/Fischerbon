import React, { useState } from 'react';
import AuthContainer from '../../Components/AuthContainer';
import {Eye, EyeOff } from 'lucide-react'
import {Link, useNavigate} from 'react-router-dom'
import AuthAlert from '../../Components/AuthAlert';

const LoginPage = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState('')


    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.password.trim()) newErrors.password = 'Password is required';
        return newErrors;
    }

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const BASE_URL = 'https://fischerbon.onrender.com';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        setErrors(prev => ({...prev, [name]: ''}))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        setLoading(true);

        try{
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            })

            const result = response.json

            if(!result.success){
                setAlert('failure')
            } else{
                setAlert('success');
                // navigate('/dashboard');
            }

        } catch (error) {
            setAlert('network')
            // console.log(error)
        } finally {
            setLoading(false);
        }    
    };

    return (
        <div>
            {
                alert === 'success' ? <AuthAlert header={'Logged In'} message={'You can now access your dashboard'} iconType={'success'} border={'#3c97d0'} onClose={() => setAlert('')}/> 
                :
                alert === 'failure' ? <AuthAlert header={'Oops'} message={"Something went wrong, try that again later"} iconType={'error'} onClose={() => setAlert('')}/> 
                :
                alert === 'network' ? <AuthAlert header={'Network Error'} message={"You're not connected to the internet"} iconType={'error'} onClose={() => setAlert('')}/> 
                :
                ''
            }
            <>
            <AuthContainer>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <h5 className="text-dark text-2xl leading-9">Login</h5>
                    <p className="text-[16px] lg:text-lg leading-6 lg:leading-7 text-gray font-normal">
                        Enter your details to access your dashboard
                    </p>
                </div>
                
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
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="relative">
                    <div>
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
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <Link to="/forgot-password"><p className="text-right text-[13px] text-primary leading-5">
                    Forgot password?
                    </p></Link>
                </div>


                <button
                type="submit"
                disabled={loading}
                className={`cursor-pointer w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
                    loading ? 'bg-accent cursor-not-allowed' : 'bg-primary hover:bg-primaryHover'
                }`}
                >
                {loading ? 'Logging you in...' : 'Log in'}
                </button>


            <p className="text-sm text-[#69757C] leading-5">
                Don't have an account? <Link to="/signup"><span className="text-primary">Sign up</span></Link>
            </p>
            </form>
            </AuthContainer>
            </>
        </div>
    );
}

export default LoginPage;