import React, { ReactNode } from 'react';
import logo from '../assets/logo.png'

const AuthContainer = ({ title, subtitle, children }) => {
  return (
    <div className="bg-muted flex flex-col items-center justify-center">
      <img
        src={logo}
        alt="Fischerbon-logo"
        className="m-5"
        width={200}
        height={100}
      />

      <div className="text-center mb-5">
        <h5 className="text-[#232729]  font-medium text-[20px] lg:text-[32px] leading-7 lg:leading-12 mb-1">
            {title}
        </h5>
        <p className="text-[#525B61] text-lg leading-7 font-normal mx-5">
            {subtitle}
        </p>
      </div>

      <div className="bg-white rounded-lg py-10 md:px-10 px-5 md:mx-auto shadow-md w-[90%] max-w-xl">
        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
