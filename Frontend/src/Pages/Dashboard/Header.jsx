
import {
  Menu,
} from 'lucide-react';
import { navItems } from './Sidebar';

const Header = ({onClick}) => {

  let pathname = window.location.pathname;

  const currentNavItem = navItems.find((item) => item.link === pathname);

  return (
    <header className="md:space-y-2 pt-3 md:py-0">
      
      <div className='w-full z-10 px-5 h-[50px] rounded-lg flex items-center justify-between'>
          <h4 className="text-lg font-medium text-dark">
            Abdulqoyum Olohuntomi Amuda
          </h4>

          <div className="flex items-center gap-3">
              <img
                src={'https://randomuser.me/api/portraits/men/40.jpg'}
                alt="User-Profile"
                className="w-[45px] h-[45px] rounded-full"
              />
              <div onClick={onClick} className="md:hidden flex">
                <Menu />
              </div>
          </div>
      </div>

      <div className='bg-muted md:py-3.5 md:px-3 p-3 rounded-md mx-3 md:mx-0'>
        <h4 className="text-xl text-[#2F3437] font-semibold">
          {currentNavItem && currentNavItem.name}
        </h4>
      </div>

      <div className='md:mx-3 mx-5 mt-1.5'>
        {currentNavItem.tag && <div className='flex gap-3 items-center'>
          <div className='bg-primary size-3 rounded-full' />
          <h4 className='text-dark leading-6 text-lg font-semibold'>{currentNavItem.tag}</h4>
        </div>}
        {currentNavItem.subTag && <p className='text-gray text-sm'>{currentNavItem.subTag}</p>}
      </div>
      {currentNavItem.subTag && <hr className='bg-secondary h-1 text-secondary md:mx-1 mx-3 rounded-md mt-1'/>}
    </header>
  );
};

export default Header;
