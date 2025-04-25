import React from 'react';
import {
  Home,
  ShoppingBag,
  ShoppingCart,
  CreditCard,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'products', label: 'Products', icon: ShoppingBag },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ activePage, onPageChange }) => {
  return (
    <aside className="w-64 bg-white shadow-md flex flex-col h-screen">
      <div className="p-5 text-center border-b border-gray-200">
        <h2 className="text-primary font-semibold">FoodMarket</h2>
      </div>
      {/* Navigation */}
      <nav className="flex-1 py-5">
        <ul>
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activePage === id;
            return (
              <li key={id} className="mb-1">
                <a
                  href={`#${id}`}
                  onClick={() => onPageChange(id)}
                  className={`flex items-center py-3 px-5 transition-all border-l-4 ${
                    isActive
                      ? 'border-blue-500 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'border-transparent text-gray-700 hover:bg-blue-50 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-300'
                  }`}
                >
                  <Icon className="mr-3 w-5 h-5" />
                  <span>{label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Profile Section */}
      <div className="p-4 flex items-center border-t border-gray-200 dark:border-gray-800">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Vendor Profile"
          className="w-10 h-10 rounded-full mr-3 object-cover"
        />
        <div>
          <h4 className="text-sm text-gray-800 dark:text-white m-0">
            Nancy's Kitchen
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 m-0">
            Premium Vendor
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
