import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { routes } from '../constants/routeList';

const Sidebar = () => {
  const { pathname } = useLocation();
  console.log({pathname})
  const sidebarItems = routes.slice(0, routes.length - 3);
  return (
    <div className="bg-gray-800 text-white w-64 h-full">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Shop</h1>
      </div>
      <ul>
        {
          sidebarItems.map((route) => (
            <li className={clsx("mb-2 hover:bg-gray-700", { "bg-gray-700": pathname === route.path })}>
              <NavLink to={route.path} className="block p-2 ml-4" >{route.label}</NavLink>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Sidebar;
