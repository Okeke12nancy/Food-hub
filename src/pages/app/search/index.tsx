'use client';

import type React from 'react';

import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VendorCard from '@/components/custom/vendor-card';
import FoodItemCard from '@/components/custom/food-item-card';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [activeTab, setActiveTab] = useState('all');

  // Mock data - in a real app, this would come from an API
  const vendors = [
    {
      id: 1,
      name: 'Tasty Bites',
      image: '/src/assets/placeholder.svg?height',
      rating: 4.5,
      deliveryTime: '25-35 min',
      categories: ['Fast Food', 'Burgers', 'Chicken'],
    },
    {
      id: 2,
      name: 'Green Garden',
      image: '/src/assets/placeholder.svg?height',
      rating: 4.7,
      deliveryTime: '20-30 min',
      categories: ['Healthy', 'Salads', 'Vegan'],
    },
  ];

  const foodItems = [
    {
      id: 101,
      name: 'Classic Cheeseburger',
      description:
        'Juicy beef patty with cheese, lettuce, tomato, and special sauce',
      price: 8.99,
      image: '/src/assets/placeholder.svg?height',
      category: 'burgers',
      vendorId: 1,
    },
    {
      id: 102,
      name: 'Crispy Chicken Sandwich',
      description: 'Crispy fried chicken with lettuce, mayo, and pickles',
      price: 7.99,
      image: '/src/assets/placeholder.svg?height',
      category: 'chicken',
      vendorId: 1,
    },
    {
      id: 201,
      name: 'Caesar Salad',
      description:
        'Romaine lettuce, croutons, parmesan cheese with Caesar dressing',
      price: 9.99,
      image: '/src/assets/placeholder.svg?height',
      category: 'salads',
      vendorId: 2,
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Filter results based on search term
  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(query.toLowerCase()) ||
      vendor.categories.some((cat) =>
        cat.toLowerCase().includes(query.toLowerCase())
      )
  );

  const filteredFoodItems = foodItems.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8">
        <form
          onSubmit={handleSearch}
          className="relative w-full max-w-2xl mx-auto mb-8"
        >
          <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for food or restaurants..."
            className="pl-12 h-14 rounded-full border-none bg-white shadow-sm text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {query ? (
          <>
            <h1 className="text-3xl font-bold mb-8">Results for "{query}"</h1>

            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="bg-secondary h-auto p-1 rounded-full mb-8">
                <TabsTrigger
                  value="all"
                  className="rounded-full px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="vendors"
                  className="rounded-full px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Restaurants ({filteredVendors.length})
                </TabsTrigger>
                <TabsTrigger
                  value="food"
                  className="rounded-full px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Food Items ({filteredFoodItems.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-12">
                {filteredVendors.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Restaurants</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredVendors.map((vendor) => (
                        <VendorCard key={vendor.id} vendor={vendor} />
                      ))}
                    </div>
                  </div>
                )}

                {filteredFoodItems.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Food Items</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredFoodItems.map((item) => (
                        <FoodItemCard
                          key={item.id}
                          item={item}
                          vendorId={item.vendorId}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {filteredVendors.length === 0 &&
                  filteredFoodItems.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16">
                      <p className="text-muted-foreground text-center mb-4">
                        No results found for "{query}"
                      </p>
                      <p className="text-sm text-muted-foreground text-center">
                        Try searching for something else or browse our
                        categories
                      </p>
                    </div>
                  )}
              </TabsContent>

              <TabsContent value="vendors">
                {filteredVendors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredVendors.map((vendor) => (
                      <VendorCard key={vendor.id} vendor={vendor} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16">
                    <p className="text-muted-foreground text-center mb-4">
                      No restaurants found for "{query}"
                    </p>
                    <p className="text-sm text-muted-foreground text-center">
                      Try searching for something else or browse our categories
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="food">
                {filteredFoodItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredFoodItems.map((item) => (
                      <FoodItemCard
                        key={item.id}
                        item={item}
                        vendorId={item.vendorId}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16">
                    <p className="text-muted-foreground text-center mb-4">
                      No food items found for "{query}"
                    </p>
                    <p className="text-sm text-muted-foreground text-center">
                      Try searching for something else or browse our categories
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-muted-foreground text-center mb-4">
              Enter a search term to find restaurants and food items
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Try searching for cuisine types, restaurant names, or specific
              dishes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
