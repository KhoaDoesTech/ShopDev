import { OrderObject } from "../../interfaces";

export const OrderEndpoint = {
    checkout: (data: OrderObject) => ({
        url: "/order/checkout",
        method: "POST",
        data
    }),
    getOrdersByUserId: (userId: string) => ({
        url: "/order/get-by-user-id/" + userId,
        method: "GET"
    })
}