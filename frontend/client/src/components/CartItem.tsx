/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCartItem } from "../api/services/cartService";
import { Cart } from "../interfaces";
import { accountSelector } from "../store/reducer/auth";
import { selectOne } from "../store/reducer/cart";
import { displayCurrencyVND } from "../utils";
import Checkbox from "./Checkbox";
import QuantityInput from "./QuantityInput";

interface CartItemProps {
  cart: Cart;
}
const CartItem: React.FC<CartItemProps> = ({ cart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  console.log("Cart item: ", cart);
  const onChange = () => {
    dispatch(selectOne(cart.product._id));
  };
  useEffect(() => {
    async function requestApi() {
      await updateCartItem({
        userId: account._id,
        productId: cart.product._id,
        select: cart.select,
      });
    }
    requestApi();
  }, [account._id, cart.product._id, cart.select]);
  return (
    <div className="flex items-center gap-x-4 pl-2">
      {cart.quantity > 0 && (
        <Checkbox checked={cart.select} onChange={onChange} />
      )}
      <div
        className={clsx(
          "bg-white rounded-md shadow-md overflow-hidden relative cursor-pointer duration-100 px-4 py-2 flex-grow",
          { hidden: cart.quantity === 0 }
        )}
      >
        <div className="flex items-start">
          <img
            src={cart.product.product_thumb}
            className="h-[100px] w-[100px] border border-gray-300 object-contain"
          />
          <div className="ml-4 flex flex-col justify-between">
            <h1
              className="text-gray-900 font-semibold text-base w-full text-ellipsis line-clamp-2 hover:text-sky-500 hover:underline"
              onClick={() => navigate("/product/" + cart.product.product_slug)}
            >
              {/* {renderTag(cart.product?.tag)} */}
              {cart.product.product_name}
            </h1>
            <p className="mt-2 text-orange-500 font-medium text-xl">
              {displayCurrencyVND(cart.product?.product_price)}
            </p>
            <QuantityInput
              quantity={cart.quantity}
              cart={cart}
              hasLabel={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
