import { IoStorefront } from "react-icons/io5";
import OrderItemV2 from "./OrderItemV2";
import { displayCurrencyVND } from "../utils";
import { sumBy } from "lodash";

function OrderManageItem({ order }) {
  console.log({ order });
  return (
    <div className="bg-white rounded-md p-2 m-2 shadow-xl border-2 border-gray-100 flex items-ceter relative w-[70vw] mx-auto">
      <div>
        <h1 className="text-lg font-semibold px-8 flex items-center gap-x-3 my-4">
          <IoStorefront className="text-gray-800" />
          {order.orderItems[0].shop.name}
        </h1>
        <hr className="my-4" />
        <div className="flex items-start">
          <div>
            {order.orderItems[0].items
              .map((item) => (
                <OrderItemV2
                  product_name={item.product.product_name}
                  product_price={item.product.product_price}
                  product_thumb={item.product.product_thumb}
                  quantity={item.quantity}
                />
              ))
              .reverse()}
          </div>
          <div className="border-l border-l-gray-300 min-h-[150px] m-4"></div>
          <div className="">
            <p className="text-xl text-gray-600">
              Tổng cộng:{" "}
              <span className="text-orange-500 text-2xl font-semibold">
                {displayCurrencyVND(order.overallTotalPrice)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderManageItem;
