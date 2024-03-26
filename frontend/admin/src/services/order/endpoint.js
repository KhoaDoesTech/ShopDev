export const OrderEndpoint = {
    findOrdersByShopId: (shopId) => ({
        url: `/order/get-by-shop-id/${shopId}` ,
        method: "GET",
    }),
    updateOrderStatus: (orderId, status) => ({
        url: "/order/" + orderId,
        method: "PUT",
        data: {
            newStatus: status
        }
    })
}