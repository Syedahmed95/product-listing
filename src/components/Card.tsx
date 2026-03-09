import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from './ui/badge';
import type { Product } from '../types';

export default function AppCard({
  products,
  selectedCategory,
}: {
  products: Product[];
  selectedCategory: string | null;
}) {
  const productsInCategory: Product[] = products.filter(
    (product: Product) =>
      product.category.toLowerCase() === selectedCategory?.toLowerCase()
  );

  if (productsInCategory.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No products in this category yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {productsInCategory.map((product: Product) => (
        <Card
          key={product.id}
          className="relative w-full overflow-hidden border bg-card pt-0 shadow-sm transition-shadow hover:shadow-md"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="aspect-video w-full object-cover rounded-t-md"
          />
          <CardHeader className="space-y-2">
            <CardTitle className="line-clamp-1 text-lg font-semibold">
              {product.title}
            </CardTitle>
            <CardDescription className="mt-1 line-clamp-3 text-sm text-muted-foreground">
              {product.description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex items-center justify-end pt-2">
            <Badge className="text-xs font-medium">
              Price: ${product.price}
            </Badge>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
