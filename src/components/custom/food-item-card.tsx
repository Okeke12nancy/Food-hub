import { useState } from 'react';

import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cart-store';

interface FoodItemProps {
  item: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
  };
  vendorId: number;
}

export default function FoodItemCard({ item, vendorId }: FoodItemProps) {
  const { addToCart, cartItems, updateQuantity } = useCartStore();
  const [isHovered, setIsHovered] = useState(false);

  const cartItem = cartItems.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      vendorId,
    });
  };

  return (
    <div
      className="food-card bg-white rounded-3xl overflow-hidden shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col">
        <div className="relative w-full">
          <div className="w-full h-48">
            <img
              src={item.image}
              alt={item.name}
              className={cn(
                'object-cover w-full h-full transition-transform duration-300',
                isHovered ? 'scale-105' : 'scale-100'
              )}
            />
          </div>
          <div className="absolute top-2 left-2">
            <div className="bg-white px-3 py-1 rounded-full font-medium text-sm shadow-sm">
            ₦{item.price.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-lg mb-1">{item.name}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {item.description}
          </p>

          {quantity === 0 ? (
            <Button
              onClick={handleAddToCart}
              className="add-button w-full bg-primary hover:bg-primary/90 text-white rounded-full"
            >
              Add to cart
            </Button>
          ) : (
            <div className="flex items-center justify-between bg-secondary rounded-full p-1">
              <Button
                size="icon"
                variant="ghost"
                className="quantity-button h-8 w-8 rounded-full"
                onClick={() => updateQuantity(item.id, quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-medium">{quantity}</span>
              <Button
                size="icon"
                variant="ghost"
                className="quantity-button h-8 w-8 rounded-full"
                onClick={() => updateQuantity(item.id, quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
