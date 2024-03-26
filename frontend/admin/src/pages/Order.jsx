import { Modal, message, Tag } from 'antd';
import React, { useState } from 'react';
import { BsTrash3Fill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { MdInfo } from "react-icons/md";
import OrderForm from '../components/OrderForm';
import Table from '../components/Table';
import AdminLayout from '../layout';
import { deleteProduct, useFindAllProduct } from "../services/product";
import { calculateTotalQuantity, convertTimestampToFormattedString, displayCurrencyVND, renderStatusTags } from '../utils';
import Loading from '../components/Loading';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { shopSelector } from '../store/reducer/auth';
import { useFindAllOrdersByShopId } from '../services/order';
const Order = () => {
  const shop = useSelector(shopSelector);
  const id = shop._id;
  const { data, isLoading: orderLoading } = useFindAllOrdersByShopId(id);
  console.log({ data })
  const [messageApi, contextHolder] = message.useMessage();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [order, setOrder] = useState(null)
  const { data: products, isLoading } = useFindAllProduct()
  const handleCancel = () => {
    setModalOpen(false);
    setIsEditForm(false)
  };
  const handleDeletePopupCancel = () => {
    setDeleteModalOpen(false);
    setIsEditForm(false)
  };
  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id',
      width: 50
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'user',
      key: 'user',
      render: (_, record) => <p>{record.user.name}</p>
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'createdOn',
      key: 'createdOn',
      render: (_, record) => <p>{convertTimestampToFormattedString(record.createdOn)}</p>
    },
    {
      title: 'Số lượng',
      dataIndex: 'orderItems',
      key: 'orderItems',
      render: (_, record) => <p>{calculateTotalQuantity(record.orderItems)}</p>
    },
    {
      title: 'Giá',
      dataIndex: 'overallTotalPrice',
      key: 'overallTotalPrice',
      width: 200,
      render: (_, record) => <span className='font-semibold text-xl'>{displayCurrencyVND(record.overallTotalPrice)}</span>
    },
    {
      title: 'Trạng thái đơn hàng',
      dataIndex: 'status',
      key: 'status',
      width: 200,
      render: (_, record) => <>
        {
          renderStatusTags(record.status)
        }
      </>
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <div className="items-center hover:text-red-500 hover:scale-105 cursor-pointer" onClick={() => {
          setModalOpen(true);
          setIsEditForm(true);
          setOrder(record)
        }}>
          <div className='py-1'>
            <MdInfo className='cursor-pointer inline-block text-xl' />
            <p className='inline-block px-2'>Chi tiết đơn hàng</p>
          </div>
        </div>
      ),
    },
  ];


  return (
    <AdminLayout>
      {contextHolder}
      <div className='m-8 h-full'>
        <h1 className="font-bold text-3xl p-4">Danh sách đơn hàng</h1>
        {isLoading ? <Loading /> : <Table data={data} columns={columns} />}
      </div>
      <Modal
        title={<h1 className="text-3xl font-bold">Chi tiết đơn hàng</h1>}
        open={modalOpen}
        footer={null}
        onCancel={handleCancel}
        className='min-w-[60vw]'
      >
        <OrderForm orderDetail={order} methods={{ setModalOpen }} />
      </Modal>
    </AdminLayout>
  )
}

export default Order