import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import ProductsList from '@/components/products/ProductsList';
import ProductModal from '@/components/products/ProductModal';

import { Product } from '@/types';

interface ProductsProps {
  products: Product[];
  onAddProduct: (product: Partial<Product>) => void;
  onEditProduct: (product: Partial<Product>) => void;
  onDeleteProduct: (productId: string) => void;
}

const Products: React.FC<ProductsProps> = ({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(
    undefined
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [sortOption, setSortOption] = useState('Newest');

  const handleOpenModal = () => {
    setEditingProduct(undefined);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(undefined);
  };

  const handleSaveProduct = (product: Partial<Product>) => {
    if (editingProduct) {
      onEditProduct({ ...product, id: editingProduct.id });
    } else {
      onAddProduct(product);
    }
    handleCloseModal();
  };

  const handleEditClick = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setEditingProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleDeleteClick = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDeleteProduct(productId);
    }
  };

  let filteredProducts = [...products];

  if (categoryFilter !== 'All Categories') {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === categoryFilter
    );
  }

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
    );
  }

  switch (sortOption) {
    case 'Price: Low to High':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'Price: High to Low':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'Popularity':
      filteredProducts.sort(() => Math.random() - 0.5);
      break;
    default:
      break;
  }

  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          onClick={handleOpenModal}
        >
          <Plus size={16} /> Add New Product
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 w-full md:w-1/2 bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm"
          >
            <option>All Categories</option>
            <option>Main Course</option>
            <option>Appetizers</option>
            <option>Desserts</option>
            <option>Beverages</option>
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm"
          >
            <option>Sort By: Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Popularity</option>
          </select>
        </div>
      </div>

      <ProductsList
        products={filteredProducts}
        onEditProduct={handleEditClick}
        onDeleteProduct={handleDeleteClick}
      />

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </section>
  );
};

export default Products;
