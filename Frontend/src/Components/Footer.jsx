import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand & Brief */}
        <div>
          <Link
            to="/"
            aria-label="Homepage"
            className="text-2xl font-bold mb-3 inline-block hover:text-cyan-300"
          >
            AutoCAD LMS
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
          <ul>
            <li>
              <Link to="/courses/1" className="hover:text-cyan-300">
                AutoCAD Beginner Fundamentals
              </Link>
            </li>
            <li>
              <Link to="/courses/2" className="hover:text-cyan-300">
                Advanced CAD Modeling
              </Link>
            </li>
            {/* Add additional course links here */}
          </ul>
        </nav>

        {/* Resources */}
        <nav aria-label="Resources" className="space-y-3">
          <h3 className="font-semibold text-lg mb-3 border-b border-cyan-400 pb-2">
            Resources
          </h3>
          <ul>
            <li>
              <Link to="/profile" className="hover:text-cyan-300">
                Your Profile
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

      <div className="mt-12 border-t border-cyan-400 pt-6 text-center text-cyan-300 text-sm">
        © {new Date().getFullYear()} AutoCAD LMS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
