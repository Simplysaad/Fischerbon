'use client';
import { usePathname } from 'next/navigation';
import { navItems } from './Sidebar';
import { Notification } from 'iconsax-reactjs';

const Header = () => {
  const pathname = usePathname();
  const currentNavItem = navItems.find((item) => item.link === pathname);
  return (
    <header className="bg-[#F1F2F3] w-full z-10 px-5 h-[80px] rounded-lg">
      <div className="flex items-center justify-between h-full">
        <div>
          <h4 className="text-xl font-medium text-[#2F3437]">
            {currentNavItem ? currentNavItem.name : 'Page'}
          </h4>
          <p className="text-[#919BA1] text-sm">
            {currentNavItem ? currentNavItem.tag : 'Welcome to your dashboard'}
          </p>
        </div>
        <div className="flex items-center gap-5 ">
          <div className="flex items-center justify-center rounded-full w-[45px] h-[45px] bg-[#F0E8ED] p-1">
            <Notification size="24" color="#6B184C" />
          </div>
          <div className="flex items-center gap-2">
            <img
              src={'https://randomuser.me/api/portraits/men/40.jpg'}
              alt="User-Profile"
              className="w-[45px] h-[45px] rounded-full"
            />
            <div>
              <h6 className="text-[#2F3437] font-medium leading-5 text-sm">
                Ololade Kareem
              </h6>
              <p className="text-[#ACB4B9] text-sm">Ololadekareem@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
