import React from 'react';
import { Menu } from 'lucide-react';
import { navItems } from './AdminSidebar';

const AdminHeader = ({ onClick }) => {
  let pathname = window.location.pathname;

  const currentNavItem =
    navItems.some((item) => item.link === pathname.trim()) &&
    navItems.find((item) => item.link === pathname.trim());

  let img = true;
  let name = 'Abdulqoyum Amuda';

  const TopHeader = ({ mode }) => {
    return (
      <div
        className={`flex justify-between ${mode === 'desktop' ? 'gap-3' : 'w-full'} items-center`}
      >
        <h4 className="text-lg font-medium text-dark">
          Engr Iskil Ismail - <span className="font-bold">Admin</span>
        </h4>

        <div className="flex items-center ">
          <div className="size-10 bg-primary text-white font-bold justify-center rounded-full flex items-center text-center hover:bg-primaryHover">
            {name.split(' ')[0][0].toUpperCase()}
            {name.split(' ')[1][0].toUpperCase()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <header className="*:mt-1">
      <div className="my-1 px-5 md:hidden flex">
        <TopHeader mode="mobile" />
      </div>

      <div className="bg-[#F1F2F3] p-3 rounded-md mx-3 md:mx-0 flex justify-between items-center">
        <h4 className="text-xl text-dark font-semibold">
          {currentNavItem && currentNavItem.name}
        </h4>

        <div className="px-5 md:flex hidden">
          <TopHeader mode="desktop" />
        </div>

        <div onClick={onClick} className="md:hidden flex">
          <Menu />
        </div>
      </div>

      {currentNavItem.subTag && (
        <>
          {' '}
          <div className="md:mx-3 mx-5 mt-1.5">
            <div className="flex gap-3 items-center">
              <div className="bg-primary size-2 rounded-full" />
              <p className="text-dark font-serif text-sm md:text-md">
                {currentNavItem.subTag}
              </p>
            </div>
          </div>
          <hr className="bg-secondary h-0.5 text-secondary md:mx-1 mx-3 rounded-md mt-1" />
        </>
      )}
    </header>
  );
};

export default AdminHeader;
