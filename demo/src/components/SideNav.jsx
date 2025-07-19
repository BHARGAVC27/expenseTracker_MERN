import React from 'react';
import { LayoutDashboard, Wallet, Receipt, Gem, Code2, PiggyBank } from 'lucide-react';
import logo from '../assets/logo-1.png';
import { UserButton } from '@clerk/clerk-react';
import { NavLink } from 'react-router-dom';

export default function SideNav() {
  const userButtonRef = React.useRef(null);

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
    <div className="h-screen p-5 border shadow-sm flex flex-col justify-between">
      <div>
        <img src={logo} alt="Logo" className='p-5' />
        <div>
          {menuList.map((menu) => (
            <NavLink
              to={menu.link}
              key={menu.id}
              end={menu.link === '/dashboard'}
              className={({ isActive }) =>
                `flex gap-3 items-center font-medium text-gray-600 cursor-pointer rounded-md p-5 ${
                  isActive ? 'bg-teal-50 text-black' : 'hover:bg-teal-50 hover:text-black'
                }`
              }
            >
              <menu.icon size="24" />
              {menu.name}
            </NavLink>
          ))}
          <div className='rounded-md p-5 flex items-center gap-3 cursor-pointer' onClick={() => userButtonRef.current.click()}>
            <UserButton ref={userButtonRef}/>
            <span>Profile</span>
          </div>
        </div>
      </div>
      </div>
  );
}