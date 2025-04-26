import React from 'react';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { Edit, Trash2 } from 'lucide-react';

interface ProductsListProps {
  products: Product[];
  onEditProduct: (productId: string) => void;
  onDeleteProduct: (productId: string) => void;
}

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  onEditProduct,
  onDeleteProduct,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.map((product) => {
        const stockClass =
          product.stock > 20
            ? 'text-green-500'
            : product.stock > 0
              ? 'text-yellow-500'
              : 'text-red-500';

        const stockText =
          product.stock > 0
            ? product.stock > 20
              ? 'In Stock'
              : 'Low Stock'
            : 'Out of Stock';

        return (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-2"
          >
            <div className="relative h-32 bg-gray-100 overflow-hidden rounded-md">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover h-full w-full"
              />
              <div className="absolute top-1 right-1 flex gap-1">
                <button
                  onClick={() => onEditProduct(product.id)}
                  className="p-1 bg-white rounded-full hover:bg-blue-100"
                  title="Edit"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => onDeleteProduct(product.id)}
                  className="p-1 bg-white rounded-full hover:bg-red-100"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="pt-2 text-sm space-y-1">
              <p className="font-medium truncate">{product.name}</p>
              <p className="text-xs text-gray-500 truncate">
                {product.category}
              </p>
              <div className="flex justify-between items-center text-xs mt-1">
                <span className="text-blue-600 font-semibold">
                  {formatCurrency(product.price)}
                </span>
                <span className={stockClass}>{stockText}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
