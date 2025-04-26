import { Product, Order, StatCard, TopProduct, ChartData } from '../types';

export const products: Product[] = [
  {
    id: 'P001',
    name: 'Vegetable Salad',
    category: 'Appetizers',
    price: 12.99,
    stock: 45,
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Fresh garden vegetables with our special dressing.',
  },
  {
    id: 'P002',
    name: 'Margherita Pizza',
    category: 'Main Course',
    price: 14.99,
    stock: 32,
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Classic pizza with tomato, mozzarella, and basil.',
  },
  {
    id: 'P003',
    name: 'Classic Burger',
    category: 'Main Course',
    price: 9.99,
    stock: 28,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description:
      'Juicy beef patty with lettuce, tomato, and our special sauce.',
  },
  {
    id: 'P004',
    name: 'Creamy Pasta',
    category: 'Main Course',
    price: 11.99,
    stock: 40,
    image:
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Fettuccine pasta with creamy alfredo sauce.',
  },
  {
    id: 'P005',
    name: 'Chocolate Cake',
    category: 'Desserts',
    price: 8.99,
    stock: 15,
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Rich chocolate cake with a molten center.',
  },
  {
    id: 'P006',
    name: 'Fresh Smoothie',
    category: 'Beverages',
    price: 6.99,
    stock: 0,
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Blend of seasonal fruits with yogurt.',
  },
];

export const orders: Order[] = [
  {
    id: 'ORD-7895',
    date: 'May 15, 2023',
    time: '2:30 PM',
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St, Anytown, USA 12345',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    items: [
      { name: 'Vegetable Salad', quantity: 2, price: 12.99 },
      { name: 'Classic Burger', quantity: 1, price: 9.99 },
      { name: 'Fresh Smoothie', quantity: 2, price: 6.99 },
    ],
    total: 42.5,
    status: 'Delivered',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
  },
  {
    id: 'ORD-7894',
    date: 'May 15, 2023',
    time: '1:15 PM',
    customer: {
      name: 'Emma Wilson',
      email: 'emma.w@example.com',
      address: '456 Oak Ave, Somewhere, USA 67890',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
    },
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 14.99 },
      { name: 'Creamy Pasta', quantity: 1, price: 11.99 },
    ],
    total: 28.75,
    status: 'Processing',
    paymentMethod: 'Mobile Payment',
    paymentStatus: 'Pending',
  },
  {
    id: 'ORD-7893',
    date: 'May 14, 2023',
    time: '7:45 PM',
    customer: {
      name: 'Michael Brown',
      email: 'm.brown@example.com',
      address: '789 Pine St, Elsewhere, USA 54321',
      image: 'https://randomuser.me/api/portraits/men/42.jpg',
    },
    items: [
      { name: 'Classic Burger', quantity: 2, price: 9.99 },
      { name: 'Fresh Smoothie', quantity: 2, price: 6.99 },
      { name: 'Chocolate Cake', quantity: 1, price: 8.99 },
    ],
    total: 35.2,
    status: 'Delivered',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
  },
  {
    id: 'ORD-7892',
    date: 'May 14, 2023',
    time: '5:20 PM',
    customer: {
      name: 'Sophia Garcia',
      email: 's.garcia@example.com',
      address: '321 Maple Rd, Anytown, USA 12345',
      image: 'https://randomuser.me/api/portraits/women/42.jpg',
    },
    items: [
      { name: 'Vegetable Salad', quantity: 1, price: 12.99 },
      { name: 'Margherita Pizza', quantity: 2, price: 14.99 },
      { name: 'Chocolate Cake', quantity: 1, price: 8.99 },
    ],
    total: 52.99,
    status: 'Cancelled',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Refunded',
  },
  {
    id: 'ORD-7891',
    date: 'May 13, 2023',
    time: '1:30 PM',
    customer: {
      name: 'David Lee',
      email: 'd.lee@example.com',
      address: '654 Birch St, Somewhere, USA 67890',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
    items: [
      { name: 'Creamy Pasta', quantity: 1, price: 11.99 },
      { name: 'Fresh Smoothie', quantity: 1, price: 6.99 },
    ],
    total: 18.5,
    status: 'Delivered',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
  },
];

export const statsData: StatCard[] = [
  {
    title: 'Total Revenue',
    value: '$8,459.00',
    change: '+12.5% from last month',
    isPositive: true,
    icon: 'dollar-sign',
    iconColor: '#ff6384',
    iconBgColor: 'rgba(255, 99, 132, 0.2)',
  },
  {
    title: 'Total Orders',
    value: '245',
    change: '+8.3% from last month',
    isPositive: true,
    icon: 'shopping-cart',
    iconColor: '#36a2eb',
    iconBgColor: 'rgba(54, 162, 235, 0.2)',
  },
  {
    title: 'New Customers',
    value: '38',
    change: '+5.2% from last month',
    isPositive: true,
    icon: 'users',
    iconColor: '#ff9f40',
    iconBgColor: 'rgba(255, 159, 64, 0.2)',
  },
  {
    title: 'Products',
    value: '24',
    change: '-2.1% from last month',
    isPositive: false,
    icon: 'shopping-bag',
    iconColor: '#4bc0c0',
    iconBgColor: 'rgba(75, 192, 192, 0.2)',
  },
];

export const topProducts: TopProduct[] = [
  {
    name: 'Vegetable Salad',
    price: 12.99,
    orders: 89,
    percentage: 24,
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  },
  {
    name: 'Margherita Pizza',
    price: 14.99,
    orders: 76,
    percentage: 21,
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  },
  {
    name: 'Classic Burger',
    price: 9.99,
    orders: 65,
    percentage: 18,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  },
  {
    name: 'Creamy Pasta',
    price: 11.99,
    orders: 52,
    percentage: 14,
    image:
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  },
];

export const revenueChartData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [1200, 1900, 1500, 2500, 2200, 3000],
      borderColor: '#4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      tension: 0.4,
      fill: true,
    },
  ],
};

export const paymentMethodsChartData: ChartData = {
  labels: [
    'Credit Card',
    'Cash on Delivery',
    'Mobile Payment',
    'Bank Transfer',
  ],
  datasets: [
    {
      label: 'Payment Methods',
      data: [55, 20, 15, 10],
      backgroundColor: ['#4CAF50', '#FF9800', '#2196F3', '#9C27B0'],
    },
  ],
};
