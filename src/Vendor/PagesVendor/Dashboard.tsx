import { useState } from 'react';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [revenueData] = useState([
    { name: 'Jan', value: 1200 },
    { name: 'Feb', value: 1900 },
    { name: 'Mar', value: 1500 },
    { name: 'Apr', value: 2500 },
    { name: 'May', value: 2300 },
    { name: 'Jun', value: 3000 },
  ]);

  const topSellingProducts = [
    { name: 'Vegetable Salad', price: '$12.99', orders: '85 orders', percentage: '24%', img: '/api/placeholder/30/30' },
    { name: 'Margherita Pizza', price: '$14.99', orders: '76 orders', percentage: '21%', img: '/api/placeholder/30/30' },
    { name: 'Classic Burger', price: '$9.99', orders: '65 orders', percentage: '18%', img: '/api/placeholder/30/30' },
    { name: 'Creamy Pasta', price: '$11.99', orders: '52 orders', percentage: '14%', img: '/api/placeholder/30/30' },
  ];

  const recentOrders = [
    { id: '#ORD-7895', customer: 'John Doe', date: 'May 15, 2023', amount: '$42.50', status: 'Completed' },
    { id: '#ORD-7894', customer: 'Charles Osegbue', date: 'May 15, 2023', amount: '$28.75', status: 'Processing' },
    { id: '#ORD-7893', customer: 'Daniel Opara', date: 'May 14, 2023', amount: '$35.20', status: 'Completed' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Revenue"
          value="$8,459.00"
          change="+12.5% from last month"
          icon={<DollarSign className="h-6 w-6 text-red-500" />}
          iconBg="bg-red-100"
        />
        <StatCard
          title="Total Orders"
          value="245"
          change="+8.3% from last month"
          icon={<ShoppingCart className="h-6 w-6 text-blue-500" />}
          iconBg="bg-blue-100"
        />
        <StatCard
          title="New Customers"
          value="38"
          change="+5.2% from last month"
          icon={<Users className="h-6 w-6 text-yellow-500" />}
          iconBg="bg-yellow-100"
        />
        <StatCard
          title="Products"
          value="24"
          change="-2% from last month"
          icon={<Package className="h-6 w-6 text-teal-500" />}
          iconBg="bg-teal-100"
          negative
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#4ade80" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }}
                  fill="url(#colorUv)" 
                />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
          <div className="space-y-4">
            {topSellingProducts.map((product) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 mr-3 rounded overflow-hidden">
                    <img src={product.img} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.price} · {product.orders}</p>
                  </div>
                </div>
                <span className="text-green-500 font-medium">{product.percentage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-6 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <a href="#" className="text-sm text-blue-600 hover:underline">View All</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-500 hover:text-gray-700">•••</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  iconBg: string;
  negative?: boolean;
}

const StatCard = ({ title, value, change, icon, iconBg, negative = false }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-full ${iconBg}`}>{icon}</div>
      </div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <div className={`text-xs mt-2 ${negative ? 'text-red-500' : 'text-green-500'}`}>
        {change}
      </div>
    </div>
  );
};

export default Dashboard;

