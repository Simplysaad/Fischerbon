'use client';
import {
  DocumentText1,
  Element4,
  Folder,
  LogoutCurve,
  Messages1,
  Setting2,
  User,
} from 'iconsax-reactjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const navItems = [
  {
    name: 'Dashboard',
    icon: Element4,
    link: '/dashboard',
    tag: 'Overview of your IP Submission',
  },
  {
    name: 'Submissions',
    icon: DocumentText1,
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
    icon: Messages1,
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
    icon: Setting2,
    link: '/settings',
    tag: 'Manage all your intellectual property submissions.',
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="bg-[#F1F2F3] text-[#919BA1] w-[20rem] h-screen overflow-y-auto flex flex-col px-3 pt-4 pb-4 no-scrollbar ml-4 rounded-lg">
        <Image
          src="/images/logo.svg"
          alt="Iphive-Logo"
          width={125}
          height={51}
        />
        <div className="flex-grow">
          <div className="flex flex-col space-y-4 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.link;

              return (
                <Link
                  href={item.link}
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
            href="/login"
            className="  flex items-center space-x-2 py-3 px-5 rounded-full text-sm font-normal leading-6"
          >
            <LogoutCurve className="rotate-180" size="22" variant="Outline" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
