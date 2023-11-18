import Dashboard from "../pages/Dashboard";

export const routes = [
    {
      element: <Dashboard />,
      path: "/",
    },
    {
      element: <ForgotPasswordPage />,
      path: "/login",
    },
    {
      element: <NewPasswordPage />,
      path: "/new-password",
    },
  ];