/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../config/axiosClient";
import { AddToCartDto, UpdateCart, UpdateCartItem } from "../../interfaces";
import { CartEndpoint } from "../endpoints/cart";
import store from "../../store";
import { updateCartRedux } from "../../store/reducer/cart";

export const createOrAddItem = async (data: AddToCartDto) => {
    try {
        const response = await axiosClient.request(CartEndpoint.createOrAddItem(data));
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}
// export const updateCart = async (userId: string, data: UpdateCart) => {
//     try {
//         const response = await axiosClient.request(CartEndpoint.updateCart(userId, data));
//         return response;
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// }
export const updateCartItem = async (data: UpdateCartItem) => {
    try {
        const response = await axiosClient.request(CartEndpoint.updateCartItem(data));
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export const deleteCart = async (userId: string) => {
    try {
        const response = await axiosClient.request(CartEndpoint.deleteCart(userId));
        return response;

    } catch (error) {
        console.log(error);
        return null
    }
}
export const checkProductExists = async (userId: string, productId: string) => {
    try {
        const { productExists } = await axiosClient.request(CartEndpoint.checkProductExists(userId, productId));
        return productExists;
    } catch (error) {
        console.log(error)
        return null;
    }
}
export const getCartByUserId = async (userId: string) => {
    try {
        const response = await axiosClient.request(CartEndpoint.getCartByUserId(userId));
        console.log({ response })
        store.dispatch(updateCartRedux(response.items))
        return response;
    } catch (error) {
        console.log(error)
        return null;
    }
}
export const removeItemFromCart = async (userId: string, productId: string) => {
    try {
        const response = await axiosClient.request(CartEndpoint.removeItemFromCart(userId, productId));
        console.log({ response })
        return response;
    } catch (error) {
        console.log(error)
        return null;
    }
}
export const useCheckProductExists = (userId: string, productId: string) => {
    return useQuery({ queryKey: ['checkProductExists', productId], queryFn: () => checkProductExists(userId, productId) })
}
export const useGetCartByUserId = (userId: string) => {
    return useQuery({
        queryKey: ['getCartByUserId', userId], queryFn: () => getCartByUserId(userId),
        refetchIntervalInBackground: true, staleTime: 10000
    })
}