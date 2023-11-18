import axiosClient from "../../config/axiosClient";
import { ProductEndpoint } from "./endpoint";

export const findAllProducts = async () => {
    try {
      const productResponse = await axiosClient.request(ProductEndpoint.findAll);
      console.log({ productResponse });
      return productResponse;
      
    } catch (err) {
      console.log("Error fetching ")
      return [];
    }
  };