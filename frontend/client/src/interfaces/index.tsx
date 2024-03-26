/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconType } from "react-icons";

export interface LoginDto {
  email: string;
  password: string;
}
export interface RouteProps {
  isAuth: boolean;
}
export interface AddToCartDto {
  userId: string;
  productId: string;
  quantity: number;
}
export interface CartItem {
  product: string;
  quantity: number;
}
export interface UpdateCart {
  userId?: string;
  items?: CartItem[];
}
export interface UpdateCartItem {
  userId: string;
  productId: string;
  quantity?: number;
  select?: boolean;
}
export interface Product {
  _id: string;
  product_name: string;
  product_price: number;
  product_thumb: string;
  product_ratingsAverage: number;
  product_slug: string;
  // rating: {
  //   rate: number;
  //   count: number;
  // };
  // price: number;
  // productOldPrice?: number; // Optional old price
  // image: string;
  // tag?: string; // Optional tag
}
export interface Cart {
  product: Product;
  quantity: number;
  select: boolean;
}
export interface Category {
  icon: IconType;
  label: string;
}
export interface LoginFormDto {
  email: string;
  password: string;
}
export interface LoginDto {
  email: string;
  password: string;
  role: string;
}
export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  role: string;
}
export interface RegisterFormDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  userId?: string;
}
export interface CategoryProps {
  initialImage: string;
  imageOnHover: string;
  label: string;
  color: string;
}
// Order

export interface OrderObject {
  userId: string;
  orderItems: OrderItem[];
  overallTotalPrice: number;
}
export interface OrderItem {
  shop: string;
  items: CartItem[];
  totalPrice: number;
}
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserProfileForm {
  name: string;
  email: string;
  phone: string;
  address: {
    detailAddress: string;
    ward: string;
    district: string;
    province: string;
  };
}
export interface User {
  name?: string;
  email?: string;
  phone?: string;
  address?: {
    detailAddress?: string;
    ward?: string;
    district?: string;
    province?: string;
  };
}
