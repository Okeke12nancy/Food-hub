import React from 'react';
import {
  DollarSign,
  ShoppingCart,
  Users,
  ShoppingBag,
  CreditCard,
  TrendingUp,
  Repeat,
} from 'lucide-react';
import { StatCard as StatCardType } from '@/types';

interface StatCardProps {
  data: StatCardType;
}

// Define the icon types explicitly
type StatCardIcon =
  | 'dollar-sign'
  | 'shopping-cart'
  | 'users'
  | 'shopping-bag'
  | 'credit-card'
  | 'trending-up'
  | 'repeat';

// Map the icon names to the corresponding components
const ICONS_MAP: Record<
  StatCardIcon,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  'dollar-sign': DollarSign,
  'shopping-cart': ShoppingCart,
  users: Users,
  'shopping-bag': ShoppingBag,
  'credit-card': CreditCard,
  'trending-up': TrendingUp,
  repeat: Repeat,
};

const StatCard: React.FC<StatCardProps> = ({ data }) => {
  // Get the icon component from the map, default to DollarSign if not found
  const Icon = ICONS_MAP[data.icon as StatCardIcon] || DollarSign;

  return (
    <div className="bg-white rounded-lg p-5 shadow flex items-center">
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
        style={{ backgroundColor: data.iconBgColor }}
      >
        <Icon className="w-6 h-6" style={{ color: data.iconColor }} />
      </div>
      <div>
        <h3 className="text-sm text-gray-500 mb-1">{data.title}</h3>
        <p className="text-2xl font-semibold mb-1">{data.value}</p>
        <p
          className={`text-xs flex items-center ${data.isPositive ? 'text-success' : 'text-danger'}`}
        >
          {data.change}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
