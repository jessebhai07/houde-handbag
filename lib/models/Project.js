import mongoose from "mongoose";

export const PRODUCT_CATEGORIES = [
  "tool_bag",
  "backpack",
  "shoulder_strap",
  "cosmatic_bag",
  "hand_bag",
  "waterproof_bag",
  "game_case",
  "home_package",
  "laptop_bag",
  "flat_screen_protection_case",
  "headphone_bag",
];

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    format: String,
    width: Number,
    height: Number,
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, trim: true, required: true, maxlength: 120 },
    category: { type: String, required: true, enum: PRODUCT_CATEGORIES },
    description: { type: String, trim: true, default: "", maxlength: 2000 },
    images: {
      type: [imageSchema],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length >= 1 && v.length <= 10,
        message: "Images must be between 1 and 10.",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);
