import { X } from 'lucide-react';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, activeHref, navItems }) => {
  navItems?.forEach((item) => {
    item.isActive = item.href === activeHref;
  });

  return (
    <nav
      className={` transition-all duration-200 z-30 fixed ${isSidebarOpen ? 'lg:w-[20%] md:w-[30%] w-[100%] px-2 py-4' : 'w-0 p-0 m-0'} opacity-90 md:hidden min-h-screen overflow-y-scroll bg-white  flex flex-col  items-start`}
    >
      <button
        className="md:hidden self-end mb-4 p-2 rounded-md hover:bg-gray-200 transition-colors"
        onClick={(e) => {
          setIsSidebarOpen((prev) => !prev);
        }}
      >
        <X size={24} />
      </button>

      <ul className="px-2  w-full py-6 flex flex-col gap-3">
        {navItems?.map(({ icon: Icon, label, href, isActive }, idx) => (
          <li key={idx} className="">
            <a
              href={href}
              className={`flex items-center gap-3 py-2 px-4 rounded-lg ${isActive ? 'bg-blue-100' : ''} overflow-hidden text-nowrap transition-colors w-full `}
            >
              <Icon />
              <span className="">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
