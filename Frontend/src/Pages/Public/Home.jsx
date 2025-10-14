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
import { Link, useLocation } from 'react-router-dom';
import axiosInstance from '../../utils/axios.util';
import CarouselWrapper from '../../Components/Carousel';
import Header from '../../Components/Header';
import Hero from '../../Components/Hero';
import WaitlistForm from '../../Components/waitlistForm';
import PublicLayout from './Layout';

const testimonials = [
  {
    id: 1,
    name: 'Muhammad Yakeen',
    photo: '/images/muhammad_yakeen.jpg', // Placeholder path
    course: 'Piping Design and Drafting using AutoCAD',
    testimonial:
      'I was amazed by Engineer Iskeel’s teaching style. He connects lessons to real engineering scenarios, shares career advice, and ensures students gain knowledge and direction. His classes are engaging, practical, and inspiring. Under his guidance, I learned 2D and 3D drawing fundamentals, which reshaped my career outlook as a mechanical engineering student.',
    jobTitle: 'Mechanical Engineering Student, OAU ILE-IFE',
  },
  {
    id: 2,
    name: 'Eniola Fátima Aliru',
    photo: '/images/eniola_fatima_aliru.jpg', // Placeholder path
    course: 'AutoCAD & Engineering Drafting',
    testimonial:
      'This training was more than just learning; it was a life-changing experience. The instructor, Engr. Iskeel, is more than a teacher — he is a listener and a guardian, attentive to details, making the learning deeply inspiring and practical.',
    jobTitle: 'Aspiring Architect, University of Nigeria Nsukka',
  },
  {
    id: 3,
    name: 'Aminah Alabi',
    photo: '/images/aminah_alabi.jpg', // Placeholder path
    course: 'Autodesk AutoCAD',
    testimonial:
      'Engr. Iskeel demonstrated exceptional patience and dedication. His teaching was interactive, with hands-on exercises and real-world examples, making complex concepts easy. His passion and expertise created a supportive environment which motivated me to learn and improve. I’m now proficient in AutoCAD 2D and 3D design.',
    jobTitle: 'MME Graduate, FUTA',
  },
  {
    id: 4,
    name: 'Fareedah Fadahunsi',
    photo: '/images/fareedah_fadahunsi.jpg', // Placeholder path
    course: 'AutoCAD Training',
    testimonial:
      'Engr Iskeel ensured I understood even difficult diagrams. The training taught me 2D and 3D AutoCAD design. I highly recommend Engr Iskeel to anyone looking for an AutoCAD instructor.',
    jobTitle: 'Young School Leaver, University Aspirant',
  },
];

const Testimonial = ({ id, name, testimonial, jobTitle }) => {
  return (
    <blockquote className="bg-white p-8 rounded-lg shadow-md italic text-gray-800">
      <p>"{testimonial}"</p>
      <footer className="text-right font-semibold text-blue-700 mt-4">
        — {name}, {jobTitle}
      </footer>
    </blockquote>
  );
};

const LandingPage = () => {
  const heros = [
    {
      heading: 'Master AutoCAD Drafting and Design',
      body: 'Unlock your potential with expert-led courses on AutoCAD drafting, 3D modeling, and engineering design. Start your journey today and bring your ideas to life.',
      ctaText: 'Start Learning Now',
      ctaUrl: '/courses/autocad',
      image: '/images/hero-autocad.png',
      trustBadge: 'Trusted by 10,000+ engineers worldwide',
    },
    {
      heading: 'Become a Pro in BIM and Project Management',
      body: "Learn Building Information Modeling with hands-on training and real-world projects. Elevate your career with the industry's most in-demand skills.",
      ctaText: 'Explore BIM Courses',
      ctaUrl: '/courses/bim',
      image: '/images/hero-bim.png',
      testimonial: {
        quote: 'This platform helped me land my dream job in BIM!',
        author: 'Sarah M., Structural Engineer',
      },
    },
    {
      heading: '3D Drawing and PDMS Training Made Easy',
      body: 'Master 3D drafting and plant design with our comprehensive PDMS courses specially crafted for engineers and designers.',
      ctaText: 'Enroll Today',
      ctaUrl: '/courses/pdms',
      image: '/images/hero-pdms.png',
      highlight: 'Free trial lesson available',
    },
    {
      heading: 'Learn Engineering Software Anytime, Anywhere',
      body: 'Flexible, self-paced courses on AutoCAD, BIM, PDMS, and more. Gain practical skills that employers want.',
      ctaText: 'Browse All Courses',
      ctaUrl: '/courses',
      image: '/images/hero-flexible-learning.png',
      supportInfo: '24/7 student support included',
    },
    {
      heading: 'From Beginner to Expert: Your Engineering Software Journey',
      body: 'Step-by-step training paths from fundamentals to advanced techniques in drafting and 3D modeling.',
      ctaText: 'Choose Your Path',
      ctaUrl: '/learning-paths',
      image: '/images/hero-pathway.png',
      guarantee: '30-day money-back guarantee',
    },
  ];

  return (
    <PublicLayout
      header="landing"
      className="min-h-screen flex flex-col font-sans text-gray-900 bg-gray-50"
    >
      {/* // Hero Section */}
      <section id="home" className="">
        <CarouselWrapper>
          {heros.map((hero) => (
            <Hero hero={hero} />
          ))}
        </CarouselWrapper>
      </section>
      {/* What We Teach - Features */}
      <section
        id="what"
        className="bg-white py-20 my-20 px-6 max-w-7xl mx-auto"
      >
        <h3 className="text-4xl font-bold text-center text-blue-700 mb-14">
          What You'll Learn at FischerBon
        </h3>
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center space-y-4 px-8">
            <FileText className="text-blue-600 w-16 h-16" />
            <h4 className="text-2xl font-semibold">CAD Drafting & Design</h4>
            <p className="text-gray-700">
              Comprehensive AutoCAD 2D and 3D, PDMS and engineering drawings
              training.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 px-8">
            <Layers className="text-blue-600 w-16 h-16" />
            <h4 className="text-2xl font-semibold">3D Modeling & BIM</h4>
            <p className="text-gray-700">
              Master Building Information Modeling using Revit, Navisworks, and
              more.
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
      <section
        id="why"
        className="bg-cyan-50 my-32 py-20 px-6 max-w-7xl mx-auto"
      >
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
      <section
        id="testimonials"
        className="bg-gradient-to-r from-cyan-50 to-blue-50 py-16 px-6 max-w-4xl mx-auto rounded-xl"
      >
        <h3 className="text-center text-3xl font-bold text-blue-700 mb-8">
          Hear From Our Learners
        </h3>
        <div className="space-y-8">
          <CarouselWrapper>
            {testimonials.map((testimonial) => (
              <Testimonial
                key={testimonial.id}
                name={testimonial.name}
                testimonial={testimonial.testimonial}
                jobTitle={testimonial.jobTitle}
              />
            ))}
          </CarouselWrapper>
        </div>
        {/* Suggestion: Add a student photo carousel below quotes to enhance authenticity */}
      </section>
      {/* Wait-list Sign Up (Main CTA) */}
      <WaitlistForm />
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
      {/* </div> */}
    </PublicLayout>
  );
};

export default LandingPage;
