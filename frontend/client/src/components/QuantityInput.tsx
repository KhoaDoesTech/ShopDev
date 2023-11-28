import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { decreaseCart, increaseCart } from "../store/reducer/product";

const QuantityInput: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(0);
  const dispatch = useDispatch();
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    dispatch(increaseCart());
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      dispatch(decreaseCart());
    }
  };

  return (
    <div className="flex items-center">
      <label htmlFor="quantity" className="mr-2 text-gray-900">
        Số lượng:
      </label>
      <div className="flex items-center overflow-hidden h-8">
        <button
          onClick={decreaseQuantity}
          className="w-7 bg-gray-300 focus:outline-none rounded-none text-gray-800"
        >
          -
        </button>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min={0}
          value={quantity}
          className="h-full text-center w-16 bg-white text-gray-900 border border-gray-300 outline-none"
          readOnly
        />
        <button
          onClick={increaseQuantity}
          className="w-7 bg-gray-300 focus:outline-none rounded-none text-gray-800"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityInput;
