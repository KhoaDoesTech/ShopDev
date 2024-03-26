/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../config/axiosClient";
import { ProductEndpoint } from "../endpoints/product";
import { Product } from "../../interfaces";

const findAllProducts = async () => {
    try {
        const productResponse = await axiosClient.request(ProductEndpoint.findAll);
        return productResponse.metadata;

    } catch (err) {
        console.log("Error fetching")
        console.log(err)
        return [];
    }
};
const findProductById = async (id: string): Promise<Product | any[]> => {
    try {
        const productResponse = await axiosClient.request(ProductEndpoint.findById(id));
        return productResponse.metadata;
    } catch (err) {
        console.log("Error fetching")
        console.log(err)
        return [];
    }
}
const findProductBySlug = async (slug: string): Promise<Product | any[]> => {
    try {
        const productResponse = await axiosClient.request(ProductEndpoint.findBySlug(slug));
        return productResponse.metadata;
    } catch (err) {
        console.log("Error fetching")
        console.log(err)
        return [];
    }
}
const findProductsByShopId = async (shopId: string): Promise<Product[] | any[]> => {
    try {
        const productResponse = await axiosClient.request(ProductEndpoint.findProductsByShopId(shopId));
        return productResponse.metadata;
    } catch (err) {
        console.log("Error fetching")
        console.log(err)
        return [];
    }
}
export const useFindProductById = (id: string) => {
    return useQuery({ queryKey: ['findProductById', id], queryFn: () => findProductById(id) })
}
export const useFindProductsByShopId = (id: string) => {
    return useQuery({ queryKey: ['findProductsByShopId', id], queryFn: () => findProductsByShopId(id) })
}
export const useFindProductBySlug = (slug: string) => {
    return useQuery({ queryKey: ['findProductBySlug', slug], queryFn: () => findProductBySlug(slug) })
}
export const useFindAllProduct = () => {
    return useQuery({ queryKey: ['findAllProducts'], queryFn: findAllProducts, staleTime: 5000, refetchIntervalInBackground: true })
}
