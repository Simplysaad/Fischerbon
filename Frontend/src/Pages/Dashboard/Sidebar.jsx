
import {
  User,
  X,
  Home,
  BookOpen,
  Puzzle,
  Shapes,
  LogOut,
} from 'lucide-react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';

const date = new Date();
const hours = date.getHours();
const getHours = (greeting) => {
  if(hours >= 5 && hours < 12)
    return `${greeting}morning`
  else if(hours >=12 && hours < 17)
    return `${greeting}afternoon`
  else if(hours >=17 && hours < 20)
    return `${greeting}evening`
  return `${greeting}night`
};

export const navItems = [
  {
    name: 'Dashboard',
    icon: Home,
    link: '/dashboard',
    tag: `${getHours("Good ")}, Abdulqoyum`,
    subTag: `What would you like to do this ${getHours("")}?`
  },
  {
    name: 'Courses',
    icon: BookOpen,
    link: '/courses',
    tag: `Your Courses`,
    subTag: `You're making progress, continue watching all your registered lessons from here`
  },
  {
    name: 'Challenges',
    icon: Puzzle,
    link: '/challenges',
    tag: `Enter a new challenge`,
    subTag: `Hands-on exercises to practice your CAD skills`
  },
  {
    name: 'Quizzes',
    icon: Shapes,
    link: '/quizzes',
    tag: `It's quiz time`,
    subTag: `Take a  quiz on your drawing knowledge and see how much you'll score`
  },
  {
    name: 'Profile',
    icon: User,
    link: '/profile',
    tag: `Your Profile`,
    subTag: `You can view and edit your personal information from here`
  },
];

const Sidebar = ({onClick}) => {

  const pathname = window.location.pathname;

  return (
    <>
      <div className="bg-[#F1F2F3] w-[15rem] md:animate-none animate-navBar h-screen overflow-y-auto flex flex-col px-3 pt-4 pb-4 no-scrollbar md:ml-4 rounded-lg">
        <section className='flex justify-between items-center'>
          <img
            src={logo}
            alt="Fischerbon-Logo"
            width={150}
            height={50}
          />
          <div onClick={onClick} className='md:hidden flex'>
            <X />
          </div>
        </section>
        
        <div className="flex-grow mt-1.5">
          <div className="flex flex-col space-y-2 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.link;
              return (
                <span onClick={window.innerWidth < 768 && onClick}><Link
                  to={item.link}
                  key={item.name}
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
                  <Icon className="" size="22" variant="Outline" />
                  <span>{item.name}</span>
                </Link>
                </span>
              );
            })}
          </div>
        </div>
        <div>
          <Link
            to="/login"
            className="hover:animate-pulse flex items-center space-x-2 py-3 px-5 rounded-full text-sm font-normal leading-6"
          >
            <LogOut  size="22" variant="Outline" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
