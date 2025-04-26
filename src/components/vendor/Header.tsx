import React from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center py-4 mb-5">
      <div className="flex items-center bg-white rounded-full py-2 px-4 w-72 shadow">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="border-none outline-none bg-transparent ml-3 w-full text-sm"
        />
      </div>
      <div className="flex gap-3">
        <button className="bg-white border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow relative">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute -top-1 -right-1 bg-danger text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            3
          </span>
        </button>
        <button className="bg-white border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow">
          <HelpCircle className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </header>
  );
};

export default Header;
