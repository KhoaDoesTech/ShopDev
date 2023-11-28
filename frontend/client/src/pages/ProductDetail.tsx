// ProductDetail.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useFindProductById } from "../api/services/productServices";
import Loading from "../components/Loading";
import useLoading from "../hooks/useLoading";
import { Rate } from "antd";
import { displayCurrencyVND } from "../utils";
import HomeLayout from "../layouts/HomeLayout";
import QuantityInput from "../components/QuantityInput";

interface ProductDetailProps {
  image?: string;
  title?: string;
  price?: number;
  rating?: number;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  image,
  title,
  price,
  rating,
}) => {
  const { id } = useParams();
  const { isLoaded, progress, showPage } = useLoading({
    selector: ".product-detail",
  });
  const { data: product, isLoading } = useFindProductById(id || "");
  console.log({ product });
  if (!showPage) return <Loading isLoaded={isLoaded} progress={progress} />;
  if (isLoading) return <Loading isLoaded={isLoaded} progress={progress} />;
  return (
    <HomeLayout>
      <div className="md:flex px-4 my-4">
        <div className="md:flex-shrink-0">
          <img
            className="h-[300px] w-[300px] object-cover border-2 border-gray-100"
            src={product?.image}
            alt={product?.title}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-gray-800 text-lg font-semibold">
            {product?.title}
          </div>
          <p className="mt-2 text-orange-500 font-medium text-2xl">
            {displayCurrencyVND(product?.price)}
          </p>
          <div className="mt-2">
            <Rate
              disabled
              defaultValue={product?.rating.rate}
              style={{ fontSize: 10 }}
            />
            <span className="text-sky-600 text-sm ml-4">
              {product?.rating.count} đánh giá
            </span>
          </div>
          <QuantityInput />
          <div className="flex justify-center gap-x-4 items-center my-4 outline-none">
            <button className="rounded-none px-4 py-2 bg-amber-400 text-white w-[20vw] box-border">
              Mua ngay
            </button>

            <button className="rounded-none px-4 py-2 bg-orange-500 text-white w-[20vw] box-border outline-none">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default ProductDetail;
