// app/pos/page.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";


import { Product, CartItem } from "@/types/product";
import { roundUp } from "@/lib/round";
import { formatMoney } from "@/lib/money";
import { CartItemRow } from "@/components/pos/cart-item";

const TAX_RATE = 0.08; // 8% demo tax — replace later with DB/tenant setting

// Mock data for now; we’ll swap to DB soon
const MOCK_PRODUCTS: Product[] = [
  { 
    id: "p1", 
    sku: "890000000001", 
    name: "Bananas 1kg",
    sinhalaName: "කෙසෙල් 1kg",
    price: 2.49, 
    image: "https://www.bobtailfruit.co.uk/media/mageplaza/blog/post/4/2/42e9as7nataai4a6jcufwg.jpeg"
  },
  { 
    id: "p2", 
    sku: "890000000002", 
    name: "Raththi 400g",
    sinhalaName: "රත්ති 400g",     
    price: 1.29, 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2mVpDH11lo5FjnsHyEtraolP3G15scVve6g&s"
  },
  { 
    id: "p3", 
    sku: "890000000003", 
    name: "Bread",  
    sinhalaName: "පාන්",
    price: 1.99, 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8yKfSi8xAc6Uv0vh-2Z_uVvc1Yz6sNMA7Sw&s"
  },
  { 
    id: "p4", 
    sku: "890000000004", 
    name: "Eggs (12)",  
    sinhalaName: "බිත්තර (12)", 
    price: 3.49, 
    image: "https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg"
  },
  { 
    id: "p5", 
    sku: "890000000005", 
    name: "Araliya  Nadu Rice 5kg",   
    sinhalaName: "අරලිය නාඩු හාල් 5kg", 
    price: 6.99, 
    image: "https://img.drz.lazcdn.com/static/lk/p/891546ffe001dc63a02d69a443be2fb5.jpg_720x720q80.jpg"
  },
  { 
    id: "p6", 
    sku: "890000000006", 
    name: "Delmo Chicken 1kg", 
    sinhalaName: "ඩෙල්මෝ කුකුල් මස් 1kg",
    price: 5.49, 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN4Ayn8bmSiawRCLbxVVAaKhSGPoJChAXCewI9ApXgu0KI0scaTH4ebGv30dop-tqE0-c&usqp=CAU"
  },
];


