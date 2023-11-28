import { Modal, message } from 'antd';
import React, { useState } from 'react';
import { BsTrash3Fill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import ProductForm from '../components/ProductForm';
import Table from '../components/Table';
import AdminLayout from '../layout';
import { deleteProduct, useFindAllProduct } from "../services/product";
import { displayCurrencyVND } from '../utils';
import Loading from '../components/Loading';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

const Product = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [product, setProduct] = useState(null)
  const { data: products, isLoading } = useFindAllProduct()
  const handleCancel = () => {
    setModalOpen(false);
    setIsEditForm(false)
  };
  const handleDeletePopupCancel = () => {
    setDeleteModalOpen(false);
    setIsEditForm(false)
  };
  const handleDeleteProduct = async (product) => {
    handleDeletePopupCancel();
    const key = 'delete';
    messageApi.open({
      key,
      type: 'loading',
      content: 'Đang xóa...',
    });
    const response = await deleteProduct(product._id, product);
    console.log({response})
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Đã xóa ' + product.product_name + ' thành công!',
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
      width: 200
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
      width: 300,
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
      width: 100,
      render: (_, record) => (
        <div className="flex items-center gap-x-4">
          <MdModeEdit onClick={() => {
            setModalOpen(true);
            setIsEditForm(true);
            setProduct(record)
          }} className='cursor-pointer hover:text-red-500 hover:scale-105' />
          <BsTrash3Fill onClick={() => {
            setDeleteModalOpen(true);
            setIsEditForm(true);
            setProduct(record)
          }} className='cursor-pointer hover:text-red-500 hover:scale-105' />
        </div>
      ),
    },
  ];

 
  return (
    <AdminLayout>
      {contextHolder}
      <div className='m-8 h-full'>
        <h1 className="font-bold text-3xl p-4">Product</h1>
        <button className="bg-gray-800 rounded-md px-4 py-2 text-white mb-4 flex items-center gap-x-2" onClick={() => { setModalOpen(true); setIsEditForm(false) }}>
          <FaPlus />
          <span>Tạo sản phẩm mới</span></button>
        {isLoading ? <Loading /> : <Table data={products.metadata} columns={columns} />}
      </div>
      <Modal title={<span>Xóa <strong>{isEditForm && product.product_name}</strong> hả?</span>} open={deleteModalOpen} onCancel={handleDeletePopupCancel} className='w-[10vw] h-[10vw]'
        footer={[
          <button
            onClick={handleDeletePopupCancel}
            className="px-4 py-1 rounded-md bg-white border text-red-500 border-red-500 mr-2">Hủy</button>,
          <button
            onClick={() => handleDeleteProduct(product)}
            className="px-4 py-1 rounded-md bg-red-500 text-white">OK</button>
        ]}
      ></Modal>
      <Modal title={<h1 className="text-3xl font-bold">{isEditForm ? product.product_name : "Thêm sản phẩm"}</h1>} open={modalOpen} footer={null} onCancel={handleCancel} className='min-w-[50vw]'>
        <ProductForm record={product} isEditForm={isEditForm}/>
      </Modal>
    </AdminLayout>
  )
}

export default Product