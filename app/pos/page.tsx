"use client";

import * as React from "react";
import { toast } from "sonner";
import { Product, CartItem, Category } from "@/types/product";
import { formatMoney } from "@/lib/money";
import { Cart } from "@/components/pos/Cart";
import { ProductGrid } from "@/components/pos/ProductGrid";
import { PaymentSheet } from "@/components/pos/PaymentSheet";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

const TAX_RATE = 0.08;

// Mock categories
const MOCK_CATEGORIES: Category[] = [
  { id: "cat1", name: "Fruits & Vegetables", sinhalaName: "පලතුරු සහ එළවළු" },
  { id: "cat2", name: "Dairy & Eggs", sinhalaName: "කිරි සහ බිත්තර" },
  { id: "cat3", name: "Bakery", sinhalaName: "පාන් ශාලා" },
  { id: "cat4", name: "Rice & Grains", sinhalaName: "හාල් සහ ධාන්‍ය" },
  { id: "cat5", name: "Meat & Poultry", sinhalaName: "මස් සහ කුකුල් මස්" },
  { id: "cat6", name: "Beverages", sinhalaName: "පාන" },
  { id: "cat7", name: "Snacks", sinhalaName: "ලුහුඬු කෑම" },
];

// Mock products with category IDs
const MOCK_PRODUCTS: Product[] = [
  // Fruits & Vegetables (cat1)
  { 
    id: "p1", 
    sku: "890000000001", 
    name: "Bananas 1kg",
    sinhalaName: "කෙසෙල් 1kg",
    price: 2.49, 
    image: "https://www.bobtailfruit.co.uk/media/mageplaza/blog/post/4/2/42e9as7nataai4a6jcufwg.jpeg",
    categoryId: "cat1"
  },
  { 
    id: "p2", 
    sku: "890000000002", 
    name: "Apples 500g",
    sinhalaName: "ඇපල් 500g",
    price: 3.99, 
    image: "https://example.com/apples.jpg",
    categoryId: "cat1"
  },
  { 
    id: "p3", 
    sku: "890000000003", 
    name: "Oranges 1kg",
    sinhalaName: "දොඩම් 1kg",
    price: 4.29, 
    image: "https://example.com/oranges.jpg",
    categoryId: "cat1"
  },
  { 
    id: "p4", 
    sku: "890000000004", 
    name: "Tomatoes 500g",
    sinhalaName: "තක්කාලි 500g",
    price: 1.99, 
    image: "https://example.com/tomatoes.jpg",
    categoryId: "cat1"
  },
  { 
    id: "p5", 
    sku: "890000000005", 
    name: "Potatoes 1kg",
    sinhalaName: "අල 1kg",
    price: 2.29, 
    image: "https://example.com/potatoes.jpg",
    categoryId: "cat1"
  },
  { 
    id: "p6", 
    sku: "890000000006", 
    name: "Onions 1kg",
    sinhalaName: "ලූනු 1kg",
    price: 1.79, 
    image: "https://example.com/onions.jpg",
    categoryId: "cat1"
  },
  { 
    id: "p7", 
    sku: "890000000007", 
    name: "Carrots 500g",
    sinhalaName: "කැරට් 500g",
    price: 1.49, 
    image: "https://example.com/carrots.jpg",
    categoryId: "cat1"
  },
  { 
    id: "p8", 
    sku: "890000000008", 
    name: "Cabbage 1pc",
    sinhalaName: "ගෝවා 1pc",
    price: 2.99, 
    image: "https://example.com/cabbage.jpg",
    categoryId: "cat1"
  },

  // Dairy & Eggs (cat2)
  { 
    id: "p9", 
    sku: "890000000009", 
    name: "Raththi 400g",
    sinhalaName: "රත්ති 400g",     
    price: 1.29, 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2mVpDH11lo5FjnsHyEtraolP3G15scVve6g&s",
    categoryId: "cat2"
  },
  { 
    id: "p10", 
    sku: "890000000010", 
    name: "Eggs (12)",  
    sinhalaName: "බිත්තර (12)", 
    price: 3.49, 
    image: "https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg",
    categoryId: "cat2"
  },
  { 
    id: "p11", 
    sku: "890000000011", 
    name: "Anchor Butter 200g",
    sinhalaName: "ඇන්කර් බටර් 200g",
    price: 2.99, 
    image: "https://example.com/butter.jpg",
    categoryId: "cat2"
  },
  { 
    id: "p12", 
    sku: "890000000012", 
    name: "Highland Yogurt 500g",
    sinhalaName: "හයිලන්ඩ් දහී 500g",
    price: 2.49, 
    image: "https://example.com/yogurt.jpg",
    categoryId: "cat2"
  },
  { 
    id: "p13", 
    sku: "890000000013", 
    name: "Kotmale Cheese 200g",
    sinhalaName: "කොත්මලේ චීස් 200g",
    price: 4.99, 
    image: "https://example.com/cheese.jpg",
    categoryId: "cat2"
  },

  // Bakery (cat3)
  { 
    id: "p14", 
    sku: "890000000014", 
    name: "Bread",  
    sinhalaName: "පාන්",
    price: 1.99, 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8yKfSi8xAc6Uv0vh-2Z_uVvc1Yz6sNMA7Sw&s",
    categoryId: "cat3"
  },
  { 
    id: "p15", 
    sku: "890000000015", 
    name: "Buns 6pcs",
    sinhalaName: "බන්ස් 6pcs",
    price: 2.29, 
    image: "https://example.com/buns.jpg",
    categoryId: "cat3"
  },
  { 
    id: "p16", 
    sku: "890000000016", 
    name: "Cake Slice",
    sinhalaName: "කේක් කැබල්ල",
    price: 1.49, 
    image: "https://example.com/cake.jpg",
    categoryId: "cat3"
  },
  { 
    id: "p17", 
    sku: "890000000017", 
    name: "Croissant 4pcs",
    sinhalaName: "ක්‍රොයිසන් 4pcs",
    price: 3.99, 
    image: "https://example.com/croissant.jpg",
    categoryId: "cat3"
  },

  // Rice & Grains (cat4)
  { 
    id: "p18", 
    sku: "890000000018", 
    name: "Araliya Nadu Rice 5kg",   
    sinhalaName: "අරලිය නාඩු හාල් 5kg", 
    price: 6.99, 
    image: "https://img.drz.lazcdn.com/static/lk/p/891546ffe001dc63a02d69a443be2fb5.jpg_720x720q80.jpg",
    categoryId: "cat4"
  },
  { 
    id: "p19", 
    sku: "890000000019", 
    name: "Samba Rice 5kg",   
    sinhalaName: "සාම්බා හාල් 5kg", 
    price: 7.49, 
    image: "https://example.com/samba-rice.jpg",
    categoryId: "cat4"
  },
  { 
    id: "p20", 
    sku: "890000000020", 
    name: "Red Rice 2kg",   
    sinhalaName: "රතු හාල් 2kg", 
    price: 4.99, 
    image: "https://example.com/red-rice.jpg",
    categoryId: "cat4"
  },
  { 
    id: "p21", 
    sku: "890000000021", 
    name: "Lentils 500g",   
    sinhalaName: "පරිප්පු 500g", 
    price: 2.29, 
    image: "https://example.com/lentils.jpg",
    categoryId: "cat4"
  },
  { 
    id: "p22", 
    sku: "890000000022", 
    name: "Chickpeas 500g",   
    sinhalaName: "කඩල 500g", 
    price: 2.79, 
    image: "https://example.com/chickpeas.jpg",
    categoryId: "cat4"
  },

  // Meat & Poultry (cat5)
  { 
    id: "p23", 
    sku: "890000000023", 
    name: "Delmo Chicken 1kg", 
    sinhalaName: "ඩෙල්මෝ කුකුල් මස් 1kg",
    price: 5.49, 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN4Ayn8bmSiawRCLbxVVAaKhSGPoJChAXCewI9ApXgu0KI0scaTH4ebGv30dop-tqE0-c&usqp=CAU",
    categoryId: "cat5"
  },
  { 
    id: "p24", 
    sku: "890000000024", 
    name: "Chicken Breast 500g", 
    sinhalaName: "කුකුල් මස් බ්‍රෙස්ට් 500g",
    price: 4.29, 
    image: "https://example.com/chicken-breast.jpg",
    categoryId: "cat5"
  },
  { 
    id: "p25", 
    sku: "890000000025", 
    name: "Beef 500g", 
    sinhalaName: "ගව මස් 500g",
    price: 6.99, 
    image: "https://example.com/beef.jpg",
    categoryId: "cat5"
  },
  { 
    id: "p26", 
    sku: "890000000026", 
    name: "Pork 500g", 
    sinhalaName: "ඌරු මස් 500g",
    price: 5.79, 
    image: "https://example.com/pork.jpg",
    categoryId: "cat5"
  },
  { 
    id: "p27", 
    sku: "890000000027", 
    name: "Fish Tuna 300g", 
    sinhalaName: "ටියුනා මාළු 300g",
    price: 4.49, 
    image: "https://example.com/tuna.jpg",
    categoryId: "cat5"
  },

  // Beverages (cat6)
  { 
    id: "p28", 
    sku: "890000000028", 
    name: "Coca-Cola 1.5L", 
    sinhalaName: "කොකා-කෝලා 1.5L",
    price: 2.99, 
    image: "https://example.com/cocacola.jpg",
    categoryId: "cat6"
  },
  { 
    id: "p29", 
    sku: "890000000029", 
    name: "Elephant Ginger Beer 500ml", 
    sinhalaName: "ඇලිෆන්ට් ජින්ජර් බීයර් 500ml",
    price: 1.99, 
    image: "https://example.com/ginger-beer.jpg",
    categoryId: "cat6"
  },
  { 
    id: "p30", 
    sku: "890000000030", 
    name: "Nescafe Coffee 50g", 
    sinhalaName: "නෙස්කැෆේ කෝපි 50g",
    price: 3.49, 
    image: "https://example.com/coffee.jpg",
    categoryId: "cat6"
  },
  { 
    id: "p31", 
    sku: "890000000031", 
    name: "Dilmah Tea 100g", 
    sinhalaName: "ඩිල්මාහ් තේ 100g",
    price: 2.79, 
    image: "https://example.com/tea.jpg",
    categoryId: "cat6"
  },
  { 
    id: "p32", 
    sku: "890000000032", 
    name: "Milo 400g", 
    sinhalaName: "මයිලෝ 400g",
    price: 4.99, 
    image: "https://example.com/milo.jpg",
    categoryId: "cat6"
  },

  // Snacks & Confectionery (cat7)
  { 
    id: "p33", 
    sku: "890000000033", 
    name: "Tikki Chips 100g", 
    sinhalaName: "ටික්කි චිප්ස් 100g",
    price: 1.29, 
    image: "https://example.com/tikki-chips.jpg",
    categoryId: "cat7"
  },
  { 
    id: "p34", 
    sku: "890000000034", 
    name: "Munchee Biscuits 200g", 
    sinhalaName: "මන්චි බිස්කට් 200g",
    price: 1.79, 
    image: "https://example.com/biscuits.jpg",
    categoryId: "cat7"
  },
  { 
    id: "p35", 
    sku: "890000000035", 
    name: "Kandos Chocolate 100g", 
    sinhalaName: "කැන්ඩෝස් චොකලට් 100g",
    price: 2.49, 
    image: "https://example.com/chocolate.jpg",
    categoryId: "cat7"
  },
  { 
    id: "p36", 
    sku: "890000000036", 
    name: "Gummy Bears 150g", 
    sinhalaName: "ගමී බෙයර්ස් 150g",
    price: 1.99, 
    image: "https://example.com/gummy-bears.jpg",
    categoryId: "cat7"
  },

  // Frozen Foods (cat8)
  { 
    id: "p37", 
    sku: "890000000037", 
    name: "Frozen Vegetables 500g", 
    sinhalaName: "හිම එලවළු 500g",
    price: 3.29, 
    image: "https://example.com/frozen-veggies.jpg",
    categoryId: "cat8"
  },
  { 
    id: "p38", 
    sku: "890000000038", 
    name: "Ice Cream 1L", 
    sinhalaName: "අයිස්ක්‍රීම් 1L",
    price: 4.99, 
    image: "https://example.com/ice-cream.jpg",
    categoryId: "cat8"
  },
  { 
    id: "p39", 
    sku: "890000000039", 
    name: "Frozen Fish Fingers 300g", 
    sinhalaName: "හිම මාළු ඇඟිලි 300g",
    price: 3.79, 
    image: "https://example.com/fish-fingers.jpg",
    categoryId: "cat8"
  },

  // Personal Care (cat9)
  { 
    id: "p40", 
    sku: "890000000040", 
    name: "Lifebuoy Soap 100g", 
    sinhalaName: "ලයිෆ්බෝය් සබන් 100g",
    price: 0.99, 
    image: "https://example.com/soap.jpg",
    categoryId: "cat9"
  },
  { 
    id: "p41", 
    sku: "890000000041", 
    name: "Sunsilk Shampoo 400ml", 
    sinhalaName: "සන්සිල්ක් ෂැම්පු 400ml",
    price: 4.49, 
    image: "https://example.com/shampoo.jpg",
    categoryId: "cat9"
  },
  { 
    id: "p42", 
    sku: "890000000042", 
    name: "Colgate Toothpaste 100g", 
    sinhalaName: "කොල්ගේට් බෙහෙත්දඬු 100g",
    price: 2.29, 
    image: "https://example.com/toothpaste.jpg",
    categoryId: "cat9"
  },
  { 
    id: "p43", 
    sku: "890000000043", 
    name: "Lux Body Wash 250ml", 
    sinhalaName: "ලක්ස් බොඩි වොෂ් 250ml",
    price: 3.99, 
    image: "https://example.com/body-wash.jpg",
    categoryId: "cat9"
  },

  // Household (cat10)
  { 
    id: "p44", 
    sku: "890000000044", 
    name: "Sunlight Dishwash 500ml", 
    sinhalaName: "සන්ලයිට් ඩිෂ්වොෂ් 500ml",
    price: 2.49, 
    image: "https://example.com/dishwash.jpg",
    categoryId: "cat10"
  },
  { 
    id: "p45", 
    sku: "890000000045", 
    name: "Rin Detergent 1kg", 
    sinhalaName: "රින් ඩිටර්ජන්ට් 1kg",
    price: 3.99, 
    image: "https://example.com/detergent.jpg",
    categoryId: "cat10"
  },
  { 
    id: "p46", 
    sku: "890000000046", 
    name: "Toilet Paper 4pk", 
    sinhalaName: "ටොයිලට් පේපර් 4pk",
    price: 2.99, 
    image: "https://example.com/toilet-paper.jpg",
    categoryId: "cat10"
  },
  { 
    id: "p47", 
    sku: "890000000047", 
    name: "Floor Cleaner 1L", 
    sinhalaName: "ෆ්ලෝර් ක්ලීනර් 1L",
    price: 4.29, 
    image: "https://example.com/floor-cleaner.jpg",
    categoryId: "cat10"
  },

  // Baby Care (cat11)
  { 
    id: "p48", 
    sku: "890000000048", 
    name: "Pampers Diapers M 20pcs", 
    sinhalaName: "පැම්පර්ස් ඩයපර්ස් M 20pcs",
    price: 8.99, 
    image: "https://example.com/diapers.jpg",
    categoryId: "cat11"
  },
  { 
    id: "p49", 
    sku: "890000000049", 
    name: "Baby Formula 400g", 
    sinhalaName: "ළමා සූත්‍ර 400g",
    price: 12.99, 
    image: "https://example.com/baby-formula.jpg",
    categoryId: "cat11"
  },
  { 
    id: "p50", 
    sku: "890000000050", 
    name: "Baby Shampoo 200ml", 
    sinhalaName: "ළමා ෂැම්පු 200ml",
    price: 3.49, 
    image: "https://example.com/baby-shampoo.jpg",
    categoryId: "cat11"
  },
  { 
    id: "p51", 
    sku: "890000000051", 
    name: "Baby Wipes 80pcs", 
    sinhalaName: "ළමා වයිප්ස් 80pcs",
    price: 2.99, 
    image: "https://example.com/baby-wipes.jpg",
    categoryId: "cat11"
  },

  // Pet Care (cat12)
  { 
    id: "p52", 
    sku: "890000000052", 
    name: "Dog Food 2kg", 
    sinhalaName: "බල්ලන්ගේ ආහාර 2kg",
    price: 7.99, 
    image: "https://example.com/dog-food.jpg",
    categoryId: "cat12"
  },
  { 
    id: "p53", 
    sku: "890000000053", 
    name: "Cat Food 1.5kg", 
    sinhalaName: "පූසන්ගේ ආහාර 1.5kg",
    price: 6.49, 
    image: "https://example.com/cat-food.jpg",
    categoryId: "cat12"
  }
];

