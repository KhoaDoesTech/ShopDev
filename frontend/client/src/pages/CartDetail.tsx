/* eslint-disable @typescript-eslint/no-explicit-any */
import { App, Empty } from "antd";
import { countBy, sumBy } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import Checkbox from "../components/Checkbox";
import { useUpdateCartStatus } from "../hooks/useUpdateCartStatus";
import { Cart } from "../interfaces";
import HomeLayout from "../layouts/HomeLayout";
import { deselectAll, selectAll } from "../store/reducer/cart";

function CartDetail() {
  const [selectedAll, setSelectedAll] = useState(false);
  const { cartData, cartInReduxStore, account } = useUpdateCartStatus();
  useEffect(() => {
    const selectedCount = countBy(cartInReduxStore, "select")["true"] || 0;
    setSelectedAll(selectedCount === cartInReduxStore.length);
  }, [cartInReduxStore]);
  const dispatch = useDispatch();

  const extractedItems = cartInReduxStore
    .filter((item: Cart) => item.select)
    .map((item: Cart) => ({
      product_price: item?.product.product_price,
      quantity: item?.quantity,
    }));
  const selectedCount = sumBy(cartInReduxStore, (item: Cart) =>
    item.select ? item.quantity : 0
  );
  const totalPrice = sumBy(
    extractedItems,
    (item) => item?.product_price * item?.quantity
  );
  const handleSelectedAll = () => {
    setSelectedAll(!selectedAll);
    dispatch(!selectedAll ? selectAll() : deselectAll());
  };

  return (
    <HomeLayout>
      <App>
        <div className="px-16 py-8">
          <div className="flex justify-between items-start gap-x-4">
            <div className="flex flex-col w-full gap-2">
              {cartInReduxStore?.length > 1 && (
                <div className="bg-white rounded-md shadow-md overflow-hidden relative cursor-pointer duration-100 p-2 flex-grow gap-x-4 flex">
                  <Checkbox
                    checked={selectedAll}
                    onChange={handleSelectedAll}
                  />
                  <span>{!selectedAll ? "Chọn tất cả" : "Bỏ chọn tất cả"}</span>
                </div>
              )}
              {cartInReduxStore?.length === 0 && (
                <Empty
                  image="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"
                  imageStyle={{
                    height: 120,
                    width: "fit-content",
                    margin: "0 auto",
                  }}
                  description={<span>Giỏ hàng rỗng</span>}
                />
              )}

              {cartInReduxStore.map((item: any) => (
                <CartItem cart={item} />
              ))}
            </div>
            <CartSummary total={totalPrice} cartQuantity={selectedCount} />
          </div>
        </div>
      </App>
    </HomeLayout>
  );
}

export default CartDetail;
