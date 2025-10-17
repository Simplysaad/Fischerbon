import React from 'react';
import PublicLayout from './Layout';
import Header from '../../Components/Header';
import { CircleDot } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <Header />
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 md:py-24 flex flex-col items-center justify-center text-white px-6 text-center min-h-[70vh]">
        <h1 className="text-[12rem] md:text-[16rem] flex items-center justify-center font-extrabold leading-none select-none">
          <span>4</span>
          <CircleDot size={'20rem'} className="mx-4 stroke-yellow-400" />
          <span>4</span>
        </h1>
        <h2 className="text-4xl md:text-5xl font-semibold mt-6 mb-4 drop-shadow-lg">
          Oops! Page Not Found
        </h2>
        <p className="max-w-lg text-lg md:text-xl text-yellow-200 mb-8 leading-relaxed drop-shadow-md">
          Looks like you wandered off the path. The page you’re looking for
          might have been removed, had its name changed, or is temporarily
          unavailable.
        </p>
        <a
          href="/"
          className="inline-block bg-white text-blue-700 font-semibold rounded-lg px-8 py-4 shadow-lg hover:bg-cyan-400 hover:text-white transition-colors focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:ring-opacity-50"
          aria-label="Go back to homepage"
        >
          Go back home
        </a>
      </section>
    </>
  );
};

export default NotFound;
