import { Search, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import FoodCategoryFilter from '@/components/custom/food-category-filter';
import { Link } from 'react-router-dom';
import VendorCard from '@/components/custom/vendor-card';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-[500px]">
        <div className="w-full h-[500px]">
          <img
            src="/src/assets/placeholder.svg?height=500&width=1200"
            alt="Delicious food"
            className="object-cover brightness-75 w-full h-full"
            // priority
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl">
            Delicious food delivered to your doorstep
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Order from your favorite local restaurants with just a few taps
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const searchInput = e.currentTarget.querySelector('input');
              const searchValue = searchInput?.value || '';
              if (searchValue.trim()) {
                window.location.href = `/search?q=${encodeURIComponent(searchValue)}`;
              }
            }}
            className="relative w-full max-w-md"
          >
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for food or restaurants..."
              className="w-full h-14 pl-12 pr-4 rounded-full border-none bg-white/90 backdrop-blur-md text-black shadow-lg"
            />
          </form>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Browse by category</h2>
          <FoodCategoryFilter />
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Popular restaurants</h2>
            <Link
              to="/vendor"
              className="text-primary font-medium hover:underline flex items-center"
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendors.slice(0, 6).map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>

        {/* Featured Section */}
        {/* <div className="mb-12 bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="text-primary font-semibold mb-2">
                Limited Time Offer
              </span>
              <h2 className="text-3xl font-bold mb-4">
                Get 20% off your first order
              </h2>
              <p className="text-muted-foreground mb-6">
                Use code{' '}
                <span className="font-semibold text-black">WELCOME20</span> at
                checkout
              </p>
              <Link to="/vendor" className="self-start">
                <Button className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
                  Order now
                </Button>
              </Link>
            </div>
            <div className="relative h-64 md:h-auto">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Special offer"
                className="object-cover"
              />
            </div>
          </div>
        </div> */}

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Trending this week</h2>
            <Link
              to="/vendor"
              className="text-primary font-medium hover:underline flex items-center"
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendors.slice(3, 6).map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}

// Mock data
const vendors = [
  {
    id: 1,
    name: 'Tasty Bites',
    image: '/src/assets/placeholder.svg?',
    rating: 4.5,
    deliveryTime: '25-35 min',
    categories: ['Fast Food', 'Burgers', 'Chicken'],
  },
  {
    id: 2,
    name: 'Green Garden',
    image: '/src/assets/placeholder.svg?',
    rating: 4.7,
    deliveryTime: '20-30 min',
    categories: ['Healthy', 'Salads', 'Vegan'],
  },
  {
    id: 3,
    name: 'Spice Paradise',
    image: '/src/assets/placeholder.svg?',
    rating: 4.3,
    deliveryTime: '30-45 min',
    categories: ['Indian', 'Curry', 'Spicy'],
  },
  {
    id: 4,
    name: 'Pizza Heaven',
    image: '/src/assets/placeholder.svg?',
    rating: 4.6,
    deliveryTime: '20-35 min',
    categories: ['Italian', 'Pizza', 'Pasta'],
  },
  {
    id: 5,
    name: 'Sushi World',
    image: '/src/assets/placeholder.svg?',
    rating: 4.8,
    deliveryTime: '25-40 min',
    categories: ['Japanese', 'Sushi', 'Asian'],
  },
  {
    id: 6,
    name: 'Taco Fiesta',
    image: '/src/assets/placeholder.svg?',
    rating: 4.4,
    deliveryTime: '15-30 min',
    categories: ['Mexican', 'Tacos', 'Burritos'],
  },
];
