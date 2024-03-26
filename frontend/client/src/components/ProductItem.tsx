/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rate, Tag } from "antd";
import React from "react";

import clsx from "clsx";
import { TbShoppingCartPlus, TbShoppingCartX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  checkProductExists,
  createOrAddItem,
  removeItemFromCart,
} from "../api/services/cartService";
import { AddToCartDto, Cart, Product } from "../interfaces";
import { accountSelector } from "../store/reducer/auth";
import { cartSelector } from "../store/reducer/cart";
import { displayCurrencyVND } from "../utils";

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  const cartItems = useSelector(cartSelector);
  const renderTag = (tag: string) => {
    switch (tag) {
      case "new":
        return <Tag color="#40f23a">Mới</Tag>;
      case "hot":
        return <Tag color="#ff8d03">Nóng</Tag>;
      case "sale":
        return <Tag color="#f42020">Sale</Tag>;
      default:
        return <Tag color="#40f23a">Mới</Tag>;
    }
  };
  const isProductInCart =
    cartItems.find((item: Cart) => item?.product?._id === product?._id) ??
    false;
  const handleAddToCart = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    if (account) {
      const cart: AddToCartDto = {
        productId: product._id,
        userId: account._id,
        quantity: 1,
      };
      const checkExistRes = await checkProductExists(account._id, product._id);
      if (checkExistRes) {
        await removeItemFromCart(account._id, product._id);
      } else {
        await createOrAddItem(cart);
      }
    }
  };
  return (
    <div
      key={product._id}
      className="bg-white rounded-sm shadow-md overflow-hidden flex-grow relative cursor-pointer duration-100"
      onClick={() => navigate(`/product/${product.product_slug}`)}
    >
      <div className="add-to-cart">
        <div className="bg-gray-900 opacity-30 w-full h-[200px] absolute"></div>
        <button
          className={clsx(
            "bg-orange-500 text-white font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[100%] focus:outline-none focus:border-none",
            {
              "bg-red-500": isProductInCart,
            }
          )}
          onClick={handleAddToCart}
        >
          {!isProductInCart ? (
            <div className="flex items-center min-w-max gap-x-2">
              <TbShoppingCartPlus className="text-2xl" />{" "}
              <span className="text-xs">Thêm vào Giỏ</span>
            </div>
          ) : (
            <div className="flex items-center min-w-max gap-x-2">
              <TbShoppingCartX className="text-2xl" />
              <span className="text-xs">Xoá khỏi Giỏ</span>
            </div>
          )}
        </button>
      </div>
      <img
        src={product.product_thumb}
        alt={product.product_name}
        className="h-[200px] w-[200px] object-scale-down pb-2 mx-auto"
      />
      <div className="p-2 border-t-gray-100 border-t-2 card">
        <h1 className="text-gray-900 font-semibold text-base truncate">
          {product.product_name}
        </h1>
        <h1 className="text-orange-500 font-medium text-2xl">
          {displayCurrencyVND(product.product_price)}
        </h1>
        <div>
          <Rate
            disabled
            defaultValue={product.product_ratingsAverage}
            style={{ fontSize: 10 }}
            allowHalf
          />
          <span className="text-gray-400 text-sm ml-4">
            {/* ({product.rating.count}) */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
