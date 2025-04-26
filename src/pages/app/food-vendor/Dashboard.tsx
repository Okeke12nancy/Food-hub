import React from 'react';
import { Plus } from 'lucide-react';
import StatCard from '@/components/vendor/StatCard';
import TopProductList from '@/components/dashboard/TopProductList';
import RecentOrdersList from '@/components/dashboard/RecentOrdersList';
import { StatCard as StatCardType, Order } from '@/types';

interface DashboardProps {
  stats: StatCardType[];
  orders: Order[];
  onViewOrder: (orderId: string) => void;
  onInvoiceOrder: (orderId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  stats,
  orders,
  onViewOrder,
  onInvoiceOrder,
}) => {
  return (
    <section id="dashboard" className="p-6 md:p-8 lg:p-10 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} data={stat} />
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 shadow-sm rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Top Selling Products
        </h3>
        {/* <TopProductList products={topProducts} /> */}
        <div className="text-sm text-gray-400">Coming soon...</div>
      </div>

      <div>
        <RecentOrdersList
          orders={orders}
          onViewOrder={onViewOrder}
          onInvoiceOrder={onInvoiceOrder}
        />
      </div>
    </section>
  );
};

export default Dashboard;
