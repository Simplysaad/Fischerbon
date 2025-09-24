import { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import AuthContainer from '../../Components/AuthContainer'
import { Link, useNavigate } from 'react-router-dom';
import AuthAlert from '../../Components/AuthAlert';

const ForgotPasswordPage = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
  })

  const [alert, setAlert] = useState('')
  const [errors, setErrors] = useState({});  
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const BASE_URL = "https://fischerbon.onrender.com";


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
        const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if(!result.success){
          setAlert('failure');
        } else{
          
            let url = `https://fischerbon.vercel.app/reset-password?token=${result.data?.token}`
            
            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/jsCon',
              },
              body: JSON.stringify({
                service_id: 'service_zh0vj84', // EmailJS service ID
                template_id: 'template_ol09wxr', // EmailJS template ID
                user_id: '9nHCjbJ8w8yQTswge', // EmailJS user ID

                template_params: {
                  user_email: formData.email,
                  name: 'Fischerbon Engineering LTD.',
                  time: `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`,
                  subject: 'Password reset link',
                  message: `😃Hi, You requested a password reset link, use the link below to reset your password, note that this link will expire in 5 minutes: ${url}`,
                },
              }),
          });

          if (response.ok) {
            setAlert('success');
          } else {
            setAlert('failure')
          }
        }
      } catch (error) {
        setAlert('network')
      }
  }

  return (
    <div>
      {
        alert === 'failure' ? <AuthAlert header={'Oops'} message={"Something went wrong, try that again later"} iconType={'error'} onClose={() => setAlert('')}/> 
        :
        alert === 'network' ? <AuthAlert header={'Network Error'} message={"You're not connected to the internet"} iconType={'error'} onClose={() => setAlert('')}/> 
        :
        ''
      }
      
      {alert === 'success' ?
        <AuthContainer>
          <div className="space-y-5 text-center items-center justify-center flex flex-col">
            <div className="rounded-full bg-[#c1d4de] text-primary p-5 opacity-90">
              <CheckCircle />
            </div>

            <div className="max-w-md">
              <h5 className="text-dark font-medium text-[16px] lg:text-[22px] leading-6 lg:leading-9">
                Check Your Mail
              </h5>
              <p className="text-[16px] lg:text-lg leading-6 lg:leading-7 text-gray font-normal">
                Please check your mail and follow the instructions to reset your
                password.
              </p>
            </div>

            <div className="w-full">
            <Link to="/login">
                <button type="submit" 
                className="mb-3 bg-primary text-white hover:bg-primaryHover w-full font-medium py-3 px-4 rounded-md cursor-pointer transition-colors"
                    >    
                      Back to Login
                </button>
            </Link>
            
              <button
                onClick={handleSubmit}
                className="border-1 border-primary text-primary w-full font-medium py-3 px-4 rounded-md cursor-pointer"
              >
                Resend Link
              </button>
            </div>
          </div>
        </AuthContainer>

      :
      
        <AuthContainer
          title="Forgot Your Password"
          subtitle="Enter your email and we'll send you a reset link"
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-10"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray mb-1 text-left"
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
            <button
              type="submit"
              className="mb-2 bg-primary text-white hover:bg-primaryHover w-full font-medium py-3 px-4 rounded-md cursor-pointer transition-colors"
            >
              Send reset link
            </button>
          </form>
          <Link to="/login">
            <p className="text-center mt-1 flex justify-center text-[14px] text-dark cursor-pointer leading-5 items-center gap-2">
              <span className="text-center">
                <ArrowLeft size="20" />
              </span>
              <span className="text-center">Back to Login</span>
            </p>
          </Link>
        </AuthContainer>
      }
    </div>
  )
};

export default ForgotPasswordPage;
