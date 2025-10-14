import React from 'react';
import PublicLayout from './Layout';
import Header from '../../Components/Header';
import { CircleDot } from 'lucide-react';

const NotFound = () => {
  return (
    // <div className="flex flex-col justify-center items-center min-h-100">
    //   <h1>404</h1>
    //   <h4>Not found</h4>

    //   <div>
    //     <p>Either:</p>
    //     <p>This page has not been created yet</p>
    //     <p>You are unauthorized to access this page </p>
    //     <p>Or:</p>
    //     <p>You entered the Wrong URL</p>
    //   </div>

    //   <a href="/"> Go Back Home</a>
    // </div>

    <>
      <Header />
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 md:py-24 flex flex-col items-center justify-center text-white">
        <h1 className="text-[16rem] flex items-center text-center font-bold">
          <span>4</span>
          <span>
            <CircleDot size={'20rem'} />
          </span>
          <span>4</span>
        </h1>
        <h4 className="py-4 font-semibold text-[2rem]">
          You weren't meant to see this...
        </h4>
        <p className=""> </p>
        <div className="cta ">
          <a
            href="/"
            className="inline-block mt-4 bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-cyan-400 transition-colors focus:outline-none focus:ring-4 focus:ring-cyan-300 max-w-max"
          >
            Go back
          </a>
        </div>
      </section>
    </>
  );
};

export default NotFound;
