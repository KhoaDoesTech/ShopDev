// Sidebar.tsx
import React from "react";

interface SidebarProps {
  isOpen?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true }) => {
  const sidebarClasses = isOpen
    ? "bg-gray-800 w-64 h-full fixed top-0 left-0 transition-all duration-300 ease-in-out transform translate-x-0"
    : "bg-gray-800 w-64 h-full fixed top-0 left-0 transition-all duration-300 ease-in-out transform -translate-x-full";

  return (
    <aside className={sidebarClasses}>
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 className="text-white font-bold text-xl">Danh mục</h1>
      </div>
      <nav className="mt-4">
        <ul>
          <li className="py-2">
            <a href="#" className="text-gray-300 hover:text-white block pl-4">
              Menu Item 1
            </a>
          </li>
          <li className="py-2">
            <a href="#" className="text-gray-300 hover:text-white block pl-4">
              Menu Item 2
            </a>
          </li>
          <li className="py-2">
            <a href="#" className="text-gray-300 hover:text-white block pl-4">
              Menu Item 3
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
