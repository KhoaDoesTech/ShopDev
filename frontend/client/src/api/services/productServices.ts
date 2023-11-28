import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../config/axiosClient";
import { ProductEndpoint } from "../endpoints/product";

const findAllProducts = async () => {
    try {
        const productResponse = await axiosClient.request(ProductEndpoint.findAll);
        console.log({ productResponse })
        return productResponse;

    } catch (err) {
        console.log("Error fetching")
        console.log(err)
        return [];
    }
};
const findProductById = async (id: string) => {
    try {
        const productResponse = await axiosClient.request(ProductEndpoint.findById(id));
        return productResponse;
    } catch (err) {
        console.log("Error fetching")
        console.log(err)
        return [];
    }
}
export const useFindProductById = (id: string) => {
    return useQuery({ queryKey: ['findProductById', id], queryFn: () => findProductById(id) })
}
export const useFindAllProduct = () => {
    return useQuery({ queryKey: ['findAllProducts'], queryFn: findAllProducts, staleTime: 5000 })
}
