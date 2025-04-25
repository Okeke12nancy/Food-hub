export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

export interface Customer {
  name: string;
  email: string;
  address: string;
  image: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  time: string;
  customer: Customer;
  items: OrderItem[];
  total: number;
  status: 'Processing' | 'Delivered' | 'Cancelled';
  paymentMethod: string;
  paymentStatus: string;
}

export interface StatCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
  iconColor: string;
  iconBgColor: string;
}

export interface TopProduct {
  name: string;
  price: number;
  orders: number;
  percentage: number;
  image: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor: string | string[];
    tension?: number;
    fill?: boolean;
  }[];
}
