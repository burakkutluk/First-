import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username area is required"],
      lowercase: true,
      validate: [validator.isAlphanumeric, "Please provide a valid username"],
    },
    email: {
      type: String,
      required: [true, "Email area is required"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password area is required"],
      minlength: [4, "At least 4 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// use bcrypt password
userSchema.pre('save', function (next) {
  const user = this;
  console.log("user password 1", user.password);
  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash;
    console.log("user password 2", user.password);
    next();
  });
});
const User = mongoose.model("User", userSchema);

export default User;
