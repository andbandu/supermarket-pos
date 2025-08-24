import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/product";
import { formatMoney } from "@/lib/money";

interface CartItemRowProps {
  item: CartItem;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
}

export function CartItemRow({ item, onIncrement, onDecrement, onRemove }: CartItemRowProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-10 h-10 object-contain bg-white rounded"
      />
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{item.product.sinhalaName}</div>
        <div className="text-muted-foreground">{formatMoney(item.product.price)}</div>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={() => onDecrement(item.product.id)}
        >
          -
        </Button>
        <span className="text-sm w-6 text-center">{item.qty}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={() => onIncrement(item.product.id)}
        >
          +
        </Button>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(item.product.id)}
        className="text-destructive hover:text-destructive"
      >
        Remove
      </Button>
    </div>
  );
}