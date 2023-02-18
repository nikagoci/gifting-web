import { models, model, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  phoneNumber: {
    required: true,
    type: String
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

const User = models.User || model("User", userSchema);

export default User;
