import React from 'react';

const AdminButton = ({text, disabled}) => {
    return (
        <div className="text-right">
            <button
                type="submit"
                className={`py-3 px-5 ${disabled ? 'bg-accent cursor-not-allowed' : 'bg-primary hover:bg-primaryHover cursor-pointer'} rounded-sm font-medium text-sm leading-6 text-white ease-in-out duration-300 mt-2`}
            >
                {text}
            </button>                   
        </div>
    );
}

export default AdminButton;