import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Product from './pages/Product';
import PrivateRoutes from './routes/PrivateRoute';
import Login from './pages/Login';
import PublicRoute from './routes/PublicRoute';
import NotFound from './pages/NotFound';
import { useSelector } from 'react-redux';

function AppRoutes() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  console.log({isAuthenticated});
  const token = null;
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes isAuth={isAuthenticated} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product" element={<Product />} />
        </Route>
        <Route element={<PublicRoute isAuth={isAuthenticated} />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes