import React, { useState } from 'react';
import heroImage from '../../assets/autocadImage.jpg';
const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    e.preventDefault();
    if (!email) return;
    // Here you can add real submission logic such as calling an API
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="bg-gray-50 font-sans text-gray-900 min-h-screen flex flex-col">
      {/* Hero / Banner Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Unlock Your CAD Potential
              <br />
              With Industry-Ready Skills
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-md mx-auto md:mx-0">
              Flexible AutoCAD and CAD courses designed by experts — master
              design, drafting, and modeling skills. Get certified, get hired!
            </p>
            <button
              className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
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
              alt="Person working on CAD design"
              className="rounded-xl shadow-lg mx-auto max-w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-white flex-grow">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our LMS?
        </h2>
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-16 w-16 text-blue-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l6.16-3.422A12.083 12.083 0 0118 19.947V20a2 2 0 11-4 0v-1a12.086 12.086 0 01-2-4.132z"
              />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
            <p>
              Access courses anytime, anywhere, and learn at your own pace —
              perfect for busy professionals.
            </p>
          </div>

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-16 w-16 text-blue-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 10h4.556M13 16H9v-4M7 20h10a2 2 0 002-2v-6a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
            <p>
              Learn from industry veterans who bring real-world experience and
              hands-on training.
            </p>
          </div>

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-16 w-16 text-blue-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 17v-2a4 4 0 014-4h0a4 4 0 014 4v2m-8 0H5a2 2 0 00-2 2v1a3 3 0 006 0v-1a2 2 0 00-2-2z"
              />
            </svg>
            <h3 className="text-xl font-semibold mb-2">
              Industry Certifications
            </h3>
            <p>
              Earn recognized certificates that showcase your skills and boost
              your career opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            What Our Learners Say
          </h2>
          <div className="space-y-10">
            <blockquote className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-lg italic mb-4">
                "This platform transformed my CAD skills completely. The expert
                guidance and flexible schedule made learning enjoyable and
                effective."
              </p>
              <footer className="text-right font-semibold text-blue-700">
                — Amina T., Drafting Specialist
              </footer>
            </blockquote>

            <blockquote className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-lg italic mb-4">
                "The certification I earned helped me land my dream job. Highly
                recommend to anyone serious about CAD mastery."
              </p>
              <footer className="text-right font-semibold text-blue-700">
                — David M., Mechanical Designer
              </footer>
            </blockquote>

            <blockquote className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-lg italic mb-4">
                "Learning AutoCAD with such a user-friendly LMS and expert
                instructors saved me months of struggle."
              </p>
              <footer className="text-right font-semibold text-blue-700">
                — Linh N., Architecture Intern
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Wait-list Signup Section */}
      <section className="max-w-2xl mx-auto px-6 py-16 bg-white rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6">
          Get Early Access - Join Our Wait-List
        </h2>
        <p className="text-center mb-8 text-gray-700">
          Be the first to enroll and get exclusive updates about course
          launches, special discounts, and more.
        </p>
        {submitted && (
          <p className="mb-6 text-center text-green-600 font-semibold">
            Thank you for joining the wait-list! We will notify you by email.
          </p>
        )}
        <form
          id="waitlist-form"
          className="flex flex-col sm:flex-row gap-4 justify-center"
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            id="waitlist-form-email"
            type="email"
            required
            placeholder="Enter your email address"
            className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Email address for wait-list signup"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            aria-label="Submit email to join wait-list"
          >
            Join Wait-List
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="mt-16 py-8 bg-gray-100 text-center text-gray-600 text-sm select-none">
        &copy; {new Date().getFullYear()} FISCHERBON inc. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
