import { Product } from "../interfaces";

export function renderAttributesByType(type: string, product: Product) {
  switch (type) {
    case "Clothes":
      return (
        <>
          <label className="text-gray-500">Thương hiệu</label>
          <p className="text-sky-500">{product?.product_attributes.brand}</p>
          <label className="text-gray-500">Chất liệu</label>
          <p className="text-sky-500">{product?.product_attributes.material}</p>
          <label className="text-gray-500">Kích thước</label>
          <p className="text-sky-500">{product?.product_attributes.size}</p>
        </>
      );
    case "Electronics":
      return (
        <>
          <label className="text-gray-500">Hãng</label>
          <p className="text-sky-500">
            {product?.product_attributes.manufacturer}
          </p>
          <label className="text-gray-500">Dòng</label>
          <p className="text-sky-500">{product?.product_attributes.model}</p>
          <label className="text-gray-500">Màu sắc</label>
          <p className="text-sky-500">{product?.product_attributes.color}</p>
        </>
      );
    default:
      return (
        <>
          <label className="text-gray-500">Thương hiệu</label>
          <p className="text-sky-500">{product?.product_attributes.brand}</p>
          <label className="text-gray-500">Chất liệu</label>
          <p className="text-sky-500">{product?.product_attributes.material}</p>
          <label className="text-gray-500">Kích thước</label>
          <p className="text-sky-500">{product?.product_attributes.size}</p>
        </>
      );
  }
}
