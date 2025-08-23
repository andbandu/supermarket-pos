"use client";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/types/product";
import { formatMoney } from "@/lib/money";

export function CartItemRow({
  item,
  inc,
  dec,
  remove,
}: {
  item: CartItem;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
}) {
  return (
    <div className="flex items-center justify-between border rounded-xl p-3">
      <div className="min-w-0">
        <div className="font-medium truncate">{item.product.name}</div>
        <div className="text-xs text-muted-foreground">{item.product.sku}</div>
        <div className="text-sm mt-1">{formatMoney(item.product.price)}</div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" onClick={() => dec(item.product.id)}>-</Button>
        <div className="w-8 text-center">{item.qty}</div>
        <Button variant="secondary" onClick={() => inc(item.product.id)}>+</Button>
        <Button variant="ghost" onClick={() => remove(item.product.id)}>
          Remove
        </Button>
      </div>
    </div>
  );
}
