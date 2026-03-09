import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { Product } from '../types';

export function AppSidebar({
  products,
  onCategorySelect,
  selectedCategory,
}: {
  products: Product[];
  onCategorySelect: (category: string) => void;
  selectedCategory: string | null;
}) {
  const groupByCategory = products.reduce(
    (acc: Record<string, Product[]>, product: Product) => {
      const category: string = product.category || 'Uncategorized';
      const CapitalCategory =
        category.charAt(0).toUpperCase() + category.slice(1);
      if (!acc[CapitalCategory]) {
        acc[CapitalCategory] = [];
      }
      acc[CapitalCategory].push(product);
      return acc;
    },
    {} as Record<string, Product[]>
  );
  const categories = Object.keys(groupByCategory);
  const totalCount = products.length;

  return (
    <Sidebar className="bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <SidebarHeader className="flex items-center justify-between border-b border-sidebar-border px-3 py-2">
        <span className="text-lg font-semibold tracking-tight">Products</span>
        <span className="rounded-full bg-sidebar-accent/20 px-2 py-0.5 text-xs text-sidebar-accent-foreground">
          Total items: {totalCount}
        </span>
      </SidebarHeader>
      <SidebarContent className="px-2 py-3">
        <SidebarGroup className="space-y-1">
          {categories.map((category) => {
            const active = selectedCategory === category;

            return (
              <SidebarMenu key={category}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={active}
                    className="flex items-center justify-between rounded-md text-sm"
                  >
                    <button
                      type="button"
                      onClick={() => onCategorySelect(category)}
                      className="flex w-full items-center justify-between gap-2"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            active
                              ? 'bg-sidebar-accent-foreground'
                              : 'bg-sidebar-border'
                          }`}
                        />
                        <span className="truncate">{category}</span>
                      </span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            );
          })}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
