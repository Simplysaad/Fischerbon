
import { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import AuthContainer from '../../Components/AuthContainer'
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [linkSent, setLinkSent] = useState(false);

  const handleSubmit = (e) => {
    //Post fetch await logic goes here
    e.preventDefault();
  };

  return (
    <>
      {!linkSent ? (
        <AuthContainer
          title="Forgot Your Password"
          subtitle="Enter your email and we'll send you a reset link"
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-12 text-center items-center justify-center"
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
                // value={formData.email}
                // onChange={handleInputChange}
                placeholder="Enter your email address"
                className="w-full p-3 border-2 rounded-md border-accent outline-none placeholder:text-accent text-[16px] leading-6 focus:border-primary transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              type="submit"
              className="mb-2 bg-primary text-white hover:bg-primaryHover w-full font-medium py-3 px-4 rounded-md cursor-pointer transition-colors"
              onClick={() => setLinkSent(true)}
            >
              Send reset link
            </button>
          </form>
          <Link to="/login">
            <p className="text-center flex justify-center text-[14px] text-dark cursor-pointer leading-5 items-center gap-2">
              <span className="text-center">
                <ArrowLeft size="20" />
              </span>
              <span className="text-center">Back to Login</span>
            </p>
          </Link>
        </AuthContainer>
        
      ) : (
        
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
                type="submit"
                className="border-1 border-primary text-primary w-full font-medium py-3 px-4 rounded-md cursor-pointer"
              >
                Resend Link
              </button>
            </div>
          </div>
        </AuthContainer>
      )}
    </>
  );
}
