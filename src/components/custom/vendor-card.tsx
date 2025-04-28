import { Star, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface VendorCardProps {
  vendor: {
    id: number;
    name: string;
    image: string;
    rating: number;
    deliveryTime: string;
    categories: string[];
    location?: string;
    priceRange?: string;
  };
}

export default function VendorCard({ vendor }: VendorCardProps) {
  return (
    <Link to={`/vendor/${vendor.id}`}>
      <div className="vendor-card bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md">
        <div className="relative w-full">
          <div className="w-full h-48">
            <img
              src={vendor.image}
              alt={vendor.name}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="absolute top-4 right-4">
            <Badge className="bg-white text-black font-medium px-2 py-1 rounded-full">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
              {vendor.rating}
            </Badge>
          </div>

          {vendor.priceRange && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-white/80 backdrop-blur-sm text-black font-medium px-2 py-1 rounded-full">
                {vendor.priceRange}
              </Badge>
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold mb-2">{vendor.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <Clock className="h-4 w-4 mr-1" />
            <span>{vendor.deliveryTime}</span>
            {vendor.location && (
              <>
                <span className="mx-2">•</span>
                <span>{vendor.location}</span>
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {vendor.categories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="rounded-full font-normal"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
