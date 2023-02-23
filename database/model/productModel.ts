import { models, model, Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    required: [true, "product name is required"],
    type: String,
  },
  city: {
    required: [true, "city is required"],
    type: String,
  },
  imageSrc: {
    required: [true, "image is required"],
    type: String,
  },
  description: {
    required: [true, "description is required"],
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: [true, "gender is required"],
  },
  category: {
    type: String,
    enum: [
      "new-arrivals",
      "household-items",
      "electronics",
      "clothes",
      "other",
    ],
    required: [true, "category is required"],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Product = models.Product || model("Product", productSchema);

export default Product;
