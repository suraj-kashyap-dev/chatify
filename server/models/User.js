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
  is_active: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("user", userSchema);

export default User;
