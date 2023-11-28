import { Outlet, Navigate } from "react-router-dom";
import { RouteProps } from "../interfaces";

function PrivateRoutes(props: RouteProps) {
  const { isAuth } = props;
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoutes;
