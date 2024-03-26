/* eslint-disable @typescript-eslint/no-unused-vars */
// Header.tsx
import { Avatar, Popover, Tooltip } from "antd";
import React, { useLayoutEffect, useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useFindAllProduct } from "../api/services/productServices";
import { setLogout } from "../store/reducer/auth";
import { getTheFirstLetter } from "../utils";
import SearchField from "./SearchField";
import { cartTotalSelector } from "../store/reducer/cart";

interface HeaderProps {
  logoUrl?: string;
  avatarUrl?: string;
}

const Header: React.FC<HeaderProps> = () => {
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("account"));
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const totalQuantity = useSelector(cartTotalSelector);
  const [scrollDirection, setScrollDirection] = useState("original");
  const navigate = useNavigate();
  const { data: products } = useFindAllProduct();
  useLayoutEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > lastScrollTop) {
        setScrollDirection("down");
      } else if (currentScroll === 0) {
        setScrollDirection("original");
      } else {
        setScrollDirection("up");
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.scrollTo(0, 0);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);
  // useEffect(() => {
  //   setScrollDirection("up");
  //   return () => {
  //     setScrollDirection("original");
  //     window.scrollTo(0, 0);
  //   };
  // }, [totalQuantity]);
  return (
    <header
      className={`w-full top-0 z-50 transition-all duration-300 ease-in-out px-4 py-2 bg-white shadow-lg text-black block 
      ${
        scrollDirection === "down"
          ? "fixed transition-transform duration-300 transform -translate-y-full"
          : scrollDirection === "up"
          ? "fixed transition-transform duration-300 transform translate-y-0"
          : ""
      }
      `}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-center space-x-4">
          <h1
            className="text-lg font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Shop DEV
          </h1>
        </div>
        <SearchField placeholder="Type here to search..." data={products} />
        <div className="flex items-center space-x-4">
          <div
            className="relative w-fit cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <div className="inline-block bg-red-600 rounded-[50%] absolute top-[-5px] right-[-2px]">
              <p className="text-[10px] text-gray-100 m-0 px-1 py-0">
                {totalQuantity > 99
                  ? "99+"
                  : totalQuantity !== 0
                  ? totalQuantity
                  : ""}
              </p>
            </div>
            <BsCart2 className="text-gray-500 text-2xl" />
          </div>
          {token ? (
            <Popover
              placement="bottomLeft"
              content={
                <ul className="min-w-max">
                  <li
                    className="menu-item cursor-pointer"
                    onClick={() => navigate("/my-profile")}
                  >
                    Thông tin tài khoản
                  </li>
                  <li
                    className="menu-item cursor-pointer"
                    onClick={() => navigate("/my-orders")}
                  >
                    Đơn hàng
                  </li>
                  <li
                    className="menu-item"
                    onClick={() => {
                      dispatch(setLogout());
                    }}
                  >
                    Đăng xuất
                  </li>
                </ul>
              }
            >
              <Avatar
                style={{
                  backgroundColor: "#f97316",
                  verticalAlign: "middle",
                }}
                size="large"
              >
                {getTheFirstLetter(user?.name || "John Doe")}
              </Avatar>
            </Popover>
          ) : (
            <p
              className="text-gray-900 text-sm max-w-fit m-0 p-0 cursor-pointer hover:text-sky-500"
              onClick={() => navigate("/login")}
            >
              Đăng nhập/Đăng ký
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
