import React, { useState, useMemo } from 'react';
import CourseCard from '../../Components/CourseCard';
import Hero from '../../Components/Hero';
import Header from '../../Components/Header';
import PublicLayout from './Layout';

const levels = ['all', 'beginner', 'intermediate', 'advanced'];
const sampleCourses = [
  {
    _id: 1,
    title: 'AutoCAD Beginner Fundamentals',
    description: 'Learn the basics of AutoCAD with hands-on projects.',
    duration: '6 weeks',
    level: 'Beginner',
    certified: true,
    image: 'https://via.placeholder.com/400x240?text=AutoCAD+Beginner',
  },
  {
    _id: 2,
    title: 'Advanced CAD Modeling Techniques',
    description: 'Master advanced 3D modeling and design workflows.',
    duration: '8 weeks',
    level: 'Advanced',
    certified: true,
    image: 'https://via.placeholder.com/400x240?text=Advanced+CAD',
  },
  {
    _id: 3,
    title: 'Revit Essentials for Architects',
    description: 'Architectural BIM design fundamentals using Revit.',
    duration: '5 weeks',
    level: 'Intermediate',
    certified: false,
    image: 'https://via.placeholder.com/400x240?text=Revit+Essentials',
  },
  {
    _id: 4,
    title: 'AutoCAD Beginner Fundamentals',
    description:
      'Learn the basics of AutoCAD from scratch with hands-on lessons.',
    price: 0,
    payment: 'free',
    category: 'AutoCAD',
    level: 'beginner',
    thumbnailUrl: 'https://via.placeholder.com/400x240?text=AutoCAD+Beginner',
    ratings: [{ rating: 4 }, { rating: 5 }, { rating: 4 }],
  },
  {
    _id: 5,
    title: 'Advanced CAD Modeling',
    description: 'Master complex 3D modeling techniques and workflows.',
    price: 199,
    payment: 'paid',
    category: 'CAD',
    level: 'advanced',
    thumbnailUrl: 'https://via.placeholder.com/400x240?text=Advanced+CAD',
    ratings: [{ rating: 5 }, { rating: 5 }, { rating: 4 }, { rating: 5 }],
  },
  {
    title: 'Revit for Intermediate Architects',
    description: 'BIM fundamentals and project workflows using Revit.',
    _id: 6,
    price: 99,
    payment: 'paid',
    category: 'Revit',
    level: 'intermediate',
    thumbnailUrl: 'https://via.placeholder.com/400x240?text=Revit+Intermediate',
    ratings: [],
  },
  // Add more courses here...
];
const CoursesPage = () => {
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [expandSearch, setExpandSearch] = useState(false);

  const filteredCourses = useMemo(() => {
    return sampleCourses.filter((course) => {
      const matchesLevel =
        selectedLevel === 'all' || course.level === selectedLevel;
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase());
      return matchesLevel && matchesSearch;
    });
  }, [search, selectedLevel]);

  return (
    <PublicLayout
      hero={{
        heading: 'Unlock Your CAD Potential, Explore Our Expert Courses',
        body: 'Learn AutoCAD, Revit, and CAD design skills with industry-recognized certification and hands-on projects.',
        ctaText: 'Enroll now',
        ctaUrl: '/courses/123',
      }}
    >
      {/* Filter/Search Section */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex  md:flex-row items-center justify-between gap-6 mb-8">
          <input
            type="search"
            placeholder="Search courses..."
            className="px-5 py-3 rounded-lg border border-gray-300 shadow-sm w-full md:w-96 focus:border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            value={search}
            onFocus={() => setExpandSearch(true)}
            onBlur={() => setExpandSearch(false)}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search courses"
          />
          <select
            className={`${expandSearch ? 'hidden' : ''} px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition`}
            aria-label="Filter by level"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.length === 0 ? (
            <p className="text-center col-span-full text-gray-600">
              No courses found.
            </p>
          ) : (
            filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

export default CoursesPage;
