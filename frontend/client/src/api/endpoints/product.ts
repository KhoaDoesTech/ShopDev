/* eslint-disable @typescript-eslint/no-explicit-any */
export const ProductEndpoint = {
    // findAll: {
    //     url: "/product/published/all",
    //     method: "GET",
    // },
    findAll: {
        url: "/products",
        method: "GET",
    },
    findById: (id: string) => ({
        url: `/products/${id}`,
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