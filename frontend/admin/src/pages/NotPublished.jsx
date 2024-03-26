import { Modal, message } from 'antd';
import React, { useState } from 'react';
import { BsArrow90DegLeft } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import ProductForm from '../components/ProductForm';
import Table from '../components/Table';
import AdminLayout from '../layout';
import { publishProduct, useFindAllDeletedProducts } from "../services/product";
import { displayCurrencyVND } from '../utils';
import Loading from '../components/Loading';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

const NotPublished = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [product, setProduct] = useState(null)
  const { data: products, isLoading } = useFindAllDeletedProducts()
  const handleCancel = () => {
    setModalOpen(false);
    setIsEditForm(false)
  };
  const handlePublishPopupCancel = () => {
    setDeleteModalOpen(false);
    setIsEditForm(false)
  };
  const handlePublishProduct = async (product) => {
    handlePublishPopupCancel();
    const key = 'delete';
    messageApi.open({
      key,
      type: 'loading',
      content: 'Đang xử lý mở bản...',
    });
    const response = await publishProduct(product._id, product);
    console.log({ response })
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Đã mở bán ' + product.product_name + ' thành công!',
        duration: 3,
      });
    }, 1500);

  }
  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'product_thumb',
      key: 'product_thumb',
      render: (image) => <img src={image} className="h-28 object-contain" />,
      width: 150
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Giá',
      dataIndex: 'product_price',
      key: 'product_price',
      width: 200,
      render: (_, record) => <span>{displayCurrencyVND(record.product_price)}</span>
    },
    {
      title: 'Mô tả',
      dataIndex: 'product_description',
      key: 'product_description',
    },
    {
      title: 'Số lượng',
      key: 'product_quantity',
      dataIndex: 'product_quantity',
      width: 150,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <div onClick={() => {
          setDeleteModalOpen(true);
          setIsEditForm(true);
          setProduct(record)
        }} className='cursor-pointer hover:text-red-500 hover:scale-105 inline-block'>
          <BsArrow90DegLeft className='cursor-pointer inline-block text-xl' />
          <p className='inline-block px-2'>Mở bán sản phẩm</p>
        </div>
      ),
    },
  ];


  return (
    <AdminLayout>
      {contextHolder}
      <div className='m-8 h-full'>
        <h1 className="font-bold text-3xl p-4">Sản phẩm chưa mở bán</h1>
        {isLoading ? <Loading /> : <Table data={products.metadata} columns={columns} />}
      </div>
      <Modal title={<span>Mở bán <strong>{isEditForm && product.product_name}</strong> hả?</span>} open={deleteModalOpen} onCancel={handlePublishPopupCancel} className='w-[10vw] h-[10vw]'
        footer={[
          <button
            onClick={handlePublishPopupCancel}
            className="px-4 py-1 rounded-md bg-white border text-red-500 border-red-500 mr-2">Hủy</button>,
          <button
            onClick={() => handlePublishProduct(product)}
            className="px-4 py-1 rounded-md bg-green-500 text-white">OK</button>
        ]}
      ></Modal>
    </AdminLayout>
  )
}

export default NotPublished