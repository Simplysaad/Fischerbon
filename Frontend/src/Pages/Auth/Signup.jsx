import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContainer from '../../Components/AuthContainer';
import AuthAlert from '../../Components/AuthAlert';

const SignupPage = () => {

  const navigate = useNavigate();

<<<<<<< HEAD
  let registeredMails = ["mechseiko@gmail.com", "qoyumolohuntomi@gmail.com", "saadidris@gmail.com"]

=======
>>>>>>> dashboard
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
<<<<<<< HEAD

  const [alert, setAlert] = useState('')

=======
  const [emailError, setEmailError] = useState('')
  const [alert, setAlert] = useState('')

>>>>>>> dashboard
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
<<<<<<< HEAD
    if (registeredMails.some(mail => mail === formData.email)) newErrors.email = 'An account with that mail already exists!';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (formData.password.trim().length < 8) newErrors.password = 'Password must have a minimum of 8 characters';
=======
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (emailError !== '') newErrors.email = 'An account with that mail already exists';
    if (formData.password.trim().length < 8 && formData.password.trim()) newErrors.password = 'Password must have a minimum of 8 characters';
>>>>>>> dashboard
    if (formData.password.split('').some(character => character === '' || character === ' ')) newErrors.password = 'Spaces are not allowed in password';
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
<<<<<<< HEAD
        setAlert('failure')
      } else{
          setAlert('success');
          // navigate('/login');
=======
        setAlert('failure');
        setEmailError(result.message)
      } else{
          setAlert('success');
          navigate('/login');
>>>>>>> dashboard
      }

    } catch (error) {
        setAlert('network')
<<<<<<< HEAD
        console.log(error)
=======
        // console.log(error)
>>>>>>> dashboard
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
      <AuthContainer>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-dark">Sign up</h2>
            <p className="text-gray text-base mt-1">
              Create an account to start your journey with us
            </p>
          </div>


          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full p-3 border-2 rounded-md border-accent placeholder:text-accent focus:border-primary outline-none"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full p-3 border-2 rounded-md border-accent placeholder:text-accent focus:border-primary outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray mb-1">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full p-3 border-2 rounded-md border-accent placeholder:text-accent focus:border-primary outline-none"
            />
            <span
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-10 cursor-pointer text-accent"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`cursor-pointer w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
              loading ? 'bg-accent cursor-not-allowed' : 'bg-primary hover:bg-primaryHover'
            }`}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>

          <p className="text-sm text-[#69757C] leading-5">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium">
              Login
            </Link>
          </p>
        </form>
      </AuthContainer>
    </div>
  );
};

export default SignupPage;
