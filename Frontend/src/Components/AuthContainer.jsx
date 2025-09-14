import React, { ReactNode } from 'react';

const AuthContainer = ({ title, subtitle, children }) => {
  return (
    <div className="bg-muted flex flex-col items-center justify-center">
      <img
        src=""
        alt="Fischerbon-logo"
        className="m-5"
      />

      <div className="text-center mb-6">
        <h5 className="text-[#0d3d55]  font-medium text-[20px] lg:text-[32px] leading-7 lg:leading-12 mb-1">
            {title}
        </h5>
        <p className="text-[#525B61] text-lg leading-7 font-normal">
            {subtitle}
        </p>
      </div>

      <div className="bg-white rounded-lg md:p-13 p-10 m-3 shadow-md w-full max-w-xl">
        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
