import { useState } from 'react';
import { Search, PlusCircle, ChevronDown } from 'lucide-react';

const Products = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'Vegetable Salad',
      category: 'Appetizers',
      price: '$12.99',
      status: 'In Stock',
      image: '/api/placeholder/200/200'
    },
    {
      id: 2,
      name: 'Margherita Pizza',
      category: 'Main Course',
      price: '$14.99',
      status: 'In Stock',
      image: '/api/placeholder/200/200'
    },
    {
      id: 3,
      name: 'Classic Burger',
      category: 'Main Course',
      price: '$9.99',
      status: 'In Stock',
      image: '/api/placeholder/200/200'
    },
    {
      id: 4,
      name: 'Creamy Pasta',
      category: 'Main Course',
      price: '$11.99',
      status: 'In Stock',
      image: '/api/placeholder/200/200'
    },
    {
      id: 5,
      name: 'Chocolate Cake',
      category: 'Desserts',
      price: '$8.99',
      status: 'Low Stock',
      image: '/api/placeholder/200/200'
    },
    {
      id: 6,
      name: 'Fresh Smoothie',
      category: 'Beverages',
      price: '$6.99',
      status: 'Out of stock',
      image: '/api/placeholder/200/200'
    }
  ]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Products Management</h1>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
          <PlusCircle className="h-5 w-5 mr-2" />
          Add New Product
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="w-full sm:w-auto mb-4 sm:mb-0 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-64"
            />
          </div>
          <div className="flex space-x-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-40">
              <select className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>All Categories</option>
                <option>Appetizers</option>
                <option>Main Course</option>
                <option>Desserts</option>
                <option>Beverages</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>
            <div className="relative w-full sm:w-40">
              <select className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Sort By: Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Name: A to Z</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">{product.price}</span>
                  <span 
                    className={`px-2 py-1 text-xs rounded-full ${
                      product.status === 'In Stock'
                        ? 'bg-green-100 text-green-800'
                        : product.status === 'Low Stock'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;