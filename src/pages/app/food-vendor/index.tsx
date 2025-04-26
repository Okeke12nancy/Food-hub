import React, { useState } from 'react';
import Sidebar from '@/components/vendor/Sidebar';
import Dashboard from './Dashboard';
import Header from '@/components/vendor/Header';
import { statsData, orders } from '@/data/mockData';
import Products from './Products';
import { Product } from '@/types';
import { products } from '@/data/mockData';
import { Order } from '@/types';

import { products as initialProducts } from '@/data/mockData';

const App = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(
    undefined
  );
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  const handleAddProduct = (product: Partial<Product>) => {
    const newProduct: Product = {
      id: `P${Math.floor(Math.random() * 1000)}`,
      name: product.name || '',
      category: product.category || '',
      price: product.price || 0,
      stock: product.stock || 0,
      description: product.description || '',
      image: product.image || 'https://via.placeholder.com/500',
    };

    setProducts([...products, newProduct]);
    // addNotification('Product added successfully!', 'success');
  };

  const handleEditProduct = (product: Partial<Product>) => {
    setProducts(
      products.map((p) => (p.id === product.id ? { ...p, ...product } : p))
    );
    // addNotification('Product updated successfully!', 'success');
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
    // addNotification('Product deleted successfully!', 'success');
  };

  const handleViewOrder = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setIsInvoiceModalOpen(true);
    }
  };

  const handleInvoiceOrder = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setIsInvoiceModalOpen(true);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Sidebar */}
      <Sidebar activePage={activePage} onPageChange={handlePageChange} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-900 rounded-tl-lg">
          {activePage === 'dashboard' && (
            <Dashboard
              stats={statsData}
              orders={orders.slice(0, 5)}
              onViewOrder={handleViewOrder}
              onInvoiceOrder={handleInvoiceOrder}
            />
          )}

          {activePage === 'products' && (
            <Products
              products={products}
              onAddProduct={handleAddProduct}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
