/* eslint-disable @typescript-eslint/no-explicit-any */
export const ProductEndpoint = {
    findAll: {
        url: "/product",
        method: "GET",
    },
    findProductsByShopId: (shopId: string) => ({
        url: `/product/product_shop`,
        method: "GET",
        params: {
            product_shop: shopId
        }
    }),
    findById: (id: string) => ({
        url: `/product/${id}`,
        method: "GET",
    }),
    findBySlug: (slug: string) => ({
        url: `/product/slug/${slug}`,
        method: "GET",
    }),
    createNewProduct: (data: any) => ({
        url: "/product",
        method: "POST",
        data
    }),
    updateProduct: (id: string, data: any) => ({
        url: `/product/${id}`,
        method: "PATCH",
        data
    }),
    deleteProduct: (id: string, data: any) => ({
        url: `/product/${id}`,
        method: "PATCH",
        data
    })
};