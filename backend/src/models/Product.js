import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0.01,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      default: "General",
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      default: "",
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    discountPrice: {
      type: Number,
      validate: {
        validator: function (value) {
          return !value || value < this.price;
        },
        message: "Discount price must be less than regular price",
      },
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
