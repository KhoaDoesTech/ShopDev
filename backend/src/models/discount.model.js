"use strict";

const { Schema, model } = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Discount";
const COLLECTION_NAME = "discounts";

// Declare the Schema of the Mongo model
const discountSchema = new Schema(
  {
    // Thông tin cơ bản
    discount_name: { type: String, require: true },
    discount_description: { type: String, require: true },
    discount_code: { type: String, require: true },
    discount_start_date: { type: Date, require: true },
    discount_end_date: { type: Date, require: true },
    // Thiết lập mã giảm giá
    discount_type: { type: String, default: "fixed_amount" }, // percentage
    discount_value: { type: Number, require: true }, // 10000 , 10
    discount_min_order_values: { type: Number, require: true },
    discount_max_value: { type: Number, require: true },
    discount_max_uses: { type: Number, require: true }, // Số lượng discount tối đa
    discount_max_uses_per_user: { type: Number, require: true }, // Mỗi user được sử dụng tối đa bn discount
    // Hiển thị mã giảm giá
    discount_is_active: { type: Boolean, default: true },
    discount_applies_to: { type: String, require: true, enum: ["all", "specific"] },
    discount_product_ids: { type: Array, default: [] }, // Số sản phẩm được áp dụng
    // Xử lý ngầm
    discount_uses_count: { type: Number, require: true }, // Số discount đã sử dụng
    discount_users_used: { type: Array, default: [] }, // Ai đã sử dụng
    discount_shopId: { type: Schema.Types.ObjectId, ref: "Shop" },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, discountSchema);
