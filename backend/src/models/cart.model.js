"use strict";

const { Schema, model } = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Cart";
const COLLECTION_NAME = "Carts";

// Declare the Schema of the Mongo model
const cartSchema = new Schema(
  {
    cart_state: {
      type: String,
      enum: ["active", "completed", "failed", "pending"],
    },
    cart_products: { type: Array, require: true, default: [] },
    cart_count_product: { type: Number, default: 0 },
    cart_userId: { type: Number, require: true },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: {
      createdAt: "createdOn",
      updatedAt: "modifiedOn",
    },
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, cartSchema);
