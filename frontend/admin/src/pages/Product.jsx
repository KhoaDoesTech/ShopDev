import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout'
import Table from '../components/Table'
import {findAllProducts} from "../services/product";
const columns = [
    {
      title: 'product_name',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'product_price',
      dataIndex: 'product_price',
      key: 'product_price',
    },
    {
      title: 'product_description',
      dataIndex: 'product_description',
      key: 'product_description',
    },
    {
      title: 'product_quantity',
      key: 'product_quantity',
      dataIndex: 'product_quantity',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex items-center gap-x-4">
          <a>Edit {record.product_name}</a>
          <a>Delete</a>
        </div>
      ),
    },
  ];

const Product = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findAllProducts();
        setProducts(response)
        console.log({response})
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData(); 
  }, []);
  console.log({products})
  return (
    <AdminLayout>
        <div>
            <h1 className="font-bold text-3xl p-4">Product</h1>
            <Table data={products} columns={columns}/>
        </div>
    </AdminLayout>
  )
}

export default Product