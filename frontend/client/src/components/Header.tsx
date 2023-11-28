/* eslint-disable @typescript-eslint/no-unused-vars */
// Header.tsx
import React, { useEffect, useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../store/reducer/product";
import SearchField from "./SearchField";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Popover, ConfigProvider } from "antd";
import { setLogout } from "../store/reducer/auth";
import { useFindAllProduct } from "../api/services/productServices";

interface HeaderProps {
  logoUrl?: string;
  avatarUrl?: string;
}

const Header: React.FC<HeaderProps> = ({
  logoUrl,
  avatarUrl = "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg",
}) => {
  const token = localStorage.getItem("accessToken");
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const cartQuantity = useSelector(cartSelector);
  const [scrollDirection, setScrollDirection] = useState("original");
  const navigate = useNavigate();
  const { data: products } = useFindAllProduct();
  useEffect(() => {
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
      console.log({ currentScroll, lastScrollTop });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollDirection, pathname]);
  useEffect(() => setScrollDirection("up"), [cartQuantity]);
  return (
    <header
      className={clsx(
        "w-full top-0 z-50 transition-all duration-300 ease-in-out px-4 py-2 bg-white shadow-lg text-black block",
        {
          "fixed transition-transform duration-300 transform -translate-y-full":
            scrollDirection === "down",
        },
        {
          "fixed transition-transform duration-300 transform translate-y-0":
            scrollDirection === "up",
        }
      )}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-center space-x-4">
          <h1
            className="text-lg font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Shopee LITE
          </h1>
        </div>
        <SearchField placeholder="Type here to search..." data={products} />
        <div className="flex items-center space-x-4">
          <div className="relative w-fit">
            <div className="inline-block bg-red-600 rounded-[50%] absolute top-[-5px] right-[-2px]">
              <p className="text-[10px] text-gray-100 m-0 px-1 py-0">
                {cartQuantity > 99
                  ? "99+"
                  : cartQuantity !== 0
                  ? cartQuantity
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
                  <li className="menu-item">Profile</li>
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
              <img
                src={avatarUrl}
                alt="Avatar"
                className="h-8 w-8 rounded-full"
              />
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
