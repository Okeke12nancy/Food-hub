import { useState } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Eye, FileText } from 'lucide-react';

const Orders = () => {
  const [orders] = useState([
    {
      id: 'ORD-7895',
      customer: 'John Doe',
      email: 'john.doe@example.com',
      date: 'May 15, 2023',
      time: '2:30 PM',
      items: 3,
      amount: '$42.50',
      status: 'Delivered'
    },
    {
      id: 'ORD-7894',
      customer: 'Emma Wilson',
      email: 'emma.w@example.com',
      date: 'May 15, 2023',
      time: '1:15 PM',
      items: 2,
      amount: '$28.75',
      status: 'Processing'
    },
    {
      id: 'ORD-7893',
      customer: 'Michael Brown',
      email: 'm.brown@example.com',
      date: 'May 14, 2023',
      time: '7:45 PM',
      items: 3,
      amount: '$35.20',
      status: 'Delivered'
    },
    {
      id: 'ORD-7892',
      customer: 'Sophia Garcia',
      email: 's.garcia@example.com',
      date: 'May 14, 2023',
      time: '5:20 PM',
      items: 3,
      amount: '$52.99',
      status: 'Cancelled'
    },
    {
      id: 'ORD-7891',
      customer: 'David Lee',
      email: 'd.lee@example.com',
      date: 'May 13, 2023',
      time: '1:30 PM',
      items: 2,
      amount: '$18.50',
      status: 'Delivered'
    }
  ]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Orders Management</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="w-full sm:w-auto mb-4 sm:mb-0 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-64"
            />
          </div>
          <div className="flex space-x-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-40">
              <select className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>All Status</option>
                <option>Delivered</option>
                <option>Processing</option>
                <option>Cancelled</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>
            <div className="relative w-full sm:w-40">
              <select className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
                <option>Today</option>
                <option>This Month</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0">
                        <img src="/api/placeholder/32/32" alt={order.customer} className="h-8 w-8 rounded-full" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">{order.date}</p>
                    <p className="text-xs text-gray-500">{order.time}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items} items</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'Delivered'
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
                    <div className="flex space-x-2">
                      <button className="text-gray-500 hover:text-gray-700">
                        <ChevronDown className="h-5 w-5" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <FileText className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">Showing 1-5 of 25 orders</p>
          <div className="flex space-x-1">
            <button className="p-2 border border-gray-300 rounded-md">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="p-2 w-8 border border-gray-300 rounded-md bg-green-500 text-white">1</button>
            <button className="p-2 w-8 border border-gray-300 rounded-md">2</button>
            <button className="p-2 w-8 border border-gray-300 rounded-md">3</button>
            <button className="p-2 border border-gray-300 rounded-md">
              <span>...</span>
            </button>
            <button className="p-2 w-8 border border-gray-300 rounded-md">10</button>
           <button className="p-2 border border-gray-300 rounded-md">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
            