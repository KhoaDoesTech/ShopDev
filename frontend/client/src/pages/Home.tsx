/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import HomeLayout from "../layouts/HomeLayout";
import Carousel from "../components/Carousel";
import { categoryImages, heroImages } from "../constants";
import useLoading from "../hooks/useLoading";
import Loading from "../components/Loading";
import CategoryItem from "../components/CategoryItem";
import { CategoryProps } from "../interfaces";
import ProductItem from "../components/ProductItem";
import { useFindAllProduct } from "../api/services/productServices";
interface ProductProps {
  id: number;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
}
function Home() {
  const { isLoaded, progress, showPage } = useLoading({
    selector: ".home-container",
  });
  const { data: products, isLoading } = useFindAllProduct();
  if (!showPage) return <Loading isLoaded={isLoaded} progress={progress} />;
  if (isLoading) return <Loading isLoaded={isLoaded} progress={progress} />;
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
          <div className="w-full grid grid-cols-4 mb-4 gap-8 px-20">
            {products?.map((product: any) => (
              <ProductItem
                id={product.id}
                product_price={product.price}
                product_name={product.title}
                rating={product.rating}
                product_thumb={product.image}
                tag="new"
              />
            ))}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Home;
