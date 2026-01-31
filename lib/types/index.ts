export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
  rating?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  customer_email: string;
  items: Array<{
    product_id: string;
    quantity: number;
  }>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}