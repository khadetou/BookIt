import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter your name !"],
    maxLength: [50, "Your name cannot exceed more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Enter your email !"],
    unique: true,
    validate: [validator.isEmail, "Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Enter your password !"],
    minLength: [6, "Your password must do at least 6 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    resetPasswordToken: String,
    resetPasswordExpired: Date,
  },
});

export default mongoose.model.User || mongoose.model("User", userSchema);
