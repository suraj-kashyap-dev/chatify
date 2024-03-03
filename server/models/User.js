import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  profile: {
    type: String,
  },
  status: {
    type: String,
    default: "active",
  },
});

const User = mongoose.model("users", userSchema);

export default User;
