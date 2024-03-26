import React from "react";
import { displayCurrencyVND } from "../utils";
interface OrderItemProps {
  product_thumb: string;
  product_name: string;
  quantity: number;
  product_price: number;
}
function OrderItemV2({
  product_thumb,
  product_name,
  quantity,
  product_price,
}: OrderItemProps) {
  return (
    <div className="w-full">
      <div className="flex items-start gap-x-4 ">
        <img
          src={product_thumb}
          className="h-20 w-20 border rounded-sm border-gray-500"
        />
        <div>
          <p className="uppercase text-gray-900 font-semibold text-xl">
            {product_name}
          </p>
          <p className="text-lg text-gray-500">Số lượng: {quantity}</p>
          <p className="text-xl text-orange-500 font-medium">
            {displayCurrencyVND(quantity * product_price)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderItemV2;
