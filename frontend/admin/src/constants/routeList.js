import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Order from "../pages/Order";
import Product from "../pages/Product";

export const routes = [
  {
    // element: <Dashboard />,
    path: "/",
    label: "Dashboard",
  },
  {
    // element: <Product />,
    path: "/product",
    label: "Product",
  },
  {
    // element: <NotPublished />,
    path: "/nopublished",
    label: "Not Published",
  },
  {
    // element: <Order />,
    path: "/order",
    label: "Order",
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
