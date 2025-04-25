import React from 'react';
import { Order } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import { Eye, FileText } from 'lucide-react';

interface RecentOrdersListProps {
  orders: Order[];
  onViewOrder: (orderId: string) => void;
  onInvoiceOrder: (orderId: string) => void;
}

const RecentOrdersList: React.FC<RecentOrdersListProps> = ({
  orders,
  onViewOrder,
  onInvoiceOrder,
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6 space-y-4 w-full">
      {/* Section Header */}
      <div className="flex flex-col items-start justify-between">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Recent Orders
        </h3>
        <a
          href="#orders"
          className="mt-2 text-sm text-blue-600 hover:underline hover:text-blue-700"
        >
          View All
        </a>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full text-sm text-left text-gray-600 dark:text-gray-300">
          <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="px-4 py-3 font-medium">{order.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={order.customer.image}
                      alt={order.customer.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{order.customer.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">{order.date}</td>
                <td className="px-4 py-3">{formatCurrency(order.total)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full 
                      ${
                        order.status.toLowerCase() === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                          : order.status.toLowerCase() === 'completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                      }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewOrder(order.id)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-transform transform hover:scale-105"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onInvoiceOrder(order.id)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-transform transform hover:scale-105"
                    >
                      <FileText size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersList;
