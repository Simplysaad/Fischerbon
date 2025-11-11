import { Menu, Search } from 'lucide-react';
import { navItems } from './Sidebar';

const Header = ({ onClick, name, role }) => {
  let pathname = window.location.pathname;

  let currentNavItem;
  if (navItems.filter((item) => pathname === item.link).length < 1) {
    currentNavItem = navItems[0];
  } else {
    currentNavItem = navItems.find((item) => pathname.includes(item.link));
  }

  const date = new Date();
  const hours = date.getHours();
  const getHours = (greeting) => {
    if (hours >= 5 && hours < 12) return `${greeting} morning`;
    else if (hours >= 12 && hours < 17) return `${greeting} afternoon`;
    else if (hours >= 17 && hours < 20) return `${greeting} evening`;
    return `${greeting} night`;
  };

  const TopHeader = ({ mode }) => {
    return (
      <div
        className={`flex justify-between ${mode === 'desktop' ? 'gap-3' : 'w-full'} items-center`}
      >
        <h4 className="text-lg font-medium text-dark">
          {`${getHours('Good')}, ${name.split(' ')[0]}`}{' '}
          {role === 'admin' && <span className="font-bold"> - Admin</span>}
        </h4>
        <div className="flex items-center">
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

        <div className="flex items-center gap-3 md:hidden">
          <div>
            <Search />
          </div>

          <div onClick={onClick}>
            <Menu />
          </div>
        </div>
      </div>

      {currentNavItem.tag && (
        <>
          {' '}
          <div className="md:mx-3 mx-5 mt-1.5">
            <div className="flex gap-3 items-center">
              <div className="bg-primary size-2 rounded-full opacity-50" />
              <p className="text-dark font-serif text-sm md:text-md">
                {currentNavItem.tag}
              </p>
            </div>
          </div>
          <hr className="bg-secondary h-0.5 text-secondary md:mx-1 mx-3 rounded-md mt-1" />
        </>
      )}
    </header>
  );
};

export default Header;
