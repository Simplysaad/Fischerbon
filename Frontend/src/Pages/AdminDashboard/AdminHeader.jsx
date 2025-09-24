import React from 'react';
import {
  Menu,
} from 'lucide-react';
import { navItems } from './AdminSidebar';

const AdminHeader = ({onClick}) => {

    let pathname = window.location.pathname;
    
    const currentNavItem = navItems.find((item) => item.link === pathname);

    let img = true;
    let name = "Abdulqoyum Amuda"

    return (
        <header className="md:space-y-2 md:py-0">
            <div className='w-full z-10 px-5 h-[50px] rounded-lg flex items-center justify-between'>
                <h4 className="text-lg font-medium text-dark">
                    Engr Iskil Ismail - <span className='font-bold'>Admin</span>
                </h4>

                <div className="flex items-center gap-3">
                    {!img ? <img
                        src={'https://randomuser.me/api/portraits/men/40.jpg'}
                        alt="User-Profile"
                        className="w-[45px] h-[45px] rounded-full"
                    /> 
                    
                    :
                    <div className='size-10 bg-primary text-white font-bold justify-center rounded-full flex items-center text-center hover:bg-primaryHover'>
                        {name.split(" ")[0][0].toUpperCase()}{name.split(" ")[1][0].toUpperCase()}
                    </div>
                    }

                    <div onClick={onClick} className="md:hidden flex">
                        <Menu />
                    </div>
                </div>
            </div>

            <div className='bg-muted md:py-3.5 md:px-3 p-3 rounded-md mx-3 md:mx-0'>
                <h4 className="text-xl text-dark font-semibold">
                {currentNavItem && currentNavItem.name}
                </h4>
            </div>

            <div className='md:mx-3 mx-5 mt-1.5'>
                <div className='flex gap-3 items-center'>
                    <div className='bg-primary size-3 rounded-full'/>
                    {currentNavItem.subTag && <p className='text-dark font-serif text-md md:text-lg'>{currentNavItem.subTag}</p>}
                </div>
            </div>
            {currentNavItem.subTag && <hr className='bg-secondary h-1 text-secondary md:mx-1 mx-3 rounded-md mt-1'/>}
        </header>
    );
}

export default AdminHeader;