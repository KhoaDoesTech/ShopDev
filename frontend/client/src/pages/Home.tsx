/* eslint-disable @typescript-eslint/no-explicit-any */
import Carousel from "../components/Carousel";
import CategoryItem from "../components/CategoryItem";
import { categoryImages, heroImages } from "../constants";
import HomeLayout from "../layouts/HomeLayout";

import { useFindAllProduct } from "../api/services/productServices";
import ProductItem from "../components/ProductItem";
import { CategoryProps, Product } from "../interfaces";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { accountSelector } from "../store/reducer/auth";
import { useGetCartByUserId } from "../api/services/cartService";
import { useState } from "react";
import { Pagination } from "antd";
function Home() {
  const { data: products, isLoading } = useFindAllProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const account = useSelector(accountSelector);
  const { data } = useGetCartByUserId(account?._id);
  // pagination
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return (
    <HomeLayout>
      <Carousel images={heroImages} />
      <div className="bg-gray-100 home-container h-full px-4 box-border">
        <div className="home-content mt-4">
          <h1 className="text-center text-gray-900 text-2xl font-semibold my-4">
            Danh mục sản phẩm
          </h1>
          <div className="w-full flex justify-center mb-4 gap-x-4">
            {categoryImages.map((item: CategoryProps) => (
              <CategoryItem {...item} />
            ))}
          </div>
          <h1 className="text-left text-gray-900 text-2xl font-semibold my-4 pl-4 border-l-2 border-l-gray-500">
            Dành cho bạn
          </h1>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4 gap-8 md:px-20">
            {products?.slice(startIndex, endIndex).map((product: Product) => (
              <ProductItem product={product} />
            ))}
            {isLoading &&
              Array.from({ length: 4 }).map((index: number) => (
                <div
                  className="bg-white rounded-sm shadow-md overflow-hidden flex-grow relative cursor-pointer hover:scale-110 duration-100 p-2"
                  key={index}
                >
                  <Skeleton height={200} width={"100%"} />
                  <Skeleton count={3} />
                </div>
              ))}
          </div>
          <div className="w-full flex justify-center">
            <Pagination
              defaultCurrent={1}
              total={products?.length}
              pageSize={itemsPerPage}
              onChange={(page) => setCurrentPage(page)}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Home;
