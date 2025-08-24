import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  query: string;
  setQuery: (query: string) => void;
  filteredProducts: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ query, setQuery, filteredProducts, onAddToCart }: ProductGridProps) {
  return (
    <div className="lg:col-span-9 p-4 bg-transparent border-none shadow-none">
      <div className="flex items-center gap-2">
        <Input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Scan barcode or search by name / SKU..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && filteredProducts[0]) onAddToCart(filteredProducts[0]);
          }}
        />
        <Button
          onClick={() => filteredProducts[0] && onAddToCart(filteredProducts[0])}
          className="shrink-0"
        >
          Add
        </Button>
      </div>

      <Separator className="my-4" />

      <ScrollArea className="h-[60vh] pr-2">
        <div className="grid grid-cols-2 xl:grid-cols-5 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
          {!filteredProducts.length && (
            <div className="col-span-full text-sm text-muted-foreground">
              No products match "{query}".
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}