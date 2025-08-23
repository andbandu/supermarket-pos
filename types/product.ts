export type Product = {
  id: string;
  sku: string;       // barcode / SKU
  name: string;
  sinhalaName?: string;
  price: number;     // in your store currency
  image: string;     // product image URL
};

export type CartItem = {
  product: Product;
  qty: number;
};