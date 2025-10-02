import {
  User,
  X,
  Home,
  BookOpen,
  Puzzle,
  LogOut,
  ArrowRight,
  ArrowDown,
  Lock,
} from 'lucide-react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const navItems = [
  {
    name: 'Dashboard',
    icon: Home,
    link: '/dashboard',
    tag: `What would you like to do now?`,
  },
  {
    name: 'Courses',
    icon: BookOpen,
    link: '/enrollment',
    label: 'Continue Learning',
    description: `You've completed ${2} lessons in the last ${5} weeks`,
    button: 'Continue Learning',
    dropdown: [
      {
        course: 'Introduction to AutoCAD',
        status: 'open',
        lessons: [],
      },
      {
        course: '2D Drawing',
        status: 'open',
        lessons: [],
      },
      {
        course: '3D Drawing',
        status: 'open',
        lessons: [],
      },
      {
        course: 'Isometric Projection',
        status: 'closed',
        lessons: [],
      },
      {
        course: 'Oblique Projection',
        status: 'closed',
        lessons: [],
      },
      {
        course: 'Orthographic Projection 1',
        status: 'closed',
        lessons: [],
      },
      {
        course: 'Orthographic Projection 2',
        status: 'closed',
        lessons: [],
      },
      {
        course: 'Orthographic Projection 3',
        status: 'closed',
        lessons: [],
      },
      {
        course: 'Exam & Certification',
        status: 'closed',
        lessons: [],
      },
    ],
  },
  {
    name: 'Challenges',
    icon: Puzzle,
    link: '/challenges',
    label: 'Enter a Challenge',
    description: `Take up a new Challenge`,
    button: 'Enter Challenge',
  },
  {
    name: 'Profile',
    icon: User,
    link: '/profile',
    tag: `You can view and edit your personal information from here`,
  },
];

const Sidebar = ({ onClick }) => {
  const pathname = window.location.pathname;
  let lastVisitedCourse = 'Introduction to AutoCAD';
  const [currentCourse, setCurrentCourse] = useState(lastVisitedCourse);
  const [showCourses, setShowCourses] = useState(true);
  const [arrow, setArrow] = useState(showCourses ? 'down' : 'right');

  const arrowMap = {
    right: ArrowRight,
    down: ArrowDown,
  };

  return (
    <>
      <div className="bg-[#F1F2F3] w-[15rem] md:animate-none animate-navBar h-screen overflow-y-auto flex flex-col px-3 pt-4 pb-4 no-scrollbar md:ml-4 rounded-lg">
        <section className="flex justify-between items-center">
          <img src={logo} alt="Fischerbon-Logo" width={150} height={50} />
          <div onClick={onClick} className="md:hidden flex">
            <X />
          </div>
        </section>

        <div className="flex-grow mt-1.5">
          <div className="flex flex-col space-y-3 py-4">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname.includes(item.link);
              const Arrow = isActive ? arrowMap[arrow] : ArrowRight;

              return (
                <div key={index}>
                  <Link
                    to={`${item.link}`}
                    key={item.link}
                    className={`
                    flex items-center space-x-2 py-2 px-5 w-3/4 rounded-full text-sm font-normal leading-6 
                    transition-all duration-300 ease-in-out
                    ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'hover:bg-primaryHover hover:text-white'
                    }
                  `}
                  >
                    <Icon size={20} variant="Outline" />
                    <span>{item.name}</span>
                    <span
                      onClick={() => {
                        setShowCourses(!showCourses);
                        setArrow(arrow === 'right' ? 'down' : 'right');
                      }}
                      title={showCourses ? 'Hide' : 'Show'}
                      className={`text-white`}
                    >
                      {item.dropdown && isActive && (
                        <Arrow size="12" variant="Outline" />
                      )}
                    </span>
                  </Link>

                  {showCourses && item.dropdown && isActive && (
                    <div className="space-y-1.5 mt-3">
                      {item.dropdown.map((course, index) => {
                        return (
                          <Link
                            key={index}
                            to={`/enrollment/${course.course
                              .replace(/\s+/g, '-')
                              .replace(/[^\w-]+/g, '')}`}
                          >
                            <div
                              className={`py-2 px-3 ml-5 flex gap-1 text-[12px] font-sans items-center cursor-pointer  ${course.course === currentCourse ? 'border-l-secondary border-l-3 bg-[hsl(203,11%,85%)] border-white text-dark' : 'hover:text-dark hover:text-[13px] hover:bg-[hsl(203,11%,90%)] duration-150 ease-in-out'}`}
                              onMouseDown={window.innerWidth < 768 && onClick}
                              onClick={() => setCurrentCourse(course.course)}
                            >
                              <span className="text-red-500">
                                {course.status !== 'open' && <Lock size="15" />}
                              </span>

                              <h4>{course.course}</h4>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <Link
            to="/login"
            className="hover:animate-pulse flex items-center space-x-2 py-3 px-5 rounded-full text-sm font-normal leading-6"
          >
            <LogOut size="22" variant="Outline" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
