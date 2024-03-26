import React from 'react'
import AdminLayout from '../layout'
import { getDayPeriod } from '../utils'
import { useSelector } from 'react-redux'
import { shopSelector } from '../store/reducer/auth'

const Dashboard = () => {
  const shop = useSelector(shopSelector);
  return (
    <>
      <AdminLayout>
        <h1 className="m-8 text-3xl font-bold">Chào {getDayPeriod()}, {shop.name}</h1>
      </AdminLayout>
    </>
  )
}

export default Dashboard