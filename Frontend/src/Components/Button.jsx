import React from 'react';

const Button = ({ text, disabled = false, onClick }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={`py-3 px-5 ${disabled ? 'bg-accent cursor-not-allowed' : 'bg-primary hover:bg-primaryHover cursor-pointer'} rounded-sm font-medium text-sm leading-6 text-white ease-in-out duration-300 mt-2`}
    >
      {text}
    </button>
  );
};

export const ButtonSkeleton = () => {
  return (
    <div className="w-32 h-10 bg-gray-300 rounded-sm animate-pulse mt-2"></div>
  );
};

export default Button;
