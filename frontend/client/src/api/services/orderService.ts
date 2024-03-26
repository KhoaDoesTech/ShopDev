import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../config/axiosClient";
import { OrderObject } from "../../interfaces";
import { OrderEndpoint } from "../endpoints/order";
import { useCheckProductExists } from './cartService';

export const checkOut = async (data: OrderObject) => {
    try {
        const response = await axiosClient.request(OrderEndpoint.checkout(data));
        return response;

    } catch (error) {
        console.log(error)
        return null;
    }
}
export const getOrdersByUserId = async (userId: string) => {
    try {
        const response = await axiosClient.request(OrderEndpoint.getOrdersByUserId(userId));
        return response.data;

    } catch (error) {
        console.log(error)
        return null;
    }
}
export const useGetOrdersByUserId = (id: string) => {
    return useQuery({ queryKey: ['getOrdersByUserId', id], queryFn: () => getOrdersByUserId(id), refetchInterval: 10000 })
}