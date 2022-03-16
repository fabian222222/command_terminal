import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import CustomProduct from '../../Pages/User/CustomProduct'
import ProductsClient from '../../Pages/User/ProductsClient'

const ClientNestedRoutes = () => {
  return (
      <>
        <Outlet />
        <Routes>
            <Route path="/product" element={<ProductsClient></ProductsClient>} />
            <Route path="/product/custom" element={<CustomProduct></CustomProduct>} />
        </Routes>
    </>
  )
}

export default ClientNestedRoutes