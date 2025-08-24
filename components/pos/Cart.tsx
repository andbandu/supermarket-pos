import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/product";
import { formatMoney } from "@/lib/money";
import { CartItemRow } from "./CartItemRow";
import { TotalsRow } from "./TotalsRow";

interface CartProps {
  cart: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  children: React.ReactNode;
}

export function Cart({
  cart,
  subtotal,
  tax,
  total,
  onIncrement,
  onDecrement,
  onRemove,
  onClear,
  children
}: CartProps) {
  return (
    <Card className="lg:col-span-3 p-4 flex flex-col ">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-normal">වර්තමාන බිල</h2>
        <div className="text-sm text-muted-foreground">
          Items: {cart.reduce((n, i) => n + i.qty, 0)}
        </div>
      </div>

      <ScrollArea className="flex-1 pr-2 max-h-[50vh]">
        <div className="space-y-3">
          {cart.map((item) => (
            <CartItemRow
              key={item.product.id}
              item={item}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onRemove={onRemove}
            />
          ))}
          {!cart.length && <div className="text-sm text-muted-foreground">Cart is empty.</div>}
        </div>
      </ScrollArea>

      <Separator className="my-4" />

      <div className="space-y-2 text-sm">
        <TotalsRow label="Subtotal" value={formatMoney(subtotal)} />
        <TotalsRow label={`Tax (8%)`} value={formatMoney(tax)} />
        <Separator />
        <TotalsRow 
          label={<span className="font-semibold">Total</span>} 
          value={<span className="font-semibold">{formatMoney(total)}</span>} 
        />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Button variant="outline" onClick={onClear} disabled={!cart.length}>
          Clear
        </Button>
        {children}
      </div>
    </Card>
  );
}