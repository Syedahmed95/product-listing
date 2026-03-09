import { useEffect, useState } from 'react';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from './components/SideBar';
import { getProducts } from './services/api';
import AppCard from './components/Card';
import { Separator } from './components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './components/ui/breadcrumb';
import type { Product } from './types';
import { Skeleton } from './components/ui/skeleton';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar
        products={products}
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />

      <SidebarInset>
        <header className="flex items-center gap-2 border-b bg-background/80 p-3 backdrop-blur">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">{selectedCategory}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="p-4">
          <div className="mx-auto flex max-w-6xl flex-col space-y-4">
            <h1 className="text-2xl font-semibold">
              {selectedCategory
                ? `Products in ${selectedCategory}`
                : 'Products'}
            </h1>

            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="space-y-3">
                    <Skeleton className="aspect-video w-full rounded-md" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                  </div>
                ))}
              </div>
            ) : selectedCategory ? (
              <AppCard
                products={products}
                selectedCategory={selectedCategory}
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                Select a category from the sidebar to view products.
              </p>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
