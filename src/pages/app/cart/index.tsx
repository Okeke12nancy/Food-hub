import { useState } from 'react';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/stores/cart-store';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCartStore();
  const [voucher, setVoucher] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyVoucher = () => {
    // Mock voucher logic
    if (voucher === 'WELCOME20') {
      setDiscount(getCartTotal() * 0.2);
    } else if (voucher === 'DISCOUNT10') {
      setDiscount(getCartTotal() * 0.1);
    } else {
      setDiscount(0);
      alert('Invalid voucher code');
    }
  };

  const total = getCartTotal();
  const finalTotal = total - discount;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Go ahead and
          explore our delicious options.
        </p>
        <Link to="/user/vendor">
          <Button className="rounded-full px-8 bg-primary hover:bg-primary/90">
            Browse Restaurants
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue shopping
        </Link>

        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="cart-item bg-white rounded-2xl overflow-hidden shadow-sm p-4 md:p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 shrink-0 rounded-xl overflow-hidden">
                    <img
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-primary font-medium">
                    ₦{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-secondary rounded-full p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="quantity-button h-8 w-8 rounded-full"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="quantity-button h-8 w-8 rounded-full"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive rounded-full"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <Button
                variant="outline"
                className="text-muted-foreground"
                onClick={() => clearCart()}
              >
                Clear cart
              </Button>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₦{total.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₦{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter voucher code"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                    className="rounded-l-full"
                  />
                  <Button
                    variant="outline"
                    onClick={handleApplyVoucher}
                    className="rounded-r-full"
                  >
                    Apply
                  </Button>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₦{finalTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  * Try voucher codes: WELCOME20 or DISCOUNT10
                </p>
                <Link to="/user/checkout" className="w-full">
                  <Button className="w-full bg-primary hover:bg-primary/90 rounded-full h-12 mt-2 checkout-button">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
