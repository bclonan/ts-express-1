import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const authSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const sessionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  clientNonce: { type: String, required: true },
  serverNonce: { type: String, required: true },
  serverNonceHash: { type: String, required: true },
  magicLink: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  step: { type: Number, default: 0 },
  data: { type: Object, default: {} },
  otp: { type: String, default: "" },
  otpRetryCount: { type: Number, default: 0 },
  otpExpiredAt: { type: Date, default: Date.now },
  otpVerified: { type: Boolean, default: false },
  otpVerifiedAt: { type: Date, default: Date.now },
  canResetPassword: { type: Boolean, default: false },
  isNewPasswordValid: { type: Boolean, default: false },
  newPassword: { type: String, default: "" },
  newPasswordHash: { type: String, default: "" },
});

const Book = mongoose.model("Book", bookSchema);
const User = mongoose.model("User", userSchema);
const Auth = mongoose.model("Auth", authSchema);

export { Auth, Book, User };
