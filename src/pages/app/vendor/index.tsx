'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import VendorCard from '@/components/custom/vendor-card';
import { Badge } from '@/components/ui/badge';

// Types
interface Vendor {
  id: number;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  categories: string[];
  location: string;
  priceRange: string;
}

export default function Vendor() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedFoodTypes, setSelectedFoodTypes] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null
  );
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(vendors);
  const [activeFilters, setActiveFilters] = useState(0);

  // Filter vendors when filters change
  useEffect(() => {
    let filtered = [...vendors];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vendor.categories.some((category) =>
            category.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by location
    if (selectedLocation) {
      filtered = filtered.filter(
        (vendor) => vendor.location === selectedLocation
      );
    }

    // Filter by food types
    if (selectedFoodTypes.length > 0) {
      filtered = filtered.filter((vendor) =>
        vendor.categories.some((category) =>
          selectedFoodTypes.includes(category)
        )
      );
    }

    // Filter by price range
    if (selectedPriceRange) {
      filtered = filtered.filter(
        (vendor) => vendor.priceRange === selectedPriceRange
      );
    }

    setFilteredVendors(filtered);

    // Count active filters
    let count = 0;
    if (selectedLocation) count++;
    if (selectedFoodTypes.length > 0) count++;
    if (selectedPriceRange) count++;
    setActiveFilters(count);
  }, [searchTerm, selectedLocation, selectedFoodTypes, selectedPriceRange]);

  const handleFoodTypeChange = (foodType: string) => {
    setSelectedFoodTypes((prev) =>
      prev.includes(foodType)
        ? prev.filter((type) => type !== foodType)
        : [...prev, foodType]
    );
  };

  const clearFilters = () => {
    setSelectedLocation(null);
    setSelectedFoodTypes([]);
    setSelectedPriceRange(null);
  };

  const removeFilter = (type: string, value?: string) => {
    if (type === 'location') {
      setSelectedLocation(null);
    } else if (type === 'foodType' && value) {
      setSelectedFoodTypes((prev) => prev.filter((type) => type !== value));
    } else if (type === 'priceRange') {
      setSelectedPriceRange(null);
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-16">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">All Restaurants</h1>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-auto md:flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search restaurants or cuisines..."
                className="pl-12 h-12 rounded-full border-none bg-secondary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <Select
                value={selectedLocation || ''}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger className="h-12 rounded-full border-none bg-secondary w-full md:w-[180px]">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Location" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Downtown">Downtown</SelectItem>
                  <SelectItem value="Uptown">Uptown</SelectItem>
                  <SelectItem value="Midtown">Midtown</SelectItem>
                  <SelectItem value="West Side">West Side</SelectItem>
                  <SelectItem value="East Side">East Side</SelectItem>
                </SelectContent>
              </Select>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-12 rounded-full border-none bg-secondary relative"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {activeFilters > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                        {activeFilters}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>

                  <div className="py-6 space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Food Type</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {foodTypes.map((foodType) => (
                          <div
                            key={foodType}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`food-${foodType}`}
                              checked={selectedFoodTypes.includes(foodType)}
                              onCheckedChange={() =>
                                handleFoodTypeChange(foodType)
                              }
                            />
                            <Label
                              htmlFor={`food-${foodType}`}
                              className="text-sm"
                            >
                              {foodType}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Price Range</h3>
                      <div className="grid grid-cols-3 gap-3">
                        <Button
                          variant={
                            selectedPriceRange === '$' ? 'default' : 'outline'
                          }
                          className="rounded-full"
                          onClick={() =>
                            setSelectedPriceRange(
                              selectedPriceRange === '$' ? null : '$'
                            )
                          }
                        >
                          ₦
                        </Button>
                        <Button
                          variant={
                            selectedPriceRange === '$$' ? 'default' : 'outline'
                          }
                          className="rounded-full"
                          onClick={() =>
                            setSelectedPriceRange(
                              selectedPriceRange === '$$' ? null : '$$'
                            )
                          }
                        >
                          ₦₦
                        </Button>
                        <Button
                          variant={
                            selectedPriceRange === '$$$' ? 'default' : 'outline'
                          }
                          className="rounded-full"
                          onClick={() =>
                            setSelectedPriceRange(
                              selectedPriceRange === '$$$' ? null : '$$$'
                            )
                          }
                        >
                          ₦₦₦
                        </Button>
                      </div>
                    </div>
                  </div>

                  <SheetFooter className="flex-row justify-between sm:justify-between">
                    <Button variant="outline" onClick={clearFilters}>
                      Clear All
                    </Button>
                    <SheetClose asChild>
                      <Button>Apply Filters</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Active filters */}
          {(selectedLocation ||
            selectedFoodTypes.length > 0 ||
            selectedPriceRange) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedLocation && (
                <Badge
                  variant="secondary"
                  className="rounded-full pl-2 pr-1 py-1 flex items-center gap-1"
                >
                  {selectedLocation}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 rounded-full hover:bg-muted"
                    onClick={() => removeFilter('location')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {selectedFoodTypes.map((type) => (
                <Badge
                  key={type}
                  variant="secondary"
                  className="rounded-full pl-2 pr-1 py-1 flex items-center gap-1"
                >
                  {type}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 rounded-full hover:bg-muted"
                    onClick={() => removeFilter('foodType', type)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}

              {selectedPriceRange && (
                <Badge
                  variant="secondary"
                  className="rounded-full pl-2 pr-1 py-1 flex items-center gap-1"
                >
                  {selectedPriceRange}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 rounded-full hover:bg-muted"
                    onClick={() => removeFilter('priceRange')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              <Button
                variant="ghost"
                className="text-sm h-7"
                onClick={clearFilters}
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-muted-foreground">
            {filteredVendors.length}{' '}
            {filteredVendors.length === 1 ? 'Vendor' : 'Vendors'} found
          </p>
          {/* <Select defaultValue="recommended">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="delivery">Fastest Delivery</SelectItem>
            </SelectContent>
          </Select> */}
        </div>

        {filteredVendors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-muted-foreground text-center mb-4">
              No Vendor found
            </p>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Try adjusting your filters or search for something else
            </p>
            <Button onClick={clearFilters}>Clear all filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Mock data
const vendors: Vendor[] = [
  {
    id: 1,
    name: 'Tasty Bites',
    image: '/src/assets/placeholder.svg',
    rating: 4.5,
    deliveryTime: '25-35 min',
    categories: ['Fast Food', 'Burgers', 'Chicken'],
    location: 'Downtown',
    priceRange: '₦₦',
  },
  {
    id: 2,
    name: 'Green Garden',
    image: '/src/assets/placeholder.svg',
    rating: 4.7,
    deliveryTime: '20-30 min',
    categories: ['Healthy', 'Salads', 'Vegan'],
    location: 'Uptown',
    priceRange: '₦₦₦',
  },
  {
    id: 3,
    name: 'Spice Paradise',
    image: '/src/assets/placeholder.svg',
    rating: 4.3,
    deliveryTime: '30-45 min',
    categories: ['Indian', 'Curry', 'Spicy'],
    location: 'Midtown',
    priceRange: '₦₦',
  },
  {
    id: 4,
    name: 'Pizza Heaven',
    image: '/src/assets/placeholder.svg',
    rating: 4.6,
    deliveryTime: '20-35 min',
    categories: ['Italian', 'Pizza', 'Pasta'],
    location: 'West Side',
    priceRange: '₦₦',
  },
  {
    id: 5,
    name: 'Sushi World',
    image: '/src/assets/placeholder.svg',
    rating: 4.8,
    deliveryTime: '25-40 min',
    categories: ['Japanese', 'Sushi', 'Asian'],
    location: 'Downtown',
    priceRange: '₦₦₦',
  },
  {
    id: 6,
    name: 'Taco Fiesta',
    image: '/src/assets/placeholder.svg',
    rating: 4.4,
    deliveryTime: '15-30 min',
    categories: ['Mexican', 'Tacos', 'Burritos'],
    location: 'East Side',
    priceRange: '₦',
  },
  {
    id: 7,
    name: 'Burger Joint',
    image: '/src/assets/placeholder.svg',
    rating: 4.2,
    deliveryTime: '20-35 min',
    categories: ['Fast Food', 'Burgers', 'Fries'],
    location: 'Midtown',
    priceRange: '₦',
  },
  {
    id: 8,
    name: 'Pasta Palace',
    image: '/src/assets/placeholder.svg',
    rating: 4.5,
    deliveryTime: '25-40 min',
    categories: ['Italian', 'Pasta', 'Pizza'],
    location: 'Uptown',
    priceRange: '₦₦',
  },
  {
    id: 9,
    name: 'Chicken Express',
    image: '/src/assets/placeholder.svg',
    rating: 4.1,
    deliveryTime: '15-25 min',
    categories: ['Fast Food', 'Chicken', 'Fries'],
    location: 'East Side',
    priceRange: '₦',
  },
];

const foodTypes = [
  'Burgers',
  'Pizza',
  'Chicken',
  'Fries',
  'Salads',
  'Sushi',
  'Pasta',
  'Tacos',
  'Curry',
  'Vegan',
  'Breakfast',
  'Dessert',
];
