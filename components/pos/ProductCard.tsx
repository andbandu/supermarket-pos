import { Product } from "@/types/product";
import { formatMoney } from "@/lib/money";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <button
      onClick={() => onAddToCart(product)}
      className="flex w-full items-center gap-3 text-left shadow-sm rounded-xl bg-white overflow-hidden hover:shadow-primary/50 transition cursor-pointer p-3 active:scale-95 active:shadow-md"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-20 h-20 object-contain bg-white rounded-lg flex-shrink-0"
      />
      <div className="flex flex-col flex-1">
        <div className="text-xs text-muted-foreground">{product.sku}</div>
        <div className="font-medium line-clamp-3">{product.sinhalaName || product.name}</div>
        <div className="mt-1 text-sm">{formatMoney(product.price)}</div>
      </div>
    </button>
  );
}