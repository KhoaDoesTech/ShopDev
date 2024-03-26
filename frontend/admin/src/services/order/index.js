import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../config/axiosClient";
import { OrderEndpoint } from "./endpoint";

const findAllOrdersByShopId = async (shopId) => {
  try {
    const orderResponse = await axiosClient.request(
      OrderEndpoint.findOrdersByShopId(shopId)
    );
    return orderResponse.data.data;
  } catch (err) {
    console.log("Error fetching");
    console.log(err);
    return [];
  }
};
export const updateOrderStatus = async (orderId, status) => {
  try {
    const orderResponse = await axiosClient.request(
      OrderEndpoint.updateOrderStatus(orderId, status)
    );
    return orderResponse
  } catch (err) {
    console.log("Error fetching");
    console.log(err);
    return [];
  }
};
export const useFindAllOrdersByShopId = (shopId) => {
  return useQuery({
    queryKey: ["findAllOrdersByShopId", shopId],
    queryFn: () => findAllOrdersByShopId(shopId),
    staleTime: 1000,
    refetchInterval: 10000,
  });
};
