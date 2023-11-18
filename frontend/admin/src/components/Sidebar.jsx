import React from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

const Sidebar = () => {
  const {pathname} = useLocation();
  const dashboardClasses = clsx("block p-2 hover:bg-gray-700", {
    'bg-gray-700': pathname === "/",
  });
  const productClasses = clsx("block p-2 hover:bg-gray-700", {
    'bg-gray-700': pathname === "/product",
  });
  return (
    <div className="bg-gray-800 text-white w-64 h-screen">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Shop</h1>
      </div>
      <nav className="mt-4">
        <ul>
          <li className="mb-2">
            <a href="/" className={dashboardClasses}>Dashboard</a>
          </li>
          <li className="mb-2">
            <a href="/product" className={productClasses}>Product</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
