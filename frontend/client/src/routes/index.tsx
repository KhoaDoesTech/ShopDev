/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoute";
import { useSelector } from "react-redux";
import Home from "../pages/Home";
import PublicRoute from "./PublicRoute";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetail from "../pages/ProductDetail";

function AppRoutes() {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes isAuth={isAuthenticated} />}></Route>
          <Route element={<PublicRoute isAuth={isAuthenticated} />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default AppRoutes;
