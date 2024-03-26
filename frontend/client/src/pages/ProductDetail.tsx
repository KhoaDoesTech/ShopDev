// ProductDetail.tsx
import { Breadcrumb, Rate } from "antd";
import { useMemo } from "react";
import { FaHome } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  useFindProductBySlug,
  useFindProductsByShopId,
} from "../api/services/productServices";
import QuantityInput from "../components/QuantityInput";
import { renderAttributesByType } from "../helper";
import { AddToCartDto, Cart } from "../interfaces";
import HomeLayout from "../layouts/HomeLayout";
import { cartSelector, updateCartRedux } from "../store/reducer/cart";
import { displayCurrencyVND } from "../utils";
import { useFindShopById } from "../api/services/userService";

const ProductDetail = () => {
  const { slug } = useParams();
  const { data: product, isLoading } = useFindProductBySlug(slug || "");
  const { data: shop, isLoading: shopLoading } = useFindShopById(
    product?.product_shop
  );
  const { data: products } = useFindProductsByShopId(product?.product_shop);
  console.log({ products });
  const cartItems = useSelector(cartSelector);
  const isProductInCart = useMemo(() => {
    return cartItems.find((item: Cart) => item.product?._id === product?._id);
  }, [product, cartItems]);
  const dispatch = useDispatch();
  const foundItem = useMemo(() => {
    if (!product) {
      return { product: null, quantity: 0 };
    }
    return (
      cartItems.find((item) => item.product?._id === product?._id) ?? {
        product: product,
        quantity: 0,
      }
    );
  }, [cartItems, slug, product]);

  const handleAddToCart = () => {
    const cart: AddToCartDto = {
      productId: foundItem?._id,
      quantity: 0,
    };
    dispatch(updateCartRedux(cart));
  };
  console.log({ product });
  return (
    <HomeLayout>
      <div className="m-4">
        {isLoading ? (
          ""
        ) : (
          <Breadcrumb
            className="mb-4"
            items={[
              {
                title: (
                  <Link to="/">
                    <div className="flex items-center justify-center gap-x-1">
                      <FaHome />
                      <span>Trang chủ</span>
                    </div>
                  </Link>
                ),
              },
              {
                title: (
                  <Link to={`/category?=${product?.product_type}`}>
                    {product?.product_type}
                  </Link>
                ),
              },
              {
                title: (
                  <Link to={`/product/${product?.product_slug}`}>
                    {product?.product_name}
                  </Link>
                ),
              },
            ]}
          />
        )}

        <div className="md:flex p-4 max-h-full bg-white rounded-md">
          <div className="md:flex-shrink-0">
            {!isLoading ? (
              <img
                className="h-[300px] w-[300px] object-contain rounded-lg bg-white border border-gray-300"
                src={product?.product_thumb}
                alt={product?.product_name}
              />
            ) : (
              <Skeleton height={300} width={300} />
            )}
          </div>
          <div className="px-8">
            <div className="uppercase tracking-wide text-gray-800 text-xl font-semibold">
              {product?.product_name || <Skeleton />}
            </div>
            {!isLoading ? (
              <Rate
                disabled
                defaultValue={product?.product_ratingsAverage}
                allowHalf
                style={{ fontSize: 16 }}
              />
            ) : (
              <Skeleton />
            )}
            <p className="mt-2 text-orange-500 font-medium text-2xl">
              {displayCurrencyVND(product?.product_price) || <Skeleton />}
            </p>
            {!isLoading ? (
              <div>
                <span>Sản phẩm của</span>
                <span className="ml-2 text-orange-500">{shop?.name}</span>
              </div>
            ) : (
              <Skeleton />
            )}

            <hr className="my-4" />
            <div className="grid grid-cols-2">
              {!isLoading ? (
                renderAttributesByType(product?.product_type, product)
              ) : (
                <>
                  <Skeleton count={3} />
                  <Skeleton count={3} className="ml-1" />
                </>
              )}
            </div>
            <hr className="my-4" />
            {!isLoading ? (
              <QuantityInput
                quantity={foundItem?.quantity}
                hasLabel
                cart={foundItem}
              />
            ) : (
              <Skeleton />
            )}
            <div className="flex justify-start gap-x-4 items-center my-4 outline-none">
              <button className="rounded-none px-4 py-2 bg-amber-400 text-white w-[20vw] box-border">
                Mua ngay
              </button>
              <button
                className="rounded-none px-4 py-2 bg-orange-500 text-white w-[20vw] box-border outline-none"
                onClick={handleAddToCart}
              >
                {isProductInCart ? "Xoá khỏi giỏ hàng" : "Thêm vào giỏ hàng"}
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-md my-4">
          <h1 className="text-gray-900 text-xl font-semibold">Mô tả</h1>
          <hr className="my-4" />
          <p className="italic text-gray-500">
            {product?.product_description || <Skeleton />}
          </p>
        </div>
      </div>
    </HomeLayout>
  );
};

export default ProductDetail;