export default function CashierPage() {
  const [query, setQuery] = React.useState("");
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [payOpen, setPayOpen] = React.useState(false);
  const [tender, setTender] = React.useState<string>("");
  const [method, setMethod] = React.useState<"cash" | "card">("cash");

  // Filter by name or SKU for scanner/search
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
    );
  }, [query]);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const tax = +(subtotal * TAX_RATE).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);
  const tenderNum = +(tender || "0");
  const change = +(tenderNum - total).toFixed(2);

  function addToCart(product: Product) {
    setCart((current) => {
      const idx = current.findIndex((c) => c.product.id === product.id);
      if (idx > -1) {
        const next = [...current];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...current, { product, qty: 1 }];
    });
    setQuery(""); // clear for quick scanning/entry
  }

  function inc(id: string) {
    setCart((c) =>
      c.map((item) => (item.product.id === id ? { ...item, qty: item.qty + 1 } : item))
    );
  }
  function dec(id: string) {
    setCart((c) =>
      c
        .map((item) => (item.product.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item))
    );
  }
  function removeItem(id: string) {
    setCart((c) => c.filter((item) => item.product.id !== id));
  }
  function clearCart() {
    setCart([]);
    setTender("");
  }

  function handleCompleteSale() {
    if (!cart.length) {
      toast.error("Cart is empty");
      return;
    }
    if (method === "cash" && tenderNum < total) {
      toast.error("Insufficient cash tendered");
      return;
    }
    // For MVP UI only: simulate success
    toast.success(`Sale completed (${method.toUpperCase()}) • Total ${formatMoney(total)}`);
    clearCart();
    setPayOpen(false);
  }

  function remove(id: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="pt-0 md:pt-0  max-w-[100%] mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4 bg-white py-5 px-5 shadow-sm">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Cashier</h1>
          <Badge variant="secondary">MVP</Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(
            new Date()
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-5 ">

        {/* Left: Product search & list */}
        <Card className="lg:col-span-9 p-4 bg-transparent border-none shadow-none">
          <div className="flex items-center gap-2">
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Scan barcode or search by name / SKU..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && filtered[0]) addToCart(filtered[0]);
              }}
            />
            <Button
              onClick={() => filtered[0] && addToCart(filtered[0])}
              className="shrink-0"
            >
              Add
            </Button>
          </div>

          <Separator className="my-4" />

          <ScrollArea className="h-[60vh] pr-2">
            <div className="grid grid-cols-2  xl:grid-cols-5 gap-3">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => addToCart(p)}
                  className="flex w-full items-center gap-3 text-left shadow-sm rounded-xl bg-white overflow-hidden hover:shadow-primary/50 transition cursor-pointer p-3  active:scale-95 active:shadow-md"
                >
                  {/* Product Image */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-20 h-20 object-contain bg-white rounded-lg flex-shrink-0"
                  />

                  {/* Product Details */}
                  <div className="flex flex-col flex-1">
                    <div className="text-xs text-muted-foreground">{p.sku}</div>
                    <div className="font-medium line-clamp-2">{p.sinhalaName}</div>
                    <div className="mt-1 text-sm">{formatMoney(p.price)}</div>
                  </div>
                </button>
              ))}
              {!filtered.length && (
                <div className="col-span-full text-sm text-muted-foreground">
                  No products match “{query}”.
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>

        {/* Right: Cart */}
        <Card className="lg:col-span-3 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-normal">වර්තමාන බිල</h2>
            <div className="text-sm text-muted-foreground">
              Items: {cart.reduce((n, i) => n + i.qty, 0)}
            </div>
          </div>

          <ScrollArea className="flex-1 pr-2">
            <div className="space-y-3">
              {cart.map((item) => (
                <CartItemRow
                  key={item.product.id}
                  item={item}
                  inc={inc}
                  dec={dec}
                  remove={remove}
                />
              ))}
              {!cart.length && <div className="text-sm text-muted-foreground">Cart is empty.</div>}
            </div>
          </ScrollArea>

          <Separator className="my-4" />

          {/* Totals */}
          <div className="space-y-2 text-sm">
            <Row label="Subtotal" value={formatMoney(subtotal)} />
            <Row label={`Tax (${(TAX_RATE * 100).toFixed(0)}%)`} value={formatMoney(tax)} />
            <Separator />
            <Row label={<span className="font-semibold">Total</span>} value={<span className="font-semibold">{formatMoney(total)}</span>} />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Button variant="outline" onClick={clearCart} disabled={!cart.length}>
              Clear
            </Button>

            <Sheet open={payOpen} onOpenChange={setPayOpen}>
              <SheetTrigger asChild>
                <Button className="flex-1" disabled={!cart.length}>
                  Charge {cart.length ? `• ${formatMoney(total)}` : ""}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Complete Payment</SheetTitle>
                </SheetHeader>

                <Tabs
                  value={method}
                  onValueChange={(v) => setMethod(v as "cash" | "card")}
                  className="mt-4"
                >
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="cash">Cash</TabsTrigger>
                    <TabsTrigger value="card">Card</TabsTrigger>
                  </TabsList>

                  <TabsContent value="cash" className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Amount tendered</label>
                      <Input
                        inputMode="decimal"
                        placeholder="0.00"
                        value={tender}
                        onChange={(e) => setTender(e.target.value)}
                      />
                      <div className="text-sm text-muted-foreground">
                        Change: <span className="font-medium">{formatMoney(Math.max(0, change))}</span>
                      </div>
                    </div>
                    <QuickCash onPick={(amt) => setTender(amt.toFixed(2))} total={total} />
                  </TabsContent>

                  <TabsContent value="card" className="mt-4 space-y-2">
                    <div className="text-sm text-muted-foreground">
                      Card payment simulated for MVP.
                    </div>
                  </TabsContent>
                </Tabs>

                <SheetFooter className="mt-6">
                  <Button className="w-full" onClick={handleCompleteSale}>
                    Complete Sale
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground">{label}</div>
      <div>{value}</div>
    </div>
  );
}

function QuickCash({ total, onPick }: { total: number; onPick: (n: number) => void }) {
  const opts = [total, roundUp(total, 0.5), roundUp(total, 1), roundUp(total, 5), roundUp(total, 10)];
  return (
    <div className="flex flex-wrap gap-2">
      {opts.map((n, i) => (
        <Button key={i} variant="secondary" onClick={() => onPick(n)}>
          {formatMoney(n)}
        </Button>
      ))}
    </div>
  );
}


