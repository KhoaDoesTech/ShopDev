import { Outlet, Navigate } from "react-router-dom";
import { RouteProps } from "../interfaces";

function PublicRoute(props: RouteProps) {
  const { isAuth } = props;
  return isAuth ? <Navigate to="/" /> : <Outlet />;
}
export default PublicRoute;
