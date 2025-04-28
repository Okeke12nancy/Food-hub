import { useState, useEffect } from 'react';
import { Star, Clock, ArrowLeft, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import FoodItemCard from '@/components/custom/food-item-card';
import { Link, useParams } from 'react-router-dom';
import { VENDOR_DETAILS } from '@/data/vendor';

export default function VendorDetails() {
  const { id } = useParams();
  const vendorId = Number.parseInt(id as string);
  const vendor = VENDOR_DETAILS.find((v) => v.id === vendorId);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!vendor) {
    return <div>Vendor not found</div>;
  }

  const categories = [
    'all',
    ...new Set(vendor.menu.map((item) => item.category)),
  ];

  const filteredItems = vendor.menu.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      searchTerm === '' ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] w-full">
        {/* <img
          src={vendor.coverImage || '/src/assets/placeholder.svg'}
          alt={vendor.name}
          height={400}
          width={1200}
          //   fill
          className="object-cover object-fill"
          //   priority
        /> */}
        <div className="absolute inset-0 hero-gradient flex flex-col justify-end">
          <div className="container mx-auto px-4 pb-8">
            <Link
              to="/vendor"
              className="inline-flex items-center gap-2 mb-4 text-white/90 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to restaurants
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {vendor.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-white">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{vendor.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-white">
                <Clock className="h-4 w-4" />
                <span>{vendor.deliveryTime}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {vendor.categories.map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className="bg-white/10 text-white border-none"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="bg-[#FAFAFA] pb-16">
        <div
          className={`sticky top-16 z-30 bg-white py-4 transition-shadow duration-200 ${isHeaderSticky ? 'shadow-sm' : ''}`}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <Tabs
                defaultValue="all"
                value={activeCategory}
                onValueChange={setActiveCategory}
                className="w-full md:w-auto"
              >
                <TabsList className="bg-secondary h-auto p-1 rounded-full">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="capitalize rounded-full px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search menu..."
                  className="pl-10 rounded-full border-none bg-secondary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pt-8">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <FoodItemCard key={item.id} item={item} vendorId={vendorId} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No items found. Try a different search or category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
