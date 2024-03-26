/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginDto, RegisterDto } from "../../interfaces";

export const AuthEndpoint = {
    login: (data: LoginDto | any[]) => ({
        url: '/shop/login',
        method: "POST",
        data
    }),
    register: (data: RegisterDto | any[]) => ({
        url: '/shop/signup',
        method: "POST",
        data
    }),
}