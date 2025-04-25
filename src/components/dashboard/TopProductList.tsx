import React from 'react';
import { TopProduct } from '@/types';
import { formatCurrency } from '../../utils/formatters';

interface TopProductListProps {
  products: TopProduct[];
}

const TopProductList: React.FC<TopProductListProps> = ({ products }) => {
  return (
    <div className="top-products">
      {products.map((product, index) => (
        <div className="product-item" key={index}>
          <img src={product.image} alt={product.name} />
          <div className="product-details">
            <h4>{product.name}</h4>
            <p>
              {formatCurrency(product.price)} • {product.orders} orders
            </p>
          </div>
          <span className="product-percentage">{product.percentage}%</span>
        </div>
      ))}
    </div>
  );
};

export default TopProductList;
