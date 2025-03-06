const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true, 
      lowercase: true, 
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"] 
    },
    mobile: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true, 
      match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"] 
    },
    password: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
    //role: { type: String, enum: ["user", "admin"], default: "user"},
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
