import { useSelector, useDispatch } from "react-redux";
import HomeLayout from "../layouts/HomeLayout";
import { cartSelector } from "../store/reducer/cart";
import {
  convertToOrderItem,
  createOrderObject,
  displayCurrencyVND,
} from "../utils";
import { Cart } from "../interfaces";
import { sumBy } from "lodash";
import { useFindUserById } from "../api/services/userService";
import { accountSelector } from "../store/reducer/auth";
import { FiEdit3 } from "react-icons/fi";
import { useEffect, useState } from "react";
import { setOrder } from "../store/reducer/order";
import { checkOut } from "../api/services/orderService";
import { message } from "antd";
import OrderItem from "../components/OrderItem";
import { useNavigate } from "react-router-dom";
function ConfirmOrder() {
  const [messageApi, contextHolder] = message.useMessage();
  const cart = useSelector(cartSelector);
  const account = useSelector(accountSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState("Đang cập nhật...");
  const [phone, setPhone] = useState("Đang cập nhật...");
  const { data: user, isLoading } = useFindUserById(account._id);
  useEffect(() => {
    setAddress(
      !isLoading
        ? `${user?.address?.detailAddress}, ${user?.address?.ward}, ${user?.address?.district}, ${user?.address?.province}`
        : "Vui lòng điền địa chỉ"
    );
    setPhone(!isLoading ? user.phone : "Vui lòng điền số điện thoại");
  }, [user, isLoading]);
  const extractedItems = cart
    .filter((item: Cart) => item.select)
    .map((item: Cart) => ({
      product_price: item?.product.product_price,
      quantity: item?.quantity,
    }));
  const totalPrice = sumBy(
    extractedItems,
    (item) => item?.product_price * item?.quantity
  );

  const submitOrder = async () => {
    const selectedItems = cart.filter((item) => item.select);
    dispatch(
      setOrder(
        createOrderObject(
          account._id,
          convertToOrderItem(selectedItems),
          address,
          phone
        )
      )
    );
    messageApi.open({
      key: "checkout",
      type: "loading",
      content: "Đang xử lý...",
    });
    const response = await checkOut(
      createOrderObject(
        account._id,
        convertToOrderItem(selectedItems),
        address,
        phone
      )
    );
    if (response?.status === 201) {
      messageApi
        .open({
          key: "checkout",
          type: "success",
          content: "Đặt mua thành công!",
          duration: 2,
        })
        .then(() => {
          messageApi.open({
            key: "checkout",
            type: "info",
            content: "Chuyển đến trang trang Đơn hàng",
            duration: 3,
          });
        });

      setTimeout(() => navigate("/my-orders"), 5000);
    }
  };
  return (
    <HomeLayout>
      {contextHolder}
      <div className="m-4">
        <div className="bg-white p-4 rounded-md w-full">
          <h1 className="text-gray-900 text-xl font-semibold">
            Kiểm tra đơn hàng
          </h1>
          <hr className="my-4" />
          <div className="w-full">
            {cart
              .filter((item) => item.select)
              .map((item) => (
                <OrderItem
                  product_name={item.product.product_name}
                  product_thumb={item.product.product_thumb}
                  quantity={item.quantity}
                  product_price={item.product.product_price}
                />
              ))}
          </div>
          <h1 className="font-semibold text-xl text-gray-800 my-4 text-right pr-8">
            Tổng tiền:{" "}
            <span className="text-orange-500 text-2xl">
              {displayCurrencyVND(totalPrice)}
            </span>
          </h1>
        </div>
        <div className="bg-white rounded-md p-4 mt-4 w-full relative leading-7">
          <h1 className="text-gray-900 text-xl font-semibold">
            Thông tin giao hàng
          </h1>
          <hr className="my-4" />
          <p className="text-gray-900 flex items-center ">
            Địa chỉ của bạn:{" "}
            <span className="text-sky-600 ml-2">{address}</span>
            <FiEdit3 className="text-sky-800 ml-4 font-bold cursor-pointer" />
          </p>
          <p className="text-gray-900 flex items-center ">
            Số điện thoại: <span className="text-sky-600 ml-2">{phone}</span>
            <FiEdit3 className="text-sky-800 ml-4 font-bold cursor-pointer" />
          </p>
          <p className="text-gray-900">
            Người nhận: <span className="text-sky-600">{user?.name}</span>
          </p>
          <button
            className="bg-orange-500 px-8 py-2 text-white rounded-md absolute bottom-4 right-4 focus:outline-none hover:scale-105"
            onClick={submitOrder}
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </HomeLayout>
  );
}

export default ConfirmOrder;
