import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { X, Upload } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
  product?: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product,
}) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    description: '',
    image: '',
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        description: product.description,
        image: product.image,
      });
      setImagePreview(product.image);
    } else {
      resetForm();
    }
  }, [product, isOpen]);

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: 0,
      stock: 0,
      description: '',
      image: '',
    });
    setImagePreview('');
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <X />
        </button>

        <h2 className="text-2xl font-semibold">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select Category</option>
              <option value="Main Course">Main Course</option>
              <option value="Appetizers">Appetizers</option>
              <option value="Desserts">Desserts</option>
              <option value="Beverages">Beverages</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Price (₦)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Product Image</label>
            <div className="flex items-center gap-4">
              <label
                htmlFor="image"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md cursor-pointer"
              >
                <Upload size={16} />
                <span>Choose a file</span>
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-md"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-400 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
