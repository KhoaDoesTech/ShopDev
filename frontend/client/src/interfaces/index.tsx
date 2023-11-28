import { IconType } from "react-icons";

export interface RouteProps {
  isAuth: boolean;
}
export interface Category {
  icon: IconType;
  label: string;
}
export interface LoginDto {
  email: string;
  password: string;
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
