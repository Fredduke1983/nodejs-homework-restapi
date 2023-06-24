const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
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
      unique: [true, "Email already exists"],
    },
    phone: {
      type: String,
      match: /^[(,),0-9]{5,12}$/,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Contact = mongoose.model("contacts", contactSchema);
module.exports = Contact;
