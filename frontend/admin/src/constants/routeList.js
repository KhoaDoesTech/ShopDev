import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Order from "../pages/Order";
import Product from "../pages/Product";

export const routes = [
  {
    // element: <Dashboard />,
    path: "/",
    label: "Trang chủ",
  },
  {
    // element: <Product />,
    path: "/product",
    label: "Sản phẩm",
  },
  {
    // element: <NotPublished />,
    path: "/nopublished",
    label: "Sản phẩm chưa mở bán",
  },
  {
    // element: <Order />,
    path: "/order",
    label: "Đơn hàng",
  },
  {
    // element: <Login />,
    path: "/login",
    label: "Login",
  },
  {
    // element: <ForgotPasswordPage />,
    path: "/forgot-password",
    label: "Forgot Password",
  },
  {
    // element: <NewPasswordPage />,
    path: "/new-password",
    label: "New Password",
  },
];
