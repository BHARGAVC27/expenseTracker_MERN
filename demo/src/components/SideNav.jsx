import React, { useState } from 'react';
import { LayoutDashboard, Wallet, Receipt, Gem, Code2, PiggyBank, Menu, X } from 'lucide-react';
import logo from '../assets/logo-1.png';
import { UserButton } from '@clerk/clerk-react';
import { NavLink } from 'react-router-dom';

export default function SideNav() {
  const userButtonRef = React.useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutDashboard,
      link: '/dashboard',
    },
    {
      id: 2,
      name: 'Incomes',
      icon: Wallet,
      link: '/dashboard/incomes',
    },
    {
      id: 3,
      name: 'Budgets',
      icon: PiggyBank,
      link: '/dashboard/budgets',
    },
    {
      id: 4,
      name: 'Expenses',
      icon: Receipt,
      link: '/dashboard/expenses',
    },
    {
      id: 5,
      name: 'Upgrade',
      icon: Gem,
      link: '/dashboard/upgrade',
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white border rounded-md shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size="24" /> : <Menu size="24" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        h-screen p-3 sm:p-5 border shadow-sm flex flex-col justify-between bg-white
        transition-transform duration-300 ease-in-out z-40
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:relative md:z-auto
        fixed left-0 top-0 w-64 md:w-auto
      `}>
        <div>
          <div className="flex justify-between items-center mb-4 md:mb-0">
            <img src={logo} alt="Logo" className='p-2 sm:p-5 h-16 sm:h-auto' />
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size="20" />
            </button>
          </div>
          <div>
            {menuList.map((menu) => (
              <NavLink
                to={menu.link}
                key={menu.id}
                end={menu.link === '/dashboard'}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex gap-3 items-center font-medium text-gray-600 cursor-pointer rounded-md p-3 sm:p-5 ${
                    isActive ? 'bg-teal-50 text-black' : 'hover:bg-teal-50 hover:text-black'
                  }`
                }
              >
                <menu.icon size="20" className="sm:w-6 sm:h-6" />
                <span className="text-sm sm:text-base">{menu.name}</span>
              </NavLink>
            ))}
            <div 
              className='rounded-md p-3 sm:p-5 flex items-center gap-3 cursor-pointer hover:bg-teal-50' 
              onClick={() => {
                userButtonRef.current.click();
                setIsMobileMenuOpen(false);
              }}
            >
              <UserButton ref={userButtonRef}/>
              <span className="text-sm sm:text-base">Profile</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}