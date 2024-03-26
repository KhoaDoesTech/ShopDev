import { User } from "../../interfaces";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const UserEndpoint = {
    // findAll: {
    //     url: "/product/published/all",
    //     method: "GET",
    // },
    findAll: {
        url: "/users",
        method: "GET",
    },
    findById: (id: string) => ({
        url: `/user/${id}`,
        method: "GET",
    }),
    findShopById: (id: string) => ({
        url: `/shop/${id}`,
        method: "GET",
    }),
    updateUser: (id: string, update: User) => ({
        url: "/user/" + id,
        method: "PUT",
        data: update
    })
};