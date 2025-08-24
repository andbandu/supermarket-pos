"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

import { Product, CartItem } from "@/types/product";
import { formatMoney } from "@/lib/money";
import { Cart } from "@/components/pos/Cart";
import { ProductGrid } from "@/components/pos/ProductGrid";
import { PaymentSheet } from "@/components/pos/PaymentSheet";

const TAX_RATE = 0.08;

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

  const addToCart = (product: Product) => {
    setCart((current) => {
      const idx = current.findIndex((c) => c.product.id === product.id);
      if (idx > -1) {
        const next = [...current];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...current, { product, qty: 1 }];
    });
    setQuery("");
  };

  const inc = (id: string) => {
    setCart((c) =>
      c.map((item) => (item.product.id === id ? { ...item, qty: item.qty + 1 } : item))
    );
  };

  const dec = (id: string) => {
    setCart((c) =>
      c.map((item) => (item.product.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item))
    );
  };

  const removeItem = (id: string) => {
    setCart((c) => c.filter((item) => item.product.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setTender("");
  };

  const handleCompleteSale = () => {
    if (!cart.length) {
      toast.error("Cart is empty");
      return;
    }
    if (method === "cash" && tenderNum < total) {
      toast.error("Insufficient cash tendered");
      return;
    }
    toast.success(`Sale completed (${method.toUpperCase()}) • Total ${formatMoney(total)}`);
    clearCart();
    setPayOpen(false);
  };

  return (
    <div className="pt-0 md:pt-0 max-w-[100%] mx-auto">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-5">
        <ProductGrid
          query={query}
          setQuery={setQuery}
          filteredProducts={filtered}
          onAddToCart={addToCart}
        />
        
        <Cart
          cart={cart}
          subtotal={subtotal}
          tax={tax}
          total={total}
          onIncrement={inc}
          onDecrement={dec}
          onRemove={removeItem}
          onClear={clearCart}
        >
          <PaymentSheet
            open={payOpen}
            onOpenChange={setPayOpen}
            method={method}
            setMethod={setMethod}
            tender={tender}
            setTender={setTender}
            total={total}
            change={change}
            onCompleteSale={handleCompleteSale}
            cartEmpty={!cart.length}
          />
        </Cart>
      </div>
    </div>
  );
}