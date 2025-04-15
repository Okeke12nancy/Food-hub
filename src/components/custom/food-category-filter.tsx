import { useState } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export default function FoodCategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: 'All', icon: '/src/assets/placeholder.svg' },
    { name: 'Pizza', icon: '/src/assets/placeholder.svg' },
    { name: 'Burgers', icon: '/src/assets/placeholder.svg' },
    { name: 'Sushi', icon: '/src/assets/placeholder.svg' },
    { name: 'Salads', icon: '/src/assets/placeholder.svg' },
    {
      name: 'Desserts',
      icon: '/src/assets/placeholder.svg',
    },
    { name: 'Indian', icon: '/src/assets/placeholder.svg' },
    { name: 'Mexican', icon: '/src/assets/placeholder.svg' },
    { name: 'Italian', icon: '/src/assets/placeholder.svg' },
    { name: 'Chinese', icon: '/src/assets/placeholder.svg' },
    {
      name: 'Breakfast',
      icon: '/src/assets/placeholder.svg',
    },
    { name: 'Vegan', icon: '/src/assets/placeholder.svg' },
  ];

  return (
    <ScrollArea className="w-full whitespace-nowrap pb-4">
      <div className="flex space-x-4">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() =>
              setSelectedCategory(
                category.name === 'All' ? null : category.name
              )
            }
            className={cn(
              'category-pill flex flex-col items-center space-y-2 min-w-[80px]',
              'transition-all duration-200'
            )}
          >
            <div
              className={cn(
                'relative w-16 h-16 rounded-full overflow-hidden',
                'flex items-center justify-center',
                selectedCategory === category.name ||
                  (category.name === 'All' && selectedCategory === null)
                  ? 'ring-2 ring-primary ring-offset-2'
                  : 'ring-1 ring-border'
              )}
            >
              <img
                src={category.icon || '/src/assets/placeholder.svg'}
                alt={category.name}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <span
              className={cn(
                'text-sm font-medium',
                selectedCategory === category.name ||
                  (category.name === 'All' && selectedCategory === null)
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {category.name}
            </span>
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
