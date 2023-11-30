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
import SignUp from './pages/SignUp';
import PublicRoute from './routes/PublicRoute';
import NotFound from './pages/NotFound';
import { useSelector } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Order from './pages/Order';
import NotPublished from './pages/NotPublished';
import ForgotPassword from './pages/ForgotPassword';

function AppRoutes() {
  const queryClient = new QueryClient()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes isAuth={isAuthenticated} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/product" element={<Product />} />
            <Route path="/order" element={<Order />} />
            <Route path="/nopublished" element={<NotPublished />} />
          </Route>
          <Route element={<PublicRoute isAuth={isAuthenticated} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/passrecover" element={<ForgotPassword />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default AppRoutes