import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { clothSize } from '../constants';
import storage from "../firebase";
import { createNewProduct, updateProduct, publishProduct } from '../services/product';
import { calculateTotalQuantity, convertTimestampToFormattedString, displayCurrencyVND, getCurrentDateAsString, renderStatusTags } from '../utils';
import { Button, Descriptions, Radio, message } from 'antd';
import Table from "./Table";
import { updateOrderStatus } from "../services/order";
const dropdownOptions = {
    "pending": "Đang chờ duyệt",
    "confirmed": "Đã xác nhận",
    "shipped": "Đang giao hàng",
    "cancelled": "Đã hủy",
    "delivered": "Đã giao hàng thành công",
};
const orderColumns = [
    {
        title: 'Mã sản phẩm',
        dataIndex: 'product_id',
        key: 'product_id',
        width: 50
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'product_name',
        key: 'product_name',
        render: (_, record) => <p>{record.product_name}</p>
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (_, record) => <p>{record.quantity}</p>
    },
    {
        title: 'Giá',
        dataIndex: 'product_price',
        key: 'product_price',
        width: 200,
        render: (_, record) => <span className='font-semibold text-xl'>{displayCurrencyVND(record.product_price)}</span>
    },
];
const OrderForm = ({ orderDetail, methods }) => {
    console.log({ orderDetail })
    const [selectedValue, setSelectedValue] = useState(orderDetail.status);
    const [loading, setLoading] = useState(false)
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const [messageApi, contextHolder] = message.useMessage();
    const data = orderDetail.orderItems[0].items.map(({ product, quantity }) => ({
        product_id: product._id,
        product_name: product.product_name,
        product_price: product.product_price,
        quantity,
    }));
    const handleUpdateOrderStatus = async () => {
        setLoading(true)
        const updateResult = await updateOrderStatus(orderDetail._id, selectedValue);
        console.log(updateResult);
        setLoading(false)
        methods.setModalOpen(false)
    }
    return (
        <>
            <h1 className="text-xl font-semibold">Mã đơn hàng: <span className="text-orange-500">{orderDetail._id}</span></h1>
            <hr className="my-4" />
            <Descriptions
                bordered
                size={"small"}
                items={[
                    {
                        key: '1',
                        label: 'Tên người dùng',
                        children: orderDetail.user.name,
                    },
                    {
                        key: '2',
                        label: 'Email',
                        children: orderDetail.user.email,
                    },
                    {
                        key: '3',
                        label: 'Ngày đặt hàng',
                        children: convertTimestampToFormattedString(orderDetail.createdOn),
                    },
                    {
                        key: '4',
                        label: 'Tổng tiền',
                        children: <p className="font-semibold text-orange-500">{displayCurrencyVND(orderDetail.overallTotalPrice)}</p>,
                    },
                    {
                        key: '5',
                        label: 'Số lượng hàng',
                        children: calculateTotalQuantity(orderDetail.orderItems),
                    },
                    {
                        key: '6',
                        label: 'Trạng thái',
                        children: <select id="dropdown" value={selectedValue} onChange={handleChange}>
                            {Object.entries(dropdownOptions).map(([value, label]) => (
                                <option key={value} value={value}>{renderStatusTags(value)}</option>
                            ))}
                        </select>,
                    },
                ]}
            />
            <div className="w-full flex justify-end"><button onClick={handleUpdateOrderStatus} className="bg-lime-500 text-white font-semibold px-2 py-1 rounded-md my-4">{loading ? "Đang cập nhật..." : "Lưu thay đổi"}</button></div>
            <h1 className="text-xl font-semibold">Danh sách các sản phẩm</h1>
            <Table columns={orderColumns} data={data} />
        </>
    );
};

export default OrderForm;
