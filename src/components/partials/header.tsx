'use client';

import type React from 'react';

import { useState, useEffect } from 'react';

import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cart-store';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const cartItems = useCartStore((state) => state.cartItems);
  const pathname = useLocation().pathname;
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchValue)}`;
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : pathname === '/'
            ? 'bg-transparent'
            : 'bg-white'
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-x-2">
              <img
                src="https://shop.chevroncemcs.com/cemcs_logo.png"
                alt="Chevron CEMCS"
                className="w-[70px] h-[70px] object-contain"
              />

              <Link to="/" className="text-2xl font-bold text-primary">
                Chow Hub
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={cn(
                  'text-sm font-medium transition-colors',
                  pathname === '/'
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Home
              </Link>
              <Link
                to="/vendor"
                className={cn(
                  'text-sm font-medium transition-colors',
                  pathname === '/vendor' || pathname.startsWith('/vendor/')
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Restaurants
              </Link>
            </nav>
            <div className="hidden md:block">
              <form onSubmit={handleSearchSubmit} className="search-container">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search for food or restaurants..."
                    className="w-[300px] pl-10 rounded-full border-none bg-secondary"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4">
                    <Link to="/" className="text-xl font-bold text-primary">
                      Foodie
                    </Link>
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                  </div>
                  <div className="py-4">
                    <form
                      onSubmit={handleSearchSubmit}
                      className="search-container"
                    >
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search for food or restaurants..."
                          className="w-full pl-10 rounded-full border-none bg-secondary"
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>
                  <nav className="flex flex-col gap-2 py-4">
                    <Link
                      to="/"
                      className="px-4 py-2 hover:bg-secondary rounded-md"
                    >
                      Home
                    </Link>
                    <Link
                      to="/vendor"
                      className="px-4 py-2 hover:bg-secondary rounded-md"
                    >
                      Restaurants
                    </Link>
                    <Link
                      to="/cart"
                      className="px-4 py-2 hover:bg-secondary rounded-md"
                    >
                      Cart
                    </Link>
                    <Link
                      to="#"
                      className="px-4 py-2 hover:bg-secondary rounded-md"
                    >
                      Profile
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
