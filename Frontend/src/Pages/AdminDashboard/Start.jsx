import React from 'react';

const Start = ({Icon, message, onClick, button}) => {
    return (
        <div className="text-center border-2 border-dashed rounded-lg border-accent px-5 py-15">
            <div className="size-15 mx-auto rounded-full text-secondary bg-[#c1d4de] flex items-center justify-center">
                <Icon size="24" />
            </div>
            <p className="my-4 md:text-lg">{message}</p>
            <button
                className="py-3 px-4 rounded-sm bg-primary font-medium text-sm leading-6 text-white hover:bg-primaryHover ease-in-out duration-300 cursor-pointer mt-2"
                onClick={onClick}
            >
                {button}
            </button>
        </div>
    );
}

export default Start;