export default function CashierPage() {
  const [query, setQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [payOpen, setPayOpen] = React.useState(false);
  const [tender, setTender] = React.useState<string>("");
  const [method, setMethod] = React.useState<"cash" | "card">("cash");


  

   // Filter products by search query AND category
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    
    let filteredProducts = MOCK_PRODUCTS;
    
    // First filter by category
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(p => p.categoryId === selectedCategory);
    }
    
    // Then filter by search query
    if (q) {
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          (p.sinhalaName && p.sinhalaName.toLowerCase().includes(q))
      );
    }
    
    return filteredProducts;
  }, [query, selectedCategory]);;

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

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setQuery(""); // Clear search when changing category
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


  // Keyboard shortcuts
  useKeyboardShortcuts({
    'f1': () => !cart.length && setPayOpen(true), // F1 to open payment
    'f2': () => handleQuickCompleteSale(), // F2 to complete sale
    'f3': () => handleQuickPrint(), // F3 to print bill
    'f8': () => clearCart(), // F8 to clear cart
    'f9': () => setQuery(""), // F9 to clear search
    'escape': () => {
      setQuery("");
      setPayOpen(false);
    },
    'ctrl+enter': (e) => {
      e.preventDefault();
      if (filtered[0]) addToCart(filtered[0]);
    },
    'ctrl+p': (e) => {
      e.preventDefault();
      handleQuickPrint();
    },
    'ctrl+s': (e) => {
      e.preventDefault();
      handleQuickCompleteSale();
    }
  });

  const handleQuickCompleteSale = () => {
    if (!cart.length) {
      toast.error("Cart is empty");
      return;
    }
    
    // For quick completion, assume cash payment with exact amount
    if (method === "cash") {
      setTender(total.toFixed(2));
    }
    
    handleCompleteSale();
  };


   const handleQuickPrint = () => {
    if (!cart.length) {
      toast.error("No bill to print");
      return;
    }
    
    // Simulate print action - you'll need to integrate with your BillPrint component
    toast.info("Printing bill...", {
      action: {
        label: "Open Print Dialog",
        onClick: () => {
          // This would trigger your print functionality
          console.log("Print bill triggered");
        }
      }
    });
  };

  React.useEffect(() => {
  const handleGlobalKeyDown = (event: KeyboardEvent) => {
    // Prevent default behavior for function keys
    if (event.key.startsWith('F') && !event.key.startsWith('F1') && parseInt(event.key.slice(1)) <= 12) {
      event.preventDefault();
    }
  };

  window.addEventListener('keydown', handleGlobalKeyDown);
  return () => window.removeEventListener('keydown', handleGlobalKeyDown);
}, []);

  return (
    <div className="pt-0 md:pt-0 max-w-[100%] mx-auto">
      
      

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-5  mx-auto">
        <ProductGrid
          query={query}
          setQuery={setQuery}
          filteredProducts={filtered}
          categories={MOCK_CATEGORIES}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
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
          cart={cart} // Add this
          subtotal={subtotal} // Add this
          tax={tax} // Add this
        />
        </Cart>
      </div>
    </div>
  );
}