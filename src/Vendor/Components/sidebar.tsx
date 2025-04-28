import { Link } from 'react-router-dom';
import { Home, ShoppingBag, ShoppingCart, CreditCard, Settings } from 'lucide-react';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar = ({ activePage, setActivePage }: SidebarProps) => {
  const menuItems = [
    { title: 'Dashboard', icon: Home, path: '/vendor-admin' },
    { title: 'Products', icon: ShoppingBag, path: '/vendor-admin/products' },
    { title: 'Orders', icon: ShoppingCart, path: '/vendor-admin/orders' },
    { title: 'Payments', icon: CreditCard, path: '/vendor-admin/payments' },
    { title: 'Settings', icon: Settings, path: '/vendor-admin/settings' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-green-500">Chow Hub</h1>
      </div>
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.title} className="px-3 py-2">
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-lg ${
                  activePage === item.title
                    ? 'bg-green-100 text-green-500'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActivePage(item.title)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200 mr-3">
            <img 
              src="/api/placeholder/40/40" 
              alt="Nancy's Kitchen" 
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div>
            <p className="text-sm font-medium">Nancy's Kitchen</p>
            <p className="text-xs text-gray-500">Premium Vendor</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
