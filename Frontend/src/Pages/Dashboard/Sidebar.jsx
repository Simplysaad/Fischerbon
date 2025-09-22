
import {
  Settings,
  Folder,
  User,
} from 'lucide-react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';


export const navItems = [
  {
    name: 'Dashboard',
    icon: Settings,
    link: '/dashboard',
    tag: 'Overview of your IP Submission',
  },
  {
    name: 'Courses',
    icon: Settings,
    link: '/submissions',
    tag: 'Manage all your intellectual property submissions.',
  },
  {
    name: 'Documents & Milestones',
    icon: Folder,
    link: '/documents',
    tag: 'Manage all your intellectual property submissions.',
  },
  {
    name: 'Messages',
    icon: Settings,
    link: '/messages',
    tag: 'Manage all your intellectual property submissions.',
  },
  {
    name: 'Profile',
    icon: User,
    link: '/profile',
    tag: 'Manage all your intellectual property submissions.',
  },
  {
    name: 'Settings',
    icon: Settings,
    link: '/settings',
    tag: 'Manage all your intellectual property submissions.',
  },
];

const Sidebar = () => {
  return (
    <>
      <div className="bg-[#F1F2F3] text-[#919BA1] w-[20rem] h-screen overflow-y-auto hidden md:flex flex-col px-3 pt-4 pb-4 no-scrollbar ml-4 rounded-lg">
        <img
          src={logo}
          alt="Fischerbon-Logo"
          width={150}
          height={50}
        />
        <div className="flex-grow">
          <div className="flex flex-col space-y-4 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              // const isActive = pathname === item.link;
              const isActive = true;

              return (
                <Link
                  to={item.link}
                  key={item.name}
                  className={`
                    flex items-center space-x-2 py-3 px-5 rounded-full text-sm font-normal leading-6 
                    transition-all duration-300 ease-in-out
                    ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'hover:bg-[#300B22] hover:text-white'
                    }
                  `}
                >
                  <Icon className="" size="22" variant="Outline" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <Link
            to="/login"
            className="  flex items-center space-x-2 py-3 px-5 rounded-full text-sm font-normal leading-6"
          >
            <Settings className="rotate-180" size="22" variant="Outline" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
