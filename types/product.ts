export interface Category {
  id: string;
  name: string;
  sinhalaName: string;
  image?: string;
}


export type Product = {
  id: string;
  sku: string;       // barcode / SKU
  name: string;
  sinhalaName?: string;
  price: number;     // in your store currency
  image: string;     // product image URL
  categoryId: string;
};

export type CartItem = {
  product: Product;
  qty: number;
};