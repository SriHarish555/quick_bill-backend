const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    pwd: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "customer",
    },
    orders: [
      {
        order_id: mongoose.Schema.Types.ObjectId,
        items: [
          {
            item_id: mongoose.Schema.Types.ObjectId,
            quantity: Number,
          },
        ],
        total_price: Number,
        status: String,
        created_at: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
