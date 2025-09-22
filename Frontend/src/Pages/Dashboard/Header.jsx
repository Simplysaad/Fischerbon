
import {
  Settings,
  Folder,
  Menu,
  User,
} from 'lucide-react';
import { navItems } from './Sidebar';

const Header = () => {
  let pathname = "/dashboard"
  const currentNavItem = navItems.find((item) => item.link === pathname);
  return (
    <header className="">
      <div className='bg-[#F1F2F3] w-full z-10 px-5 h-[80px] rounded-lg'>
      <div className="flex items-center justify-between h-full">

  
                  <h4 className="text-xl font-medium text-[#2F3437]">
                    Welocome, Abdulqoyum
                  </h4>

                  <div className="md:hidden flex">
                    <Menu />
                  </div>


        <div className="flex items-center gap-5 ">
            <img
              src={'https://randomuser.me/api/portraits/men/40.jpg'}
              alt="User-Profile"
              className="w-[45px] h-[45px] rounded-full"
            />
        </div>
      </div>
      </div>
              <div>
                <h4 className="text-xl font-medium text-[#2F3437]">
                  {currentNavItem ? currentNavItem.name : 'Page'}
                </h4>
                <p className="text-[#919BA1] text-sm">
                  {currentNavItem ? currentNavItem.tag : 'Welcome to your dashboard'}
                </p>
              </div>
    </header>
  );
};

export default Header;
