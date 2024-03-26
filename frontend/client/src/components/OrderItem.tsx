import React from "react";
import { displayCurrencyVND } from "../utils";
interface OrderItemProps {
  product_thumb: string;
  product_name: string;
  quantity: number;
  product_price: number;
}
function OrderItem({
  product_thumb,
  product_name,
  quantity,
  product_price,
}: OrderItemProps) {
  return (
    <div className="grid grid-cols-2 justify-between px-8">
      <div className="flex items-start gap-x-4">
        <img
          src={product_thumb}
          className="h-20 border rounded-sm border-gray-500"
        />
        <div>
          <p className="mt-2 uppercase text-gray-900 font-semibold text-xl">
            {product_name}
          </p>
          <p className="text-lg text-gray-500">Số lượng: {quantity}</p>
        </div>
      </div>

      <p className="text-xl text-gray-800 font-medium text-right">
        {displayCurrencyVND(quantity * product_price)}
      </p>
    </div>
  );
}

export default OrderItem;
