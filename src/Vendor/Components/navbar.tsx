import { Search, Bell, HelpCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
              3
            </span>
          </button>
          <button className="p-2">
            <HelpCircle className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;