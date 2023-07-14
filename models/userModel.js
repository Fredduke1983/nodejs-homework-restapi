const mongoose = require("mongoose");
const { subscriptEnum } = require("../constants/subscriptions");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 20,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String,
    },

    subscription: {
      type: String,
      enum: subscriptEnum,
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
