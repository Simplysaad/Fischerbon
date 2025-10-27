import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Hero from '../../Components/Hero';
import { ClipboardList, Layers, UserCheck } from 'lucide-react';
import CourseCard from '../../Components/CourseCard';
import CarouselWrapper from '../../Components/Carousel';
import axiosInstance from '../../utils/axios.util';
import Layout from './Layout';

const Button = ({ children, href, primary }) => (
  <Link
    to={href}
    className={`inline-block font-semibold rounded-md px-6 py-3 transition-colors duration-300 ${
      primary
        ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-blue-500'
        : 'text-blue-500 hover:text-cyan-600'
    }`}
  >
    {children}
  </Link>
);
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
const heros = [
  {
    heading: 'Master AutoCAD Drafting and Design',
    body: 'Unlock your potential with expert-led courses on AutoCAD drafting, 3D modeling, and engineering design. Start your journey today and bring your ideas to life.',
    ctaText: 'Start Learning Now',
    ctaUrl: '#courses',
    image: '/images/white-building-2.jpg',
    trustBadge: 'Trusted by 10,000+ engineers worldwide',
  },
  {
    heading: 'Become a Pro in BIM and Project Management',
    body: "Learn Building Information Modeling with hands-on training and real-world projects. Elevate your career with the industry's most in-demand skills.",
    ctaText: 'Explore BIM Courses',
    ctaUrl: '#courses',
    image: '/images/white-building.jpg',
    testimonial: {
      quote: 'This platform helped me land my dream job in BIM!',
      author: 'Sarah M., Structural Engineer',
    },
  },
  // {
  //   heading: '3D Drawing and PDMS Training Made Easy',
  //   body: 'Master 3D drafting and plant design with our comprehensive PDMS courses specially crafted for engineers and designers.',
  //   ctaText: 'Enroll Today',
  //   ctaUrl: '#courses',
  //   image: '/images/homepage-1.jpg',
  //   highlight: 'Free trial lesson available',
  // },
  {
    heading: 'Learn Engineering Software Anytime, Anywhere',
    body: 'Flexible, self-paced courses on AutoCAD, BIM, and more. Gain practical skills that employers want.',
    ctaText: 'Browse All Courses',
    ctaUrl: '#courses',
    image: '/images/workshop.jpg',
    supportInfo: '24/7 student support included',
  },
  {
    heading: 'From Beginner to Expert: Your Engineering Software Journey',
    body: 'Step-by-step training paths from fundamentals to advanced techniques in drafting and 3D modeling.',
    ctaText: 'Choose Your Path',
    ctaUrl: '#courses',
    image: '/images/cad-on-phone.jpg',
    // guarantee: '30-day money-back guarantee',
  },
];

const Testimonial = ({ quote, author }) => (
  <blockquote className="max-w-3xl mx-auto italic  text-white text-lg sm:text-xl leading-relaxed">
    “{quote}”
    <cite className="block mt-4 font-semibold text-right"> - {author}</cite>
  </blockquote>
);

export default function Homepage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        setError(null);
        const { data: response } = await axiosInstance.get('/courses');
        if (!response.success)
          throw new Error(response.message || 'unable to fetch courses');
        else setCourses(response.data);
      } catch (error) {
        console.error(error);
        setError(error.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  return (
    <Layout>
      <div className="font-sans text-gray-800">
        <CarouselWrapper>
          {heros.map((hero, idx) => (
            <Hero key={idx} hero={hero} />
          ))}
          <Hero
            hero={{
              heading:
                'Master Engineering Drawing with Expert AutoCAD & BIM Courses',
              body: 'Join thousands of students learning real-world skills with step-by-step tutorials and hands-on projects.',
              ctaText: 'Get Started Now',
              ctaUrl: '#courses',
            }}
          />
        </CarouselWrapper>
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
                Learn from seasoned engineers and industry veterans with
                hands-on training.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 px-6">
              <ClipboardList className="text-blue-600 w-14 h-14" />
              <h4 className="text-xl font-semibold">Certified Courses</h4>
              <p>
                Earn recognized certification that opens doors to top
                engineering jobs worldwide.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 px-6">
              <Layers className="text-blue-600 w-14 h-14 rotate-[20deg]" />
              <h4 className="text-xl font-semibold">Flexible & Accessible</h4>
              <p>
                Enjoy 24/7 access with a modern LMS tailored for engineers on
                the go.
              </p>
            </div>
            {/* Suggestion: Add testimonial image grid or student success photos here for personal touch */}
          </div>
        </section>

        {/* Testimonials */}
        <section
          className="bg-gradient-to-r from-cyan-600 to-blue-500 py-16 px-6"
          aria-label="Testimonials"
        >
          <h2 className="text-3xl font-semibold text-white mb-10 text-center">
            What Our Students Say
          </h2>
          <div className="space-y-8">
            <CarouselWrapper>
              {testimonials.map((testimonial, idx) => (
                <Testimonial
                  key={idx}
                  author={testimonial.name + ' - ' + testimonial.jobTitle}
                  quote={testimonial.testimonial}
                />
              ))}
            </CarouselWrapper>
          </div>
        </section>

        <section className="py-36 px-6 min-h-[500px]">
          {/* Featured Courses */}
          {loading && <p className="text-center">Loading courses...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}
          {!loading && !error && courses.length > 0 && (
            <>
              <h2 className="text-3xl font-semibold mb-12 text-center text-cyan-600">
                Featured Courses
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
                {courses.map((course) => (
                  <div key={course._id} className="justify-self-center">
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Final Call to Action */}
        <section className="text-center py-36 px-6">
          <h2 className="text-3xl font-semibold mb-4 text-blue-700">
            Ready to Start Learning?
          </h2>
          <p className="mb-8 text-lg max-w-xl mx-auto text-gray-700">
            Sign up today and gain access to our full course catalog, expert
            instructors, and community support.
          </p>
          <Button href="/signup" primary>
            Join Now
          </Button>
        </section>
      </div>
    </Layout>
  );
}
