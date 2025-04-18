export type ProductSize = "400ML" | "500ML" | "800ML" | "1600ML" | "1L" | "2L" | "4L" | "5L" | "8L" | "10L";

export interface ProductVariant {
  id: string;
  size: ProductSize;
  price: number;
  stock: number;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  variants: ProductVariant[];
  mainImage: string;
  sampleAvailable: boolean;
  samplePrice: number;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  image: string;
  isSample?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address?: Address;
  gstDetails?: GSTDetails;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  name: string;
  email: string;
  phone: string;
}

export interface GSTDetails {
  gstNumber: string;
  businessName: string;
  address: Address;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  paymentMethod: string;
  shippingAddress: Address;
  gstDetails?: GSTDetails;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: "admin" | "staff";
}
