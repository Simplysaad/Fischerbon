import React, { useState } from 'react';
import {
  Menu,
  Layers,
  FileText,
  Truck,
  UserCheck,
  ClipboardList,
} from 'lucide-react';
import heroImage from '../../assets/autocadImage.jpg';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // Submission logic
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-blue-700 select-none">
            FischerBon
          </h1>
          <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <Link to="/courses" className="hover:text-blue-600 transition">
              Courses
            </Link>
            <Link to="/login" className="hover:text-blue-600 transition">
              Login
            </Link>
            <Link to="/signup" className="hover:text-blue-600 transition">
              Sign up
            </Link>
          </nav>
          <button className="md:hidden text-blue-600" aria-label="Open menu">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-24 px-6 md:px-20 flex flex-col md:flex-row items-center gap-14 max-w-7xl mx-auto">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-5xl font-extrabold leading-tight mb-6">
            Master Engineering Drafting & Design Skills
          </h2>
          <p className="text-xl mb-8 max-w-lg">
            Expert-led courses in PDMS, AutoCAD, BIM, piping 3D, and all major
            engineering drafting software. Learn flexible, industry-ready skills
            designed to launch your career.
          </p>
          <button
            className="bg-white text-blue-700 font-semibold px-10 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition"
            onClick={() =>
              document.getElementById('waitlist-form-email')?.focus()
            }
            aria-label="Join wait-list for early access"
          >
            Join the Wait-List
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src={heroImage}
            alt="Engineer designing with CAD software"
            className="rounded-xl shadow-2xl mx-auto max-w-full"
          />
          {/* Future suggestion: add a small carousel or video preview here */}
        </div>
      </section>

      {/* What We Teach - Features */}
      <section className="bg-white py-20 px-6 max-w-7xl mx-auto">
        <h3 className="text-4xl font-bold text-center text-blue-700 mb-14">
          What You’ll Learn at FischerBon
        </h3>
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center space-y-4 px-8">
            <Layers className="text-blue-600 w-16 h-16" />
            <h4 className="text-2xl font-semibold">3D Modeling & BIM</h4>
            <p className="text-gray-700">
              Master Building Information Modeling using Revit, Navisworks, and
              more.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 px-8">
            <FileText className="text-blue-600 w-16 h-16" />
            <h4 className="text-2xl font-semibold">CAD Drafting & Design</h4>
            <p className="text-gray-700">
              Comprehensive AutoCAD, PDMS, piping, and engineering drawings
              training.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 px-8">
            <Truck className="text-blue-600 w-16 h-16" />
            <h4 className="text-2xl font-semibold">Piping & Plant Design</h4>
            <p className="text-gray-700">
              Learn piping design and layout in 3D for oil, gas, and chemical
              industries.
            </p>
          </div>
          {/* Suggestion: add images or diagrams related to these topics nearby */}
        </div>
      </section>

      {/* Why FischerBon Section */}
      <section className="bg-cyan-50 py-20 px-6 max-w-7xl mx-auto">
        <h3 className="text-4xl font-bold text-center text-blue-700 mb-14">
          Why Choose FischerBon LMS?
        </h3>
        <div className="grid md:grid-cols-3 gap-14 text-center text-gray-800">
          <div className="flex flex-col items-center space-y-3 px-6">
            <UserCheck className="text-blue-600 w-14 h-14" />
            <h4 className="text-xl font-semibold">Expert Instructors</h4>
            <p>
              Learn from seasoned engineers and industry veterans with hands-on
              training.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-3 px-6">
            <ClipboardList className="text-blue-600 w-14 h-14" />
            <h4 className="text-xl font-semibold">Certified Courses</h4>
            <p>
              Earn recognized certification that opens doors to top engineering
              jobs worldwide.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-3 px-6">
            <Layers className="text-blue-600 w-14 h-14 rotate-[20deg]" />
            <h4 className="text-xl font-semibold">Flexible & Accessible</h4>
            <p>
              Enjoy 24/7 access with a modern LMS tailored for engineers on the
              go.
            </p>
          </div>
          {/* Suggestion: Add testimonial image grid or student success photos here for personal touch */}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-blue-50 py-16 px-6 max-w-4xl mx-auto rounded-xl">
        <h3 className="text-center text-3xl font-bold text-blue-700 mb-8">
          Hear From Our Learners
        </h3>
        <div className="space-y-8">
          <blockquote className="bg-white p-8 rounded-lg shadow-md italic text-gray-800">
            <p>
              "FischerBon's PDMS and piping courses gave me the real-world
              skills I needed to excel. The flexible schedule and expert
              teachers made all the difference."
            </p>
            <footer className="text-right font-semibold text-blue-700 mt-4">
              — Chinedu A., Piping Designer
            </footer>
          </blockquote>
          <blockquote className="bg-white p-8 rounded-lg shadow-md italic text-gray-800">
            <p>
              "Completing the BIM training transformed my workflow. The LMS is
              so intuitive and the instructors are always supportive."
            </p>
            <footer className="text-right font-semibold text-blue-700 mt-4">
              — Fatima S., BIM Coordinator
            </footer>
          </blockquote>
          <blockquote className="bg-white p-8 rounded-lg shadow-md italic text-gray-800">
            <p>
              "Thanks to FischerBon, I advanced from basic AutoCAD knowledge to
              certified professional within months."
            </p>
            <footer className="text-right font-semibold text-blue-700 mt-4">
              — Michael O., Mechanical Engineer
            </footer>
          </blockquote>
        </div>
        {/* Suggestion: Add a student photo carousel below quotes to enhance authenticity */}
      </section>

      {/* Wait-list Sign Up (Main CTA) */}
      <section className="bg-white max-w-2xl mx-auto rounded-lg shadow-lg border border-gray-300 my-20 px-8 py-16 text-center">
        <h3 className="text-3xl font-bold text-blue-700 mb-6">
          Get Early Access - Join Our Wait-List
        </h3>
        <p className="mb-8 text-gray-700 max-w-prose mx-auto">
          Sign up now to secure your spot in our upcoming courses and receive
          exclusive updates, discounts, and free resources.
        </p>
        {submitted && (
          <p className="mb-6 text-green-600 font-semibold">
            Thank you for joining the wait-list! We will notify you by email.
          </p>
        )}
        <form
          id="waitlist-form"
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            id="waitlist-form-email"
            type="email"
            required
            placeholder="Enter your email address"
            aria-label="Email address to join wait-list"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-auto px-5 py-3 border border-gray-400 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold rounded-lg px-10 py-3 hover:bg-blue-700 transition"
            aria-label="Join wait-list"
          >
            Join Wait-List
          </button>
        </form>
      </section>

      {/* Future Launch CTA (commented for now) */}
      {/* 
      <section className="bg-blue-600 text-white py-20 text-center">
        <h3 className="text-4xl font-extrabold max-w-4xl mx-auto mb-6"> 
          Explore Full Course Access & Premium Features When We Launch
        </h3>
        <p className="max-w-xl mx-auto mb-6">
          Access complete course materials, personalized mentoring, project
          reviews, and exclusive community networking.
        </p>
        <button className="bg-white text-blue-600 font-semibold px-12 py-4 rounded-lg shadow hover:bg-gray-100 transition">
          Learn More
        </button>
      </section> */}

      {/* Footer */}
      <footer className="bg-gray-100 py-8 text-center text-gray-600 select-none text-sm">
        &copy; {new Date().getFullYear()} FISCHERBON inc. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
