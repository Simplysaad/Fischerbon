import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo-full.png';
import axiosInstance from '../utils/axios.util';
import { ArrowBigUp } from 'lucide-react';

const Footer = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    async function fetchCourses() {
      try {
        const { data: response } = await axiosInstance.get('/courses');
        if (!response.success)
          throw new Error(response.message || 'unable to fetch courses');
        else setCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCourses();
  }, []);
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white mt-32 py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand & Brief */}
        <div>
          <Link
            to="/"
            aria-label="Homepage"
            className="text-2xl font-bold mb-3 inline-block hover:text-cyan-300"
          >
            <img src={Logo} alt="Fischerbon LMS" />
          </Link>
          <p className="text-sm text-cyan-200 max-w-xs">
            Learn AutoCAD and CAD fundamentals with expert guidance. Build
            skills, earn certificates, and transform your career.
          </p>
        </div>

        {/* Courses */}
        <nav aria-label="Courses" className="space-y-3">
          <h3 className="font-semibold text-lg mb-3 border-b border-cyan-400 pb-2">
            Courses
          </h3>
          <ul className="list-disc list-inside">
            {courses.map((course) => (
              <li key={course._id}>
                <Link
                  to={`/courses/${course.slug}`}
                  className="hover:text-cyan-300"
                >
                  {course.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Resources */}
        <nav aria-label="Resources" className="space-y-3">
          <h3 className="font-semibold text-lg mb-3 border-b border-cyan-400 pb-2">
            Resources
          </h3>
          <ul className="">
            <li>
              <Link to="/profile" className="hover:text-cyan-300">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-cyan-300">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-cyan-300">
                Support
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-cyan-300">
                FAQs
              </Link>
            </li>
          </ul>
        </nav>

        {/* Legal & About */}
        <nav aria-label="Legal and About" className="space-y-3">
          <h3 className="font-semibold text-lg mb-3 border-b border-cyan-400 pb-2">
            About & Legal
          </h3>
          <ul>
            <li>
              <Link to="/about" className="hover:text-cyan-300">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-cyan-300">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-cyan-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-cyan-300">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div
        className="fixed right-0 bottom-0 cursor-pointer z-10 bg-blue-400 p-2 rounded-full text-white hover:bg-blue-500"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowBigUp size={24} />
      </div>
      <div className="mt-12 border-t border-cyan-400 pt-6 text-center text-cyan-300 text-sm">
        © {new Date().getFullYear()} AutoCAD LMS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
