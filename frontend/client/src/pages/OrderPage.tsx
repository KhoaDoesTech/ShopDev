import React from "react";
import HomeLayout from "../layouts/HomeLayout";
import { Empty, Tabs } from "antd";
const { TabPane } = Tabs;
import styled from "styled-components";
import { useGetOrdersByUserId } from "../api/services/orderService";
import { accountSelector } from "../store/reducer/auth";
import { useSelector } from "react-redux";
import OrderManageItem from "../components/OrderManageItem";
// const CustomTabs = styled(Tabs)`
//    &
// `
function OrderPage() {
  const account = useSelector(accountSelector);
  const { data } = useGetOrdersByUserId(account._id);
  console.log(data);
  const pendingData = data?.filter((item) => item.status === "pending");
  const confirmedData = data?.filter((item) => item.status === "confirmed");
  const cancelledData = data?.filter((item) => item.status === "cancelled");
  const shippedData = data?.filter((item) => item.status === "shipped");
  const deliveredData = data?.filter((item) => item.status === "delivered");
  return (
    <HomeLayout>
      <div className="m-4 p-4 bg-white rounded-md">
        <h1 className="text-2xl uppercase font-bold text-gray-800 border-l-4 border-l-orange-500 pl-4">
          Đơn hàng của tôi
        </h1>
        <hr className="my-4" />
        <Tabs defaultActiveKey="pending" centered>
          <TabPane tab="Đang chờ xác nhận" key="pending">
            {pendingData?.map((item) => (
              <OrderManageItem order={item} />
            ))}
            {pendingData?.length === 0 && (
              <Empty description={<span>Không có đơn hàng nào</span>} />
            )}
          </TabPane>
          <TabPane tab="Đã xác nhận" key="confirmed">
            {confirmedData?.map((item) => (
              <OrderManageItem order={item} />
            ))}{" "}
            {confirmedData?.length === 0 && (
              <Empty description={<span>Không có đơn hàng nào</span>} />
            )}
          </TabPane>
          <TabPane tab="Đang vận chuyển" key="shipped">
            {shippedData?.map((item) => (
              <OrderManageItem order={item} />
            ))}{" "}
            {shippedData?.length === 0 && (
              <Empty description={<span>Không có đơn hàng nào</span>} />
            )}
          </TabPane>
          <TabPane tab="Đã huỷ" key="cancelled">
            {cancelledData?.map((item) => (
              <OrderManageItem order={item} />
            ))}{" "}
            {cancelledData?.length === 0 && (
              <Empty description={<span>Không có đơn hàng nào</span>} />
            )}
          </TabPane>
          <TabPane tab="Đã nhận hàng" key="delivered">
            {deliveredData?.map((item) => (
              <OrderManageItem order={item} />
            ))}
            {deliveredData?.length === 0 && (
              <Empty description={<span>Không có đơn hàng nào</span>} />
            )}
          </TabPane>
        </Tabs>
      </div>
    </HomeLayout>
  );
}

export default OrderPage;
