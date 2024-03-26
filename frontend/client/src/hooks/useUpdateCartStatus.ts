/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from "react-redux";
import { useGetCartByUserId } from "../api/services/cartService";
import { accountSelector } from "../store/reducer/auth";
import { cartSelector } from "../store/reducer/cart";

export function useUpdateCartStatus() {
    const account = useSelector(accountSelector)
    const cartInReduxStore = useSelector(cartSelector);
    if (account) {
        const { data: cartData, refetch } = useGetCartByUserId(account._id);
        return { cartData, refetch, cartInReduxStore, account }
    }
    return { cartData: null }

}