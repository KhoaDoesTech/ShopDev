/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rate } from "antd";
import React, { useState } from "react";
import { displayCurrencyVND } from "../utils";
import { Tag } from "antd";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { increaseCart } from "../store/reducer/product";
import { useNavigate } from "react-router-dom";

interface ProductItemProps {
  id: string;
  product_name: string;
  rating: any;
  product_price: number;
  product_old_price?: number;
  product_thumb: string;
  tag: string;
}

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  product_name,
  rating,
  product_price,
  product_old_price,
  product_thumb,
  tag,
}) => {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  return (
    <div
      key={id}
      className="bg-white rounded-lg shadow-md overflow-hidden flex-grow relative cursor-pointer hover:scale-110 duration-100"
      onMouseEnter={() => setShowCart(true)}
      onMouseLeave={() => setShowCart(false)}
      onClick={() => navigate(`/product/${id}`)}
    >
      {showCart && (
        <FaShoppingCart
          className="absolute right-2 top-2 bg-transparent text-gray-400 cursor-pointer fade-in text-2xl"
          onClick={(event) => {
            event.stopPropagation();
            dispatch(increaseCart());
          }}
        />
      )}
      <img
        src={product_thumb}
        alt={product_name}
        className="h-[150px] object-cover pb-2"
      />
      <div className="p-2 border-t-gray-100 border-t-2 card">
        <h1 className="text-gray-900 font-semibold text-base w-full text-ellipsis line-clamp-2 ">
          {renderTag(tag)}
          {product_name}
        </h1>
        <h1 className="text-orange-500 font-medium text-2xl">
          {displayCurrencyVND(product_price)}
        </h1>
        <div>
          <Rate disabled defaultValue={rating.rate} style={{ fontSize: 10 }} />
          <span className="text-gray-400 text-sm ml-4">({rating.count})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
