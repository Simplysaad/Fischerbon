import { Menu, Search } from 'lucide-react';
import { navItems } from './Sidebar';

const Header = ({ onClick }) => {
  let pathname = window.location.pathname;

  const currentNavItem =
    navItems.some((item) => item.link === pathname.trim()) &&
    navItems.find((item) => item.link === pathname.trim());

  const date = new Date();
  const hours = date.getHours();
  const getHours = (greeting) => {
    if (hours >= 5 && hours < 12) return `${greeting} morning`;
    else if (hours >= 12 && hours < 17) return `${greeting} afternoon`;
    else if (hours >= 17 && hours < 20) return `${greeting} evening`;
    return `${greeting} night`;
  };

  let name = 'Abdulqoyum Amuda';

  const TopHeader = ({ mode }) => {
    return (
      <div
        className={`flex justify-between ${mode === 'desktop' ? 'gap-3' : 'w-full'} items-center`}
      >
        <h4 className="text-lg font-medium text-dark">
          {`${getHours('Good')}, ${'Abdulqoyum'}`}
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
          {(currentNavItem && currentNavItem.name) || 'Dashboard'}
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
        <div className="md:mx-3 mx-5 mt-2 pb-0.5">
          <div className="flex gap-3 items-center">
            <div className="bg-primary size-2 rounded-full" />
            <p className="text-gray text-sm">{currentNavItem.tag}</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
